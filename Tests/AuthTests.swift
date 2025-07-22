//
//  AuthTests.swift
//  PicoChatUI
//
//  Created by Ronald Mannak on 7/16/25.
//

import Foundation
import XCTest
import Hummingbird
import HummingbirdTesting
@testable import PicoChatUI
@testable import PicoChatUIServer

final class AuthTests: XCTestCase {
    
    func testSignupEndpoint() async throws {
        let app = try await Server().buildApplication()
        
        try await app.test(.router) { client in
            let signupRequest = SignupRequest(
                email: "test@example.com",
                password: "password123",
                name: "Test User"
            )
            
            let body = try JSONEncoder().encode(signupRequest)
            
            try await client.execute(
                uri: "/pico/v1/auth/signup",
                method: .POST,
                body: ByteBuffer(data: body)
            ) { response in
                XCTAssertEqual(response.status, .created)
                
                let responseData = try XCTUnwrap(response.body)
                let signupResponse = try JSONDecoder().decode(SignupResponse.self, from: Data(responseData.readableBytesView))
                
                XCTAssertEqual(signupResponse.user.email, "test@example.com")
                XCTAssertEqual(signupResponse.user.name, "Test User")
                XCTAssertFalse(signupResponse.accessToken.isEmpty)
                XCTAssertFalse(signupResponse.refreshToken.isEmpty)
            }
        }
    }
    
    func testLoginEndpoint() async throws {
        let app = try await Server().buildApplication()
        
        try await app.test(.router) { client in
            let loginRequest = LoginRequest(
                email: "test@example.com",
                password: "password123"
            )
            
            let body = try JSONEncoder().encode(loginRequest)
            
            try await client.execute(
                uri: "/pico/v1/auth/login",
                method: .POST,
                body: ByteBuffer(data: body)
            ) { response in
                XCTAssertEqual(response.status, .ok)
                
                let responseData = try XCTUnwrap(response.body)
                let loginResponse = try JSONDecoder().decode(LoginResponse.self, from: Data(responseData.readableBytesView))
                
                XCTAssertEqual(loginResponse.user.email, "test@example.com")
                XCTAssertFalse(loginResponse.accessToken.isEmpty)
                XCTAssertFalse(loginResponse.refreshToken.isEmpty)
            }
        }
    }
    
    func testLogoutEndpoint() async throws {
        let app = try await Server().buildApplication()
        
        try await app.test(.router) { client in
            try await client.execute(
                uri: "/pico/v1/auth/logout",
                method: .POST
            ) { response in
                XCTAssertEqual(response.status, .ok)
                
                let responseData = try XCTUnwrap(response.body)
                let logoutResponse = try JSONDecoder().decode(LogoutResponse.self, from: Data(responseData.readableBytesView))
                
                XCTAssertTrue(logoutResponse.success)
                XCTAssertEqual(logoutResponse.message, "Logged out successfully")
            }
        }
    }
    
    func testSessionEndpoint() async throws {
        let app = try await Server().buildApplication()
        
        try await app.test(.router) { client in
            // Test without auth token (should return null session)
            try await client.execute(
                uri: "/pico/v1/auth/session",
                method: .GET
            ) { response in
                XCTAssertEqual(response.status, .ok)
                
                let responseData = try XCTUnwrap(response.body)
                let sessionResponse = try JSONDecoder().decode(SessionResponse.self, from: Data(responseData.readableBytesView))
                
                XCTAssertNil(sessionResponse.session)
                XCTAssertNil(sessionResponse.user)
            }
        }
    }
}