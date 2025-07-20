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
                return DummyResponse()
            }
            .delete("remove") { request, context in
                return DummyResponse()
            }
            .post("signed-url") { request, context in
                return DummyResponse()
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
    
    @Sendable func chat(_ request: Request, context: some RequestContext) async throws -> DummyResponse {
        return DummyResponse()
    }
    
    @Sendable func tags(_ request: Request, context: some RequestContext) async throws -> DummyResponse {
        return DummyResponse()
    }
}
