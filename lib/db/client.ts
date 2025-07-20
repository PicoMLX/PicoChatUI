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
                    // Always return { data, error } for .single()
                    if (
                      table === "workspaces" &&
                      queryConditions.user_id &&
                      queryConditions.is_home
                    ) {
                      return {
                        data: {
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
                        },
                        error: null
                      }
                    }
                    if (table === "workspaces" && queryConditions.id) {
                      // Check if this is a query with assistants join
                      if (columns.includes("assistants")) {
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
                            embeddings_provider: "openai",
                            assistants: [
                              {
                                id: "mock-assistant-id",
                                user_id: "mock-user-id",
                                folder_id: null,
                                created_at: "2024-01-01T00:00:00Z",
                                updated_at: "2024-01-01T00:00:00Z",
                                name: "Mock Assistant",
                                description: "Mock assistant description",
                                instructions: "Mock assistant instructions",
                                image_url: null,
                                image_path: "",
                                context_length: 4096,
                                embeddings_provider: "openai",
                                include_profile_context: true,
                                include_workspace_instructions: true,
                                model: "gpt-4-1106-preview",
                                prompt:
                                  "You are a friendly, helpful AI assistant.",
                                temperature: 0.5
                              }
                            ]
                          },
                          error: null
                        }
                      }
                      // Check if this is a query with collections join
                      if (columns.includes("collections")) {
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
                            embeddings_provider: "openai",
                            collections: [
                              {
                                id: "mock-collection-id",
                                user_id: "mock-user-id",
                                folder_id: null,
                                created_at: "2024-01-01T00:00:00Z",
                                updated_at: "2024-01-01T00:00:00Z",
                                name: "Mock Collection",
                                description: "Mock collection description"
                              }
                            ]
                          },
                          error: null
                        }
                      }
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
                    if (table === "assistant_workspaces") {
                      return {
                        data: {
                          assistants: [
                            {
                              id: "mock-assistant-id",
                              user_id: "mock-user-id",
                              folder_id: null,
                              created_at: "2024-01-01T00:00:00Z",
                              updated_at: "2024-01-01T00:00:00Z",
                              name: "Mock Assistant",
                              description: "Mock assistant description",
                              instructions: "Mock assistant instructions",
                              image_url: null,
                              image_path: "",
                              context_length: 4096,
                              embeddings_provider: "openai",
                              include_profile_context: true,
                              include_workspace_instructions: true,
                              model: "gpt-4-1106-preview",
                              prompt:
                                "You are a friendly, helpful AI assistant.",
                              temperature: 0.5
                            }
                          ]
                        },
                        error: null
                      }
                    }
                    if (table === "chats") {
                      return {
                        data: {
                          id: "mock-chat-id",
                          name: "Mock Chat",
                          files: [
                            {
                              id: "file1",
                              name: "mock-file1.txt",
                              type: "text/plain"
                            },
                            {
                              id: "file2",
                              name: "mock-file2.txt",
                              type: "text/plain"
                            }
                          ]
                        },
                        error: null
                      }
                    }
                    if (table === "messages") {
                      return {
                        data: {
                          id: "mock-message-id",
                          content: "Mock message content",
                          file_items: [{ id: "item1", content: "mock content" }]
                        },
                        error: null
                      }
                    }
                    return {
                      data: { id: "mock-id", name: "mock-name" },
                      error: null
                    }
                  },
                  async then(resolve: any, reject: any) {
                    // Always return { data, error } format when awaited
                    let mockData
                    if (table === "workspaces" && queryConditions.user_id) {
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
                    } else if (table === "assistant_workspaces") {
                      mockData = {
                        assistants: [
                          {
                            id: "mock-assistant-id",
                            user_id: "mock-user-id",
                            folder_id: null,
                            created_at: "2024-01-01T00:00:00Z",
                            updated_at: "2024-01-01T00:00:00Z",
                            name: "Mock Assistant",
                            description: "Mock assistant description",
                            instructions: "Mock assistant instructions",
                            image_url: null,
                            image_path: "",
                            context_length: 4096,
                            embeddings_provider: "openai",
                            include_profile_context: true,
                            include_workspace_instructions: true,
                            model: "gpt-4-1106-preview",
                            prompt: "You are a friendly, helpful AI assistant.",
                            temperature: 0.5
                          }
                        ]
                      }
                    } else if (table === "chats") {
                      mockData = [
                        {
                          id: "mock-chat-id",
                          name: "Mock Chat",
                          files: [
                            {
                              id: "file1",
                              name: "mock-file1.txt",
                              type: "text/plain"
                            },
                            {
                              id: "file2",
                              name: "mock-file2.txt",
                              type: "text/plain"
                            }
                          ]
                        }
                      ]
                    } else if (table === "messages") {
                      mockData = [
                        {
                          id: "mock-message-id",
                          content: "Mock message content",
                          file_items: [{ id: "item1", content: "mock content" }]
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
                // Always return { data, error } for .single()
                if (table === "workspaces" && queryConditions.id) {
                  // Check if this is a query with assistants join
                  if (columns.includes("assistants")) {
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
                        embeddings_provider: "openai",
                        assistants: [
                          {
                            id: "mock-assistant-id",
                            user_id: "mock-user-id",
                            folder_id: null,
                            created_at: "2024-01-01T00:00:00Z",
                            updated_at: "2024-01-01T00:00:00Z",
                            name: "Mock Assistant",
                            description: "Mock assistant description",
                            instructions: "Mock assistant instructions",
                            image_url: null,
                            image_path: "",
                            context_length: 4096,
                            embeddings_provider: "openai",
                            include_profile_context: true,
                            include_workspace_instructions: true,
                            model: "gpt-4-1106-preview",
                            prompt: "You are a friendly, helpful AI assistant.",
                            temperature: 0.5
                          }
                        ]
                      },
                      error: null
                    }
                  }
                  // Check if this is a query with collections join
                  if (columns.includes("collections")) {
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
                        embeddings_provider: "openai",
                        collections: [
                          {
                            id: "mock-collection-id",
                            user_id: "mock-user-id",
                            folder_id: null,
                            created_at: "2024-01-01T00:00:00Z",
                            updated_at: "2024-01-01T00:00:00Z",
                            name: "Mock Collection",
                            description: "Mock collection description"
                          }
                        ]
                      },
                      error: null
                    }
                  }
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
                if (table === "assistant_workspaces") {
                  return {
                    data: {
                      assistants: [
                        {
                          id: "mock-assistant-id",
                          user_id: "mock-user-id",
                          folder_id: null,
                          created_at: "2024-01-01T00:00:00Z",
                          updated_at: "2024-01-01T00:00:00Z",
                          name: "Mock Assistant",
                          description: "Mock assistant description",
                          instructions: "Mock assistant instructions",
                          image_url: null,
                          image_path: "",
                          context_length: 4096,
                          embeddings_provider: "openai",
                          include_profile_context: true,
                          include_workspace_instructions: true,
                          model: "gpt-4-1106-preview",
                          prompt: "You are a friendly, helpful AI assistant.",
                          temperature: 0.5
                        }
                      ]
                    },
                    error: null
                  }
                }
                if (table === "chats") {
                  return {
                    data: {
                      id: "mock-chat-id",
                      name: "Mock Chat",
                      files: [
                        {
                          id: "file1",
                          name: "mock-file1.txt",
                          type: "text/plain"
                        },
                        {
                          id: "file2",
                          name: "mock-file2.txt",
                          type: "text/plain"
                        }
                      ]
                    },
                    error: null
                  }
                }
                if (table === "messages") {
                  return {
                    data: {
                      id: "mock-message-id",
                      content: "Mock message content",
                      file_items: [{ id: "item1", content: "mock content" }]
                    },
                    error: null
                  }
                }
                return {
                  data: { id: "mock-id", name: "mock-name" },
                  error: null
                }
              },
              order: (column: string, options: any) => {
                return {
                  async then(resolve: any, reject: any) {
                    // Always return { data, error } format when awaited
                    let mockData
                    if (table === "workspaces" && queryConditions.user_id) {
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
                    } else if (table === "assistant_workspaces") {
                      mockData = {
                        assistants: [
                          {
                            id: "mock-assistant-id",
                            user_id: "mock-user-id",
                            folder_id: null,
                            created_at: "2024-01-01T00:00:00Z",
                            updated_at: "2024-01-01T00:00:00Z",
                            name: "Mock Assistant",
                            description: "Mock assistant description",
                            instructions: "Mock assistant instructions",
                            image_url: null,
                            image_path: "",
                            context_length: 4096,
                            embeddings_provider: "openai",
                            include_profile_context: true,
                            include_workspace_instructions: true,
                            model: "gpt-4-1106-preview",
                            prompt: "You are a friendly, helpful AI assistant.",
                            temperature: 0.5
                          }
                        ]
                      }
                    } else if (table === "chats") {
                      mockData = [
                        {
                          id: "mock-chat-id",
                          name: "Mock Chat",
                          files: [
                            {
                              id: "file1",
                              name: "mock-file1.txt",
                              type: "text/plain"
                            },
                            {
                              id: "file2",
                              name: "mock-file2.txt",
                              type: "text/plain"
                            }
                          ]
                        }
                      ]
                    } else if (table === "messages") {
                      mockData = [
                        {
                          id: "mock-message-id",
                          content: "Mock message content",
                          file_items: [{ id: "item1", content: "mock content" }]
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
                if (table === "workspaces" && queryConditions.user_id) {
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
                } else if (table === "assistant_workspaces") {
                  mockData = {
                    assistants: [
                      {
                        id: "mock-assistant-id",
                        user_id: "mock-user-id",
                        folder_id: null,
                        created_at: "2024-01-01T00:00:00Z",
                        updated_at: "2024-01-01T00:00:00Z",
                        name: "Mock Assistant",
                        description: "Mock assistant description",
                        instructions: "Mock assistant instructions",
                        image_url: null,
                        image_path: "",
                        context_length: 4096,
                        embeddings_provider: "openai",
                        include_profile_context: true,
                        include_workspace_instructions: true,
                        model: "gpt-4-1106-preview",
                        prompt: "You are a friendly, helpful AI assistant.",
                        temperature: 0.5
                      }
                    ]
                  }
                } else if (table === "chats") {
                  mockData = [
                    {
                      id: "mock-chat-id",
                      name: "Mock Chat",
                      files: [
                        {
                          id: "file1",
                          name: "mock-file1.txt",
                          type: "text/plain"
                        },
                        {
                          id: "file2",
                          name: "mock-file2.txt",
                          type: "text/plain"
                        }
                      ]
                    }
                  ]
                } else if (table === "messages") {
                  mockData = [
                    {
                      id: "mock-message-id",
                      content: "Mock message content",
                      file_items: [{ id: "item1", content: "mock content" }]
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
            return { data: { id: "mock-inserted-id", ...data }, error: null }
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
              return { data: { id: value, ...data }, error: null }
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
