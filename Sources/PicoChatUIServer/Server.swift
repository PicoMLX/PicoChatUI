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
        await ChatRoutes.routes(router: router)
        
        // Set UserRoutes
        await UserRoutes.routes(router: router)

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
