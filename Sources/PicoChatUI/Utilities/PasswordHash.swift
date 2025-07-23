//
//  PasswordHash.swift
//  PicoChatUI
//
//  Created by Ronald Mannak on 7/16/25.
//

import Foundation
import Crypto

public struct PasswordHash: Sendable {
    
    /// Hash a password using SHA256
    /// Note: In production, use bcrypt or Argon2 instead
    public static func hash(_ password: String) -> String {
        let data = Data(password.utf8)
        let digest = SHA256.hash(data: data)
        return digest.compactMap { String(format: "%02x", $0) }.joined()
    }
    
    /// Verify a password against a hash
    public static func verify(_ password: String, against hash: String) -> Bool {
        return self.hash(password) == hash
    }
    
    /// Generate a random salt
    public static func generateSalt() -> String {
        let saltData = Data((0..<32).map { _ in UInt8.random(in: 0...255) })
        return saltData.base64EncodedString()
    }
    
    /// Hash password with salt
    public static func hashWithSalt(_ password: String, salt: String) -> String {
        let saltedPassword = password + salt
        return hash(saltedPassword)
    }
}