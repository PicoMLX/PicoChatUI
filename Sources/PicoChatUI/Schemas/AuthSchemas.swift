//
//  AuthSchemas.swift
//  PicoChatUI
//
//  Created by Ronald Mannak on 7/16/25.
//

import Foundation
import Hummingbird

// MARK: - Login
public struct LoginRequest: Codable, Sendable {
    public let email: String
    public let password: String
    
    public init(email: String, password: String) {
        self.email = email
        self.password = password
    }
}

public struct LoginResponse: Codable, Sendable, ResponseCodable {
    public let user: User
    public let session: Session
    public let accessToken: String
    public let refreshToken: String
    
    public init(user: User, session: Session, accessToken: String, refreshToken: String) {
        self.user = user
        self.session = session
        self.accessToken = accessToken
        self.refreshToken = refreshToken
    }
}

// MARK: - Signup
public struct SignupRequest: Codable, Sendable {
    public let email: String
    public let password: String
    public let name: String?
    
    public init(email: String, password: String, name: String? = nil) {
        self.email = email
        self.password = password
        self.name = name
    }
}

public struct SignupResponse: Codable, Sendable, ResponseCodable {
    public let user: User
    public let session: Session
    public let accessToken: String
    public let refreshToken: String
    
    public init(user: User, session: Session, accessToken: String, refreshToken: String) {
        self.user = user
        self.session = session
        self.accessToken = accessToken
        self.refreshToken = refreshToken
    }
}

// MARK: - Session
public struct SessionResponse: Codable, Sendable, ResponseCodable {
    public let session: Session?
    public let user: User?
    
    public init(session: Session?, user: User?) {
        self.session = session
        self.user = user
    }
}

// MARK: - Logout
public struct LogoutResponse: Codable, Sendable, ResponseCodable {
    public let success: Bool
    public let message: String
    
    public init(success: Bool = true, message: String = "Logged out successfully") {
        self.success = success
        self.message = message
    }
}

// MARK: - Core Models
public struct User: Codable, Sendable, Identifiable {
    public let id: String
    public let email: String
    public let name: String?
    public let createdAt: Date
    public let updatedAt: Date
    
    public init(id: String, email: String, name: String?, createdAt: Date, updatedAt: Date) {
        self.id = id
        self.email = email
        self.name = name
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
    
    enum CodingKeys: String, CodingKey {
        case id, email, name
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}

public struct Session: Codable, Sendable, Identifiable {
    public let id: String
    public let userId: String
    public let expiresAt: Date
    public let createdAt: Date
    
    public init(id: String, userId: String, expiresAt: Date, createdAt: Date) {
        self.id = id
        self.userId = userId
        self.expiresAt = expiresAt
        self.createdAt = createdAt
    }
    
    enum CodingKeys: String, CodingKey {
        case id
        case userId = "user_id"
        case expiresAt = "expires_at"
        case createdAt = "created_at"
    }
}

// MARK: - Error Response
public struct AuthError: Codable, Sendable, ResponseCodable {
    public let error: String
    public let code: String?
    
    public init(error: String, code: String? = nil) {
        self.error = error
        self.code = code
    }
}