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
                    // Return just the data for .single() calls
                    if (table === "profiles" && queryConditions.user_id) {
                      return {
                        id: "mock-profile-id",
                        user_id: queryConditions.user_id,
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
                      }
                    }
                    if (
                      table === "workspaces" &&
                      queryConditions.user_id &&
                      queryConditions.is_home
                    ) {
                      return {
                        id: "mock-home-workspace-id",
                        name: "Mock Home Workspace",
                        user_id: queryConditions.user_id,
                        is_home: true,
                        created_at: "2024-01-01T00:00:00Z",
                        updated_at: "2024-01-01T00:00:00Z",
                        description: "Mock home workspace description",
                        instructions: "Mock home workspace instructions",
                        image_url: "",
                        image_path: "",
                        include_profile_context: true,
                        include_workspace_instructions: true,
                        default_context_length: 4096,
                        default_model: "gpt-4-1106-preview",
                        default_prompt:
                          "You are a friendly, helpful AI assistant.",
                        default_temperature: 0.5,
                        embeddings_provider: "openai"
                      }
                    }
                    if (table === "workspaces" && queryConditions.id) {
                      return {
                        data: {
                          id: queryConditions.id,
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
                          default_prompt:
                            "You are a friendly, helpful AI assistant.",
                          default_temperature: 0.5,
                          embeddings_provider: "openai"
                        },
                        error: null
                      }
                    }
                    if (table === "chats") {
                      return {
                        id: "mock-chat-id",
                        name: "Mock Chat",
                        user_id: "mock-user-id",
                        workspace_id: "mock-workspace-id",
                        assistant_id: null,
                        folder_id: null,
                        created_at: "2024-01-01T00:00:00Z",
                        updated_at: "2024-01-01T00:00:00Z",
                        context_length: 4096,
                        include_profile_context: true,
                        include_workspace_instructions: true,
                        model: "gpt-4-1106-preview",
                        prompt: "You are a friendly, helpful AI assistant.",
                        temperature: 0.5,
                        embeddings_provider: "openai"
                      }
                    }
                    return { id: "mock-id", name: "mock-name" }
                  },
                  maybeSingle: async () => {
                    // Return just the data for .maybeSingle() calls
                    if (table === "chats" && queryConditions.id) {
                      return {
                        id: queryConditions.id,
                        name: "Mock Chat",
                        user_id: "mock-user-id",
                        workspace_id: "mock-workspace-id",
                        assistant_id: null,
                        folder_id: null,
                        created_at: "2024-01-01T00:00:00Z",
                        updated_at: "2024-01-01T00:00:00Z",
                        context_length: 4096,
                        include_profile_context: true,
                        include_workspace_instructions: true,
                        model: "gpt-4-1106-preview",
                        prompt: "You are a friendly, helpful AI assistant.",
                        temperature: 0.5,
                        embeddings_provider: "openai"
                      }
                    }
                    return null
                  },
                  async then(resolve: any, reject: any) {
                    // Always return { data, error } format when awaited
                    let mockData
                    if (table === "profiles" && queryConditions.user_id) {
                      mockData = [
                        {
                          id: "mock-profile-id",
                          user_id: queryConditions.user_id,
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
                        }
                      ]
                    } else if (
                      table === "workspaces" &&
                      queryConditions.user_id
                    ) {
                      mockData = [
                        {
                          id: "mock-workspace-id",
                          name: "Mock Workspace",
                          user_id: queryConditions.user_id,
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
                          default_prompt:
                            "You are a friendly, helpful AI assistant.",
                          default_temperature: 0.5,
                          embeddings_provider: "openai"
                        }
                      ]
                    } else if (table === "chats") {
                      mockData = [
                        {
                          id: "mock-chat-id",
                          name: "Mock Chat",
                          user_id: "mock-user-id",
                          workspace_id: "mock-workspace-id",
                          assistant_id: null,
                          folder_id: null,
                          created_at: "2024-01-01T00:00:00Z",
                          updated_at: "2024-01-01T00:00:00Z",
                          context_length: 4096,
                          include_profile_context: true,
                          include_workspace_instructions: true,
                          model: "gpt-4-1106-preview",
                          prompt: "You are a friendly, helpful AI assistant.",
                          temperature: 0.5,
                          embeddings_provider: "openai"
                        }
                      ]
                    } else {
                      mockData = [{ id: "mock-id", name: "mock-name" }]
                    }
                    resolve({ data: mockData, error: null })
                  }
                }
              },
              single: async () => {
                // Return just the data for .single() calls
                if (table === "profiles" && queryConditions.user_id) {
                  return {
                    id: "mock-profile-id",
                    user_id: queryConditions.user_id,
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
                  }
                }
                if (table === "workspaces" && queryConditions.id) {
                  return {
                    id: queryConditions.id,
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
                    embeddings_provider: "openai"
                  }
                }
                return { id: "mock-id", name: "mock-name" }
              },
              maybeSingle: async () => {
                // Return just the data for .maybeSingle() calls
                if (table === "chats" && queryConditions.id) {
                  return {
                    id: queryConditions.id,
                    name: "Mock Chat",
                    user_id: "mock-user-id",
                    workspace_id: "mock-workspace-id",
                    assistant_id: null,
                    folder_id: null,
                    created_at: "2024-01-01T00:00:00Z",
                    updated_at: "2024-01-01T00:00:00Z",
                    context_length: 4096,
                    include_profile_context: true,
                    include_workspace_instructions: true,
                    model: "gpt-4-1106-preview",
                    prompt: "You are a friendly, helpful AI assistant.",
                    temperature: 0.5,
                    embeddings_provider: "openai"
                  }
                }
                return null
              },
              order: (column: string, options: any) => {
                return {
                  async then(resolve: any, reject: any) {
                    // Always return { data, error } format when awaited
                    let mockData
                    if (table === "profiles" && queryConditions.user_id) {
                      mockData = [
                        {
                          id: "mock-profile-id",
                          user_id: queryConditions.user_id,
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
                        }
                      ]
                    } else if (
                      table === "workspaces" &&
                      queryConditions.user_id
                    ) {
                      mockData = [
                        {
                          id: "mock-workspace-id",
                          name: "Mock Workspace",
                          user_id: queryConditions.user_id,
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
                          default_prompt:
                            "You are a friendly, helpful AI assistant.",
                          default_temperature: 0.5,
                          embeddings_provider: "openai"
                        }
                      ]
                    } else if (table === "chats") {
                      mockData = [
                        {
                          id: "mock-chat-id",
                          name: "Mock Chat",
                          user_id: "mock-user-id",
                          workspace_id: "mock-workspace-id",
                          assistant_id: null,
                          folder_id: null,
                          created_at: "2024-01-01T00:00:00Z",
                          updated_at: "2024-01-01T00:00:00Z",
                          context_length: 4096,
                          include_profile_context: true,
                          include_workspace_instructions: true,
                          model: "gpt-4-1106-preview",
                          prompt: "You are a friendly, helpful AI assistant.",
                          temperature: 0.5,
                          embeddings_provider: "openai"
                        }
                      ]
                    } else {
                      mockData = [{ id: "mock-id", name: "mock-name" }]
                    }
                    resolve({ data: mockData, error: null })
                  }
                }
              },
              async then(resolve: any, reject: any) {
                // Always return { data, error } format when awaited
                let mockData
                if (table === "profiles" && queryConditions.user_id) {
                  mockData = [
                    {
                      id: "mock-profile-id",
                      user_id: queryConditions.user_id,
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
                    }
                  ]
                } else if (table === "workspaces" && queryConditions.user_id) {
                  mockData = [
                    {
                      id: "mock-workspace-id",
                      name: "Mock Workspace",
                      user_id: queryConditions.user_id,
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
                      default_prompt:
                        "You are a friendly, helpful AI assistant.",
                      default_temperature: 0.5,
                      embeddings_provider: "openai"
                    }
                  ]
                } else if (table === "chats") {
                  mockData = [
                    {
                      id: "mock-chat-id",
                      name: "Mock Chat",
                      user_id: "mock-user-id",
                      workspace_id: "mock-workspace-id",
                      assistant_id: null,
                      folder_id: null,
                      created_at: "2024-01-01T00:00:00Z",
                      updated_at: "2024-01-01T00:00:00Z",
                      context_length: 4096,
                      include_profile_context: true,
                      include_workspace_instructions: true,
                      model: "gpt-4-1106-preview",
                      prompt: "You are a friendly, helpful AI assistant.",
                      temperature: 0.5,
                      embeddings_provider: "openai"
                    }
                  ]
                } else {
                  mockData = [{ id: "mock-id", name: "mock-name" }]
                }
                resolve({ data: mockData, error: null })
              }
            }
          }
        }
      },
      insert: (data: any) => ({
        select: (columns: string = "*") => ({
          single: async () => {
            // Return just the data for .single() calls, not { data, error }
            return { id: "mock-inserted-id", ...data }
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
              // Return just the data for .single() calls, not { data, error }
              return { id: value, ...data }
            }
          })
        })
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          async execute() {
            return { error: null }
          }
        })
      })
    }
  }

  // Storage operations
  storage = {
    from: (bucket: string) => ({
      upload: async (path: string, file: File, options?: any) => {
        return { error: null }
      },
      remove: async (paths: string[]) => {
        return { error: null }
      },
      createSignedUrl: async (path: string, expiresIn: number) => {
        return { data: "mock-signed-url", error: null }
      }
    })
  }
}

// Create a singleton instance
export const dbClient = new DatabaseClient()
