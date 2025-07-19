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
        let scriptPath = context.package.directory.appending("build.sh")
        // Directory where outputs from npm build go, adjust as needed
        let outputDir = context.pluginWorkDirectory.appending("npm-build_output")

        return [
            .prebuildCommand(
                displayName: "Running npm build",
                executable: scriptPath,
                arguments: [],
                outputFilesDirectory: outputDir
            )
        ]
    }
}
