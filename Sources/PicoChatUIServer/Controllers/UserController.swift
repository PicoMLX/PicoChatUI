//
//  File.swift
//  PicoChatUI
//
//  Created by Ronald Mannak on 7/16/25.
//

import Foundation
import Hummingbird
import PicoChatUI
import Crypto
import JWTKit

struct UserController: Sendable {
    
    private let jwtSigners: JWTSigners
    
    init() {
        self.jwtSigners = JWTSigners()
        // Add HMAC signer with a secret key
        // In production, this should come from environment variables
        let secretKey = "your-secret-key-change-this-in-production"
        self.jwtSigners.use(.hs256(key: secretKey))
    }
    
    func addRoutes(to group: RouterGroup<some RequestContext>) {
        group
            .post("login", use: self.login)
            .post("signup", use: self.signup)
            .post("logout", use: self.logout)
            .get("session", use: self.session)
    }
    
    @Sendable func login(_ request: Request, context: some RequestContext) async throws -> Response {
        let loginRequest = try await request.decode(as: LoginRequest.self, context: context)
        
        // TODO: Validate email and password against database
        // For now, return mock success response
        if loginRequest.email.isEmpty || loginRequest.password.isEmpty {
            let authError = AuthError(error: "Email and password are required", code: "invalid_credentials")
            return Response(status: .badRequest, body: ResponseBody(authError))
        }
        
        // Mock user creation - replace with actual database lookup
        let user = User(
            id: UUID().uuidString,
            email: loginRequest.email,
            name: "Test User",
            createdAt: Date(),
            updatedAt: Date()
        )
        
        // Create session
        let session = Session(
            id: UUID().uuidString,
            userId: user.id,
            expiresAt: Date().addingTimeInterval(86400 * 7), // 7 days
            createdAt: Date()
        )
        
        // Generate JWT tokens
        let accessToken = try self.generateAccessToken(for: user)
        let refreshToken = try self.generateRefreshToken(for: user)
        
        let response = LoginResponse(
            user: user,
            session: session,
            accessToken: accessToken,
            refreshToken: refreshToken
        )
        
        return Response(status: .ok, body: ResponseBody(response))
    }
    
    @Sendable func signup(_ request: Request, context: some RequestContext) async throws -> Response {
        let signupRequest = try await request.decode(as: SignupRequest.self, context: context)
        
        // Validate input
        if signupRequest.email.isEmpty || signupRequest.password.isEmpty {
            let authError = AuthError(error: "Email and password are required", code: "invalid_input")
            return Response(status: .badRequest, body: ResponseBody(authError))
        }
        
        if signupRequest.password.count < 8 {
            let authError = AuthError(error: "Password must be at least 8 characters long", code: "weak_password")
            return Response(status: .badRequest, body: ResponseBody(authError))
        }
        
        // TODO: Check if user already exists in database
        // TODO: Hash password before storing
        
        // Mock user creation
        let user = User(
            id: UUID().uuidString,
            email: signupRequest.email,
            name: signupRequest.name ?? "New User",
            createdAt: Date(),
            updatedAt: Date()
        )
        
        // Create session
        let session = Session(
            id: UUID().uuidString,
            userId: user.id,
            expiresAt: Date().addingTimeInterval(86400 * 7), // 7 days
            createdAt: Date()
        )
        
        // Generate JWT tokens
        let accessToken = try self.generateAccessToken(for: user)
        let refreshToken = try self.generateRefreshToken(for: user)
        
        let response = SignupResponse(
            user: user,
            session: session,
            accessToken: accessToken,
            refreshToken: refreshToken
        )
        
        return Response(status: .created, body: ResponseBody(response))
    }
    
    @Sendable func logout(_ request: Request, context: some RequestContext) async throws -> Response {
        // TODO: Invalidate session token in database
        // For now, just return success
        
        let response = LogoutResponse(success: true, message: "Logged out successfully")
        return Response(status: .ok, body: ResponseBody(response))
    }
    
    @Sendable func session(_ request: Request, context: some RequestContext) async throws -> Response {
        // TODO: Validate JWT token from Authorization header
        // TODO: Lookup session in database
        
        // Extract Authorization header
        guard let authHeader = request.headers[.authorization].first,
              authHeader.hasPrefix("Bearer ") else {
            let response = SessionResponse(session: nil, user: nil)
            return Response(status: .ok, body: ResponseBody(response))
        }
        
        let token = String(authHeader.dropFirst(7)) // Remove "Bearer "
        
        do {
            // Validate JWT token
            let payload = try self.jwtSigners.verify(token, as: JWTPayload.self)
            
            // TODO: Lookup user in database using payload.userId
            // Mock user and session
            let user = User(
                id: payload.userId,
                email: "test@example.com",
                name: "Test User",
                createdAt: Date(),
                updatedAt: Date()
            )
            
            let session = Session(
                id: UUID().uuidString,
                userId: user.id,
                expiresAt: payload.exp.value,
                createdAt: Date()
            )
            
            let response = SessionResponse(session: session, user: user)
            return Response(status: .ok, body: ResponseBody(response))
            
        } catch {
            // Invalid token
            let response = SessionResponse(session: nil, user: nil)
            return Response(status: .ok, body: ResponseBody(response))
        }
    }
    
    // MARK: - Private Methods
    
    private func generateAccessToken(for user: User) throws -> String {
        let payload = JWTPayload(
            userId: user.id,
            email: user.email,
            exp: ExpirationClaim(value: Date().addingTimeInterval(3600)), // 1 hour
            iat: IssuedAtClaim(value: Date())
        )
        return try self.jwtSigners.sign(payload)
    }
    
    private func generateRefreshToken(for user: User) throws -> String {
        let payload = JWTPayload(
            userId: user.id,
            email: user.email,
            exp: ExpirationClaim(value: Date().addingTimeInterval(86400 * 30)), // 30 days
            iat: IssuedAtClaim(value: Date())
        )
        return try self.jwtSigners.sign(payload)
    }
}

// MARK: - JWT Payload

private struct JWTPayload: JWTPayload {
    let userId: String
    let email: String
    let exp: ExpirationClaim
    let iat: IssuedAtClaim
    
    enum CodingKeys: String, CodingKey {
        case userId = "user_id"
        case email
        case exp
        case iat
    }
    
    func verify(using signer: JWTSigner) throws {
        try self.exp.verifyNotExpired()
    }
}