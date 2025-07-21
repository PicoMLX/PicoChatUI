//
//  File.swift
//  PicoChatUI
//
//  Created by Ronald Mannak on 7/18/25.
//

import Foundation
import PackagePlugin

@main
struct NPMBuildPlugin: BuildToolPlugin {
    func createBuildCommands(context: PluginContext, target: Target) throws -> [Command] {
        // Path to the script you want to run
        let scriptPath = context.package.directoryURL.appending(components: "build.sh")
        
        // Ensure the script is executable
        let buildShellPath = URL(filePath: "/bin/bash")!
        
        // Directory where outputs from npm build go
        let outputDir = context.pluginWorkDirectoryURL.appending(components: "npm-build-output")
        
        // Define output files - these are the files that the build script will generate
        let buildOutputDir = context.package.directoryURL.appending(components: "Sources/PicoChatUI/build")
        
        // Get the current environment and ensure PATH includes common Node.js locations
        var environment = ProcessInfo.processInfo.environment
        let nodePaths = [
            "/opt/homebrew/opt/node@22/bin",
            "/opt/homebrew/bin",
            "/usr/local/bin"
        ]
        
        if let currentPath = environment["PATH"] {
            let additionalPaths = nodePaths.joined(separator: ":")
            environment["PATH"] = "\(additionalPaths):\(currentPath)"
        } else {
            environment["PATH"] = nodePaths.joined(separator: ":")
        }
        
        return [
            .prebuildCommand(
                displayName: "Running npm build for frontend",
                executable: buildShellPath,
                arguments: [scriptPath.path(percentEncoded: false)],
                environment: environment,
                outputFilesDirectory: outputDir
            )
        ]
    }
}
