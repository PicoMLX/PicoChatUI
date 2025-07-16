//
//  File.swift
//  PicoWebUI
//
//  Created by Ronald Mannak on 5/25/25.
//

import Foundation
import ArgumentParser
import Hummingbird
import Logging
import PicoChatUI

// Request context used by application
public struct OllamaContext: RequestContext {
    public var coreContext: CoreRequestContextStorage
    
    public init(source: Source) {
        self.coreContext = .init(source: source)
    }

    public var requestDecoder: JSONDecoder {
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        return decoder
    }

    public var responseEncoder: JSONEncoder {
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .iso8601
        encoder.keyEncodingStrategy = .convertToSnakeCase
        return encoder
    }
}

@main
struct Server: AsyncParsableCommand { 
    
    typealias Context = OllamaContext
    
    @Option(name: .shortAndLong)
    var hostname: String = "127.0.0.1"
    
    @Option(name: .shortAndLong)
    var port: Int = 8080
    
    func run() async throws {
        let app = try await buildApplication()
        try await app.runService()
    }
    
    func buildApplication() async throws -> some ApplicationProtocol {
        
        let logger = Logger(label: "Pico ChatUI")
        let router = Router(context: Context.self)
        
        // Add middleware
        router.addMiddleware {
            LogRequestsMiddleware(.info)
        }
        
        if let buildDirectoryPath = URL.buildDirectory?.path {
            router.add(middleware:
                        FileMiddleware(
                            buildDirectoryPath,
                            urlBasePath: "/",
                            searchForIndexHtml: true
                        )
            )
        }
        
        // Respond to head for Ollama compatibility
        router.head("/") { _,_ in
            return ""
        }
            
        // Add CORS middleware separately - permissive for development
        router.add(middleware: CORSMiddleware(
            allowOrigin: .all,
            allowHeaders: [.authorization, .contentType, .accept, .init("X-API-Key")!],
            allowMethods: [.get, .options, .post, .delete, .patch, .put]
        ))
        
        // Add health check route
        router.get("/health") { _, _ in
            return [
                "status": "healthy",
                "timestamp": ISO8601DateFormatter().string(from: Date())
            ]
        }

        //        let sessionAuthenticator = SessionAuthenticator(users: userRepository, context: AppRequestContext.self)
        
        // Register all PicoWebUI routes including WebSocket support
        
        let chatController = ChatController()
        chatController.addRoutes(to: router.group("/pico/v1/"))
        
        // MARK: - Chat endpoints
        
        // MARK: - Auth endpoints. Real auth: TODO
        let userController = UserController()
        userController.addRoutes(to: router.group("pico/v1/auth"))
        
        //        pico/v1/keys          - GET: Get API key configuration
        
        router.group("pico/v1/username")
            .post("available") { request, context in
                return DummyResponse()
            }
            .get("get") { request, context in
                return DummyResponse()
            }

        // MARK: - Assistant endpoint
        // pico/v1/assistants/openai    - POST: OpenAI assistant operations
        
        // MARK: - Document endpoint
        let storageController = StorageController()
        storageController.addRoutes(to: router.group("pico/v1/storage"))
  
        
        // MARK: - Retrieval endpoints
        router.group("pico/v1/retrieval")
            .post("retrieve") { request, context in
                return DummyResponse()
            }
            .post("process") { request, context in
                return DummyResponse()
            }
            .post("process/docx") { request, context in
                return DummyResponse()
            }
                
        // MARK: - DB endpoints
//        pico/v1/db/assistants         - CRUD: Assistant management
//        pico/v1/db/files             - CRUD: File management
//        pico/v1/db/tools             - CRUD: Tool management
//        pico/v1/db/models            - CRUD: Model management
//        pico/v1/db/presets           - CRUD: Preset management
//        pico/v1/db/prompts           - CRUD: Prompt management
//        pico/v1/db/workspaces        - CRUD: Workspace management
//        pico/v1/db/chats             - CRUD: Chat management
//        pico/v1/db/messages          - CRUD: Message management
//        pico/v1/db/collections       - CRUD: Collection management
//        pico/v1/db/folders           - CRUD: Folder management
//        pico/v1/db/profiles          - CRUD: Profile management
//        pico/v1/db/limits            - CRUD: Usage limits
        
        // MARK: - Relationships
//        pico/v1/db/assistant-tools        - CRUD: Assistant-tool relationships
//        pico/v1/db/assistant-files        - CRUD: Assistant-file relationships
//        pico/v1/db/assistant-collections  - CRUD: Assistant-collection relationships
//        pico/v1/db/collection-files       - CRUD: Collection-file relationships
//        pico/v1/db/message-file-items     - CRUD: Message-file relationships
        
        let app = Application(
            router: router,
            configuration: .init(
                address: .hostname(hostname, port: port),
                serverName: "Pico ChatUI Server"
            ),
            logger: logger
        )
        
        return app
    }
}
