// Mock database client for development
export class DatabaseClient {
  constructor() {
    // Mock implementation for now
  }

  // Generic table operations
  from(table: string) {
    return {
      select: (columns: string = "*") => ({
        eq: (column: string, value: any) => ({
          single: async () => {
            // Mock data for different tables
            if (table === "chats") {
              return {
                id: "mock-chat-id",
                name: "Mock Chat",
                files: [
                  { id: "file1", name: "mock-file1.txt", type: "text/plain" },
                  { id: "file2", name: "mock-file2.txt", type: "text/plain" }
                ]
              }
            }
            if (table === "messages") {
              return {
                id: "mock-message-id",
                content: "Mock message content",
                file_items: [{ id: "item1", content: "mock content" }]
              }
            }
            return { id: "mock-id", name: "mock-name" }
          }
        })
      }),
      insert: (data: any) => ({
        select: (columns: string = "*") => ({
          single: async () => {
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
