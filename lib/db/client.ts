// Mock database client for development

// Centralized mock data handler to avoid union type issues
const getMockData = (
  table: string,
  operation: string,
  queryConditions: any,
  columns: string
) => {
  if (table === "profiles") {
    return {
      data: {
        // Profile-specific data with unique discriminator
        __type: "profile",
        id: "mock-profile-id",
        user_id: queryConditions.user_id || "mock-user-id",
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
        use_azure_openai: false
      },
      error: null
    }
  }

  if (table === "workspaces") {
    // Always return workspace with assistants array for any workspace query
    // This ensures both getWorkspaceById and getAssistantWorkspacesByWorkspaceId work
    return {
      data: {
        // Workspace-specific data with unique discriminator
        __type: "workspace",
        id: queryConditions.id || "mock-workspace-id",
        name: "Mock Workspace",
        user_id: "mock-user-id",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        description: "Mock workspace description",
        instructions: "Mock workspace instructions",
        image_url: "",
        image_path: "",
        is_home: false,
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
            name: "Mock Assistant",
            description: "Mock assistant description",
            instructions: "You are a helpful assistant.",
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
        ]
      },
      error: null
    }
  }

  // Default fallback for unknown tables
  return {
    data: {
      __type: "unknown",
      id: queryConditions.id || "mock-id",
      name: "mock-name",
      table_type: table
    },
    error: null
  }
}

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
                    return getMockData(
                      table,
                      "single",
                      queryConditions,
                      columns
                    )
                  },
                  maybeSingle: async () => {
                    return getMockData(
                      table,
                      "maybeSingle",
                      queryConditions,
                      columns
                    )
                  },
                  order: (column: string, options: any) => {
                    return {
                      async then(resolve: any, reject: any) {
                        const result = getMockData(
                          table,
                          "array",
                          queryConditions,
                          columns
                        )
                        resolve(result)
                      }
                    }
                  },
                  async then(resolve: any, reject: any) {
                    const result = getMockData(
                      table,
                      "array",
                      queryConditions,
                      columns
                    )
                    resolve(result)
                  }
                }
              },
              single: async () => {
                return getMockData(table, "single", queryConditions, columns)
              },
              maybeSingle: async () => {
                return getMockData(
                  table,
                  "maybeSingle",
                  queryConditions,
                  columns
                )
              },
              order: (column: string, options: any) => {
                return {
                  async then(resolve: any, reject: any) {
                    const result = getMockData(
                      table,
                      "array",
                      queryConditions,
                      columns
                    )
                    resolve(result)
                  }
                }
              },
              async then(resolve: any, reject: any) {
                const result = getMockData(
                  table,
                  "array",
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
            return {
              data: {
                id: "mock-inserted-id",
                ...data,
                created_at: data.created_at || "2024-01-01T00:00:00Z",
                updated_at: data.updated_at || "2024-01-01T00:00:00Z"
              },
              error: null
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
              return {
                data: {
                  id: value,
                  ...data,
                  updated_at: data.updated_at || "2024-01-01T00:00:00Z"
                },
                error: null
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
}

// Export the singleton instance
export const dbClient = new DatabaseClient()
