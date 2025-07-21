//
//  File.swift
//  PicoChatUI
//
//  Created by Ronald Mannak on 7/16/25.
//

import Foundation
import Hummingbird
import PicoChatUI

struct UserController: Sendable {
    
    func addRoutes(to group: RouterGroup<some RequestContext>) {
        group
            .get("login") { request, context in
                return DummyResponse()
            }
            .post("signup") { request, context in
                return DummyResponse()
            }
            .post("logout") { request, context in
                return DummyResponse()
            }
            .get("session") { request, context in
                return DummyResponse()
            }
    }    
}
