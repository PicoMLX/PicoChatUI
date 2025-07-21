//
//  File.swift
//  PicoChatUI
//
//  Created by Ronald Mannak on 7/15/25.
//

import Foundation

extension URL {
    
    public static var buildDirectory: URL? {
        guard let sourceURL = Bundle.module.resourceURL else {
            assertionFailure("No resource bundle present. Be sure to run `build.sh` to compile the frontend")
            return nil
        }
        let buildURL = sourceURL.appendingPathComponent("build", isDirectory: true)
        return buildURL
    }
}
