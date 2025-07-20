//
//  File.swift
//  PicoWebUI
//
//  Created by Ronald Mannak on 5/26/25.
//

import Foundation
import SwiftData

/// A model actor for managing chat data operations in a thread-safe manner
@ModelActor
public actor ChatModelActor {
    
    /// Initialize the ChatModelActor with the given model context
    /// - Parameter modelContainer: The SwiftData model container
    public init(modelContainer: ModelContainer) {
        let modelContext = ModelContext(modelContainer)
        self.init(modelExecutor: DefaultSerialExecutor.shared, modelContext: modelContext)
    }
}