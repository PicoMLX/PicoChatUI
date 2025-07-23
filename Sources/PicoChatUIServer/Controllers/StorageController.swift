//
//  File.swift
//  PicoChatUI
//
//  Created by Ronald Mannak on 7/16/25.
//

import Foundation
import Hummingbird
import PicoChatUI

struct StorageController: Sendable {
    func addRoutes(to group: RouterGroup<some RequestContext>) {
        group
//            .add(middleware: self.sessionAuthenticator) // See 
            .post("upload") { request, context in
                // TODO: Implement file upload
                return [
                    "success": true,
                    "file_id": UUID().uuidString,
                    "message": "File upload endpoint not implemented yet"
                ]
            }
            .delete("remove") { request, context in
                // TODO: Implement file removal
                return [
                    "success": true,
                    "message": "File removal endpoint not implemented yet"
                ]
            }
            .post("signed-url") { request, context in
                // TODO: Implement signed URL generation
                return [
                    "signed_url": "https://example.com/placeholder-signed-url",
                    "expires_in": 3600,
                    "message": "Signed URL endpoint not implemented yet"
                ]
            }
        
            
//                      .group(context: StorageContext.self)
//                      .get(use: self.list)
//                      .get(":id", use: self.get)
//                      .post(use: self.create)
//                      .patch(":id", use: self.update)
//                      .delete(":id", use: self.deleteId)
                
                // TODO: Image Storage API
        //        pico/v1/storage/workspace-images  - CRUD: Workspace images
        //        pico/v1/storage/message-images     - CRUD: Message images
        //        pico/v1/storage/profile-images     - CRUD: Profile images
        //        pico/v1/storage/assistant-images   - CRUD: Assistant images

    }
    
    @Sendable func chat(_ request: Request, context: some RequestContext) async throws -> [String: Any] {
        return [
            "message": "Chat endpoint not implemented yet"
        ]
    }
    
    @Sendable func tags(_ request: Request, context: some RequestContext) async throws -> [String: Any] {
        return [
            "tags": [],
            "message": "Tags endpoint not implemented yet"
        ]
    }
}