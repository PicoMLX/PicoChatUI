// Mock database client for development

export class DatabaseClient {
  constructor() {
    // Mock implementation for now
  }

  // Generic table operations
  from(table: string) {
    return {
      select: (columns: string = "*") => {
        let queryConditions: any = {}

        return {
          eq: (column: string, value: any) => {
            queryConditions[column] = value
            return {
              eq: (column: string, value: any) => {
                queryConditions[column] = value
                return {
                  single: async () => {
                    return this._getSingleMockData(
                      table,
                      queryConditions,
                      columns
                    )
                  },
                  maybeSingle: async () => {
                    // maybeSingle returns raw data or null, not wrapped
                    const result = this._getSingleMockData(
                      table,
                      queryConditions,
                      columns
                    )
                    return result.data
                  },
                  order: (column: string, options: any) => {
                    return {
                      async then(resolve: any, reject: any) {
                        const result = this._getArrayMockData(
                          table,
                          queryConditions,
                          columns
                        )
                        resolve(result)
                      }
                    }
                  },
                  async then(resolve: any, reject: any) {
                    const result = this._getArrayMockData(
                      table,
                      queryConditions,
                      columns
                    )
                    resolve(result)
                  }
                }
              },
              single: async () => {
                return this._getSingleMockData(table, queryConditions, columns)
              },
              maybeSingle: async () => {
                // maybeSingle returns raw data or null, not wrapped
                const result = this._getSingleMockData(
                  table,
                  queryConditions,
                  columns
                )
                return result.data
              },
              order: (column: string, options: any) => {
                return {
                  async then(resolve: any, reject: any) {
                    const result = this._getArrayMockData(
                      table,
                      queryConditions,
                      columns
                    )
                    resolve(result)
                  }
                }
              },
              async then(resolve: any, reject: any) {
                const result = this._getArrayMockData(
                  table,
                  queryConditions,
                  columns
                )
                resolve(result)
              }
            }
          }
        }
      },
      insert: (data: any) => ({
        select: (columns: string = "*") => ({
          single: async () => {
            const insertedData = {
              id: "mock-inserted-id",
              ...data,
              created_at: data.created_at || "2024-01-01T00:00:00Z",
              updated_at: data.updated_at || "2024-01-01T00:00:00Z",
              // Add default properties for specific table types
              ...(table === "files" && {
                folder_id: data.folder_id || null,
                file_path: data.file_path || "mock-file-path",
                size: data.size || 1024,
                tokens: data.tokens || 100,
                type: data.type || "txt"
              })
            }
            return {
              data: insertedData,
              error: null,
              ...insertedData
            }
          },
          async then(resolve: any, reject: any) {
            resolve({
              data: [{ id: "mock-inserted-id", ...data }],
              error: null
            })
          }
        })
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: (columns: string = "*") => ({
            single: async () => {
              const updatedData = {
                id: value,
                ...data,
                updated_at: data.updated_at || "2024-01-01T00:00:00Z"
              }
              return {
                data: updatedData,
                error: null,
                ...updatedData
              }
            },
            async then(resolve: any, reject: any) {
              resolve({
                data: [{ id: value, ...data }],
                error: null
              })
            }
          })
        })
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          async execute() {
            return { error: null }
          },
          async then(resolve: any, reject: any) {
            resolve({ error: null })
          }
        })
      }),
      rpc: (functionName: string, params: any) => {
        return {
          async execute() {
            return { error: null }
          },
          async then(resolve: any, reject: any) {
            resolve({ error: null })
          }
        }
      }
    }
  }

  // Storage operations (previously missing)
  storage = {
    from: (bucket: string) => ({
      upload: async (path: string, file: File | Blob) => {
        return { data: { path: `mock-uploads/${path}` }, error: null }
      },
      remove: async (paths: string[]) => {
        return { data: null, error: null }
      },
      createSignedUrl: async (path: string, expiresIn: number) => {
        return {
          data: { signedUrl: `https://mock-storage.com/${path}` },
          error: null
        }
      }
    })
  }

  private _getSingleMockData(
    table: string,
    queryConditions: any,
    columns: string
  ) {
    if (table === "profiles") {
      const profileData = {
        id: "mock-profile-id",
        user_id: queryConditions.user_id || "mock-user-id",
        name: "Mock User",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        display_name: "Mock User",
        username: "mockuser",
        bio: "Mock user bio",
        profile_context: "Mock profile context",
        has_onboarded: true,
        image_url: "",
        image_path: "",
        anthropic_api_key: "",
        azure_openai_35_turbo_id: "",
        azure_openai_45_turbo_id: "",
        azure_openai_45_vision_id: "",
        azure_openai_api_key: "",
        azure_openai_endpoint: "",
        azure_openai_embeddings_id: "",
        google_gemini_api_key: "",
        mistral_api_key: "",
        openai_api_key: "",
        openai_organization_id: "",
        perplexity_api_key: "",
        groq_api_key: "",
        openrouter_api_key: "",
        use_azure_openai: false,
        // Add file properties for compatibility
        folder_id: null,
        file_path: "mock-file-path",
        size: 1024,
        tokens: 100,
        type: "txt",
        description: "Mock file description",
        // Add workspace-like properties for compatibility
        instructions: "Mock profile instructions",
        is_home: false,
        include_profile_context: true,
        include_workspace_instructions: true,
        default_context_length: 4096,
        default_model: "gpt-4-1106-preview",
        default_prompt: "You are a friendly, helpful AI assistant.",
        default_temperature: 0.5,
        embeddings_provider: "openai",
        files: [
          {
            id: "mock-file-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock File",
            description: "Mock file description",
            type: "txt",
            file_path: "mock-file-path",
            size: 1024,
            tokens: 100,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            sharing: "private"
          }
        ],
        tools: [
          {
            id: "mock-tool-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock Tool",
            description: "Mock tool description",
            url: "https://mock-tool.com",
            custom_headers: "{}",
            schema: "{}",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            sharing: "private"
          }
        ],
        workspaces: [
          {
            id: "mock-workspace-id",
            user_id: "mock-user-id",
            name: "Mock Workspace",
            description: "Mock workspace description",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z"
          }
        ]
      }

      return {
        data: profileData,
        error: null,
        ...profileData
      }
    }

    if (table === "workspaces") {
      // Always return workspace with assistants array for type consistency
      const workspaceData = {
        id: queryConditions.id || "mock-workspace-id",
        name: "Mock Workspace",
        user_id: "mock-user-id",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        // Add profile properties for compatibility
        display_name: "Mock User",
        username: "mockuser",
        bio: "Mock user bio",
        profile_context: "Mock profile context",
        has_onboarded: true,
        anthropic_api_key: "",
        azure_openai_35_turbo_id: "",
        azure_openai_45_turbo_id: "",
        azure_openai_45_vision_id: "",
        azure_openai_api_key: "",
        azure_openai_endpoint: "",
        azure_openai_embeddings_id: "",
        google_gemini_api_key: "",
        mistral_api_key: "",
        openai_api_key: "",
        openai_organization_id: "",
        perplexity_api_key: "",
        groq_api_key: "",
        openrouter_api_key: "",
        use_azure_openai: false,
        // Add file properties for compatibility
        folder_id: null,
        file_path: "mock-file-path",
        size: 1024,
        tokens: 100,
        type: "txt",
        description: "Mock file description",
        // Workspace properties
        instructions: "Mock workspace instructions",
        image_url: "",
        image_path: "",
        is_home: queryConditions.is_home || false,
        include_profile_context: true,
        include_workspace_instructions: true,
        default_context_length: 4096,
        default_model: "gpt-4-1106-preview",
        default_prompt: "You are a friendly, helpful AI assistant.",
        default_temperature: 0.5,
        embeddings_provider: "openai",
        assistants: [
          {
            id: "mock-assistant-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock Assistant",
            description: "Mock assistant description",
            instructions: "You are a helpful assistant.",
            prompt: "You are a helpful assistant.",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            model: "gpt-4-1106-preview",
            image_url: "",
            image_path: "",
            include_profile_context: true,
            include_workspace_instructions: true,
            context_length: 4096,
            temperature: 0.5,
            embeddings_provider: "openai",
            sharing: "private"
          }
        ],
        collections: [
          {
            id: "mock-collection-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock Collection",
            description: "Mock collection description",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            sharing: "private"
          }
        ],
        files: [
          {
            id: "mock-file-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock File",
            description: "Mock file description",
            type: "txt",
            file_path: "mock-file-path",
            size: 1024,
            tokens: 100,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            sharing: "private"
          }
        ],
        presets: [
          {
            id: "mock-preset-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock Preset",
            description: "Mock preset description",
            context_length: 4096,
            model: "gpt-4-1106-preview",
            prompt: "You are a helpful assistant.",
            temperature: 0.5,
            include_profile_context: true,
            include_workspace_instructions: true,
            embeddings_provider: "openai",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            sharing: "private"
          }
        ],
        prompts: [
          {
            id: "mock-prompt-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock Prompt",
            content: "You are a helpful assistant.",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            sharing: "private"
          }
        ],
        tools: [
          {
            id: "mock-tool-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock Tool",
            description: "Mock tool description",
            url: "https://mock-tool.com",
            custom_headers: "{}",
            schema: "{}",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            sharing: "private"
          }
        ],
        models: [
          {
            id: "mock-model-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock Model",
            model_id: "gpt-4-1106-preview",
            description: "Mock model description",
            api_key: "mock-api-key",
            base_url: "https://api.openai.com/v1",
            context_length: 4096,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            sharing: "private"
          }
        ]
      }

      // Return raw data for functions that don't destructure, but with both { data, error } capability
      return {
        data: workspaceData,
        error: null,
        // Add properties directly on object for functions expecting raw data
        ...workspaceData
      }
    }

    if (table === "chats") {
      const chatData = {
        id: queryConditions.id || "mock-chat-id",
        user_id: queryConditions.user_id || "mock-user-id",
        workspace_id: queryConditions.workspace_id || "mock-workspace-id",
        assistant_id: queryConditions.assistant_id || "mock-assistant-id",
        name: "Mock Chat",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        context_length: 4096,
        model: "gpt-4-1106-preview",
        prompt: "You are a helpful assistant.",
        temperature: 0.5,
        embeddings_provider: "openai",
        sharing: "private",
        // Add profile properties for compatibility
        display_name: "Mock User",
        username: "mockuser",
        bio: "Mock user bio",
        profile_context: "Mock profile context",
        has_onboarded: true,
        image_url: "",
        image_path: "",
        anthropic_api_key: "",
        azure_openai_35_turbo_id: "",
        azure_openai_45_turbo_id: "",
        azure_openai_45_vision_id: "",
        azure_openai_api_key: "",
        azure_openai_endpoint: "",
        azure_openai_embeddings_id: "",
        google_gemini_api_key: "",
        mistral_api_key: "",
        openai_api_key: "",
        openai_organization_id: "",
        perplexity_api_key: "",
        groq_api_key: "",
        openrouter_api_key: "",
        use_azure_openai: false,
        // Add file properties for compatibility
        folder_id: null,
        file_path: "mock-file-path",
        size: 1024,
        tokens: 100,
        type: "txt",
        description: "Mock file description",
        files: [
          {
            id: "mock-file-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock File",
            description: "Mock file description",
            type: "txt",
            file_path: "mock-file-path",
            size: 1024,
            tokens: 100,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            sharing: "private"
          }
        ],
        tools: [
          {
            id: "mock-tool-id",
            user_id: "mock-user-id",
            folder_id: null,
            name: "Mock Tool",
            description: "Mock tool description",
            url: "https://mock-tool.com",
            custom_headers: "{}",
            schema: "{}",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            sharing: "private"
          }
        ],
        workspaces: [
          {
            id: "mock-workspace-id",
            user_id: "mock-user-id",
            name: "Mock Workspace",
            description: "Mock workspace description",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z"
          }
        ]
      }

      return {
        data: chatData,
        error: null,
        ...chatData
      }
    }

    // Generic fallback for other tables - include all properties to avoid type issues
    const genericData = {
      id: queryConditions.id || "mock-id",
      user_id: queryConditions.user_id || "mock-user-id",
      name: "mock-name",
      display_name: "Mock User",
      username: "mockuser",
      bio: "Mock user bio",
      profile_context: "Mock profile context",
      has_onboarded: true,
      image_url: "",
      image_path: "",
      anthropic_api_key: "",
      azure_openai_35_turbo_id: "",
      azure_openai_45_turbo_id: "",
      azure_openai_45_vision_id: "",
      azure_openai_api_key: "",
      azure_openai_endpoint: "",
      azure_openai_embeddings_id: "",
      google_gemini_api_key: "",
      mistral_api_key: "",
      openai_api_key: "",
      openai_organization_id: "",
      perplexity_api_key: "",
      groq_api_key: "",
      openrouter_api_key: "",
      use_azure_openai: false,
      // Add file properties for compatibility
      folder_id: null,
      file_path: "mock-file-path",
      size: 1024,
      tokens: 100,
      type: "txt",
      description: "Mock file description",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
      assistants: [
        {
          id: "mock-assistant-id",
          user_id: "mock-user-id",
          folder_id: null,
          name: "Mock Assistant",
          description: "Mock assistant description",
          instructions: "You are a helpful assistant.",
          prompt: "You are a helpful assistant.",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          model: "gpt-4-1106-preview",
          image_url: "",
          image_path: "",
          include_profile_context: true,
          include_workspace_instructions: true,
          context_length: 4096,
          temperature: 0.5,
          embeddings_provider: "openai",
          sharing: "private"
        }
      ],
      collections: [
        {
          id: "mock-collection-id",
          user_id: "mock-user-id",
          folder_id: null,
          name: "Mock Collection",
          description: "Mock collection description",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          sharing: "private"
        }
      ],
      files: [
        {
          id: "mock-file-id",
          user_id: "mock-user-id",
          folder_id: null,
          name: "Mock File",
          description: "Mock file description",
          type: "txt",
          file_path: "mock-file-path",
          size: 1024,
          tokens: 100,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          sharing: "private"
        }
      ],
      presets: [
        {
          id: "mock-preset-id",
          user_id: "mock-user-id",
          folder_id: null,
          name: "Mock Preset",
          description: "Mock preset description",
          context_length: 4096,
          model: "gpt-4-1106-preview",
          prompt: "You are a helpful assistant.",
          temperature: 0.5,
          include_profile_context: true,
          include_workspace_instructions: true,
          embeddings_provider: "openai",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          sharing: "private"
        }
      ],
      prompts: [
        {
          id: "mock-prompt-id",
          user_id: "mock-user-id",
          folder_id: null,
          name: "Mock Prompt",
          content: "You are a helpful assistant.",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          sharing: "private"
        }
      ],
      tools: [
        {
          id: "mock-tool-id",
          user_id: "mock-user-id",
          folder_id: null,
          name: "Mock Tool",
          description: "Mock tool description",
          url: "https://mock-tool.com",
          custom_headers: "{}",
          schema: "{}",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          sharing: "private"
        }
      ],
      models: [
        {
          id: "mock-model-id",
          user_id: "mock-user-id",
          folder_id: null,
          name: "Mock Model",
          model_id: "gpt-4-1106-preview",
          description: "Mock model description",
          api_key: "mock-api-key",
          base_url: "https://api.openai.com/v1",
          context_length: 4096,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          sharing: "private"
        }
      ],
      files: [
        {
          id: "mock-file-id",
          user_id: "mock-user-id",
          folder_id: null,
          name: "Mock File",
          description: "Mock file description",
          type: "txt",
          file_path: "mock-file-path",
          size: 1024,
          tokens: 100,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          sharing: "private"
        }
      ],
      tools: [
        {
          id: "mock-tool-id",
          user_id: "mock-user-id",
          folder_id: null,
          name: "Mock Tool",
          description: "Mock tool description",
          url: "https://mock-tool.com",
          custom_headers: "{}",
          schema: "{}",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          sharing: "private"
        }
      ],
      workspaces: [
        {
          id: "mock-workspace-id",
          user_id: "mock-user-id",
          name: "Mock Workspace",
          description: "Mock workspace description",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z"
        }
      ]
    }

    return {
      data: genericData,
      error: null,
      ...genericData
    }
  }

  private _getArrayMockData(
    table: string,
    queryConditions: any,
    columns: string
  ) {
    // Return array format for list operations
    const singleResult = this._getSingleMockData(
      table,
      queryConditions,
      columns
    )
    return {
      data: [singleResult.data],
      error: null
    }
  }
}

// Export the singleton instance
export const dbClient = new DatabaseClient()
