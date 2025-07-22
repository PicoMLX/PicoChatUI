//
//  File.swift
//  PicoChatUI
//
//  Created by Ronald Mannak on 7/16/25.
//

import Foundation
import Hummingbird
import PicoChatUI

struct ChatController: Sendable {
    func addRoutes(to group: RouterGroup<some RequestContext>) {
        group
            .post("chat", use: self.chat)
            .get("tags", use: self.tags)
    }
    
    @Sendable func chat(_ request: Request, context: some RequestContext) async throws -> [String: Any] {
        return [
            "message": "Chat endpoint not implemented yet",
            "timestamp": ISO8601DateFormatter().string(from: Date())
        ]
    }
    
    @Sendable func tags(_ request: Request, context: some RequestContext) async throws -> [String: Any] {
        return [
            "tags": [],
            "message": "Tags endpoint not implemented yet"
        ]
    }
}