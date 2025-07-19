// Database client to replace Supabase
export class DatabaseClient {
  private baseUrl: string

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/pico/v1"
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Database operation failed")
    }

    return response.json()
  }

  // Generic table operations
  from(table: string) {
    const self = this
    return {
      select: (columns: string = "*") => ({
        eq: (column: string, value: any) => ({
          single: async () => {
            const result = await self.request(
              `/db/${table}?select=${columns}&eq=${column}:${value}&single=true`
            )
            return { data: result }
          }
        })
      }),
      insert: (data: any) => ({
        select: (columns: string = "*") => ({
          single: async () => {
            const result = await self.request(`/db/${table}`, {
              method: "POST",
              body: JSON.stringify({ data, select: columns, single: true })
            })
            return { data: result }
          }
        })
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: (columns: string = "*") => ({
            single: async () => {
              const result = await self.request(`/db/${table}`, {
                method: "PUT",
                body: JSON.stringify({
                  data,
                  eq: { column, value },
                  select: columns,
                  single: true
                })
              })
              return { data: result }
            }
          })
        })
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          async execute() {
            return self.request(`/db/${table}`, {
              method: "DELETE",
              body: JSON.stringify({ eq: { column, value } })
            })
          }
        })
      })
    }
  }

  // Storage operations
  storage = {
    from: (bucket: string) => ({
      upload: async (path: string, file: File, options?: any) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("path", path)
        formData.append("bucket", bucket)

        const response = await fetch(`${this.baseUrl}/storage/upload`, {
          method: "POST",
          body: formData
        })

        if (!response.ok) {
          throw new Error("Upload failed")
        }

        return { error: null }
      },
      remove: async (paths: string[]) => {
        const response = await fetch(`${this.baseUrl}/storage/remove`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ bucket, paths })
        })

        if (!response.ok) {
          throw new Error("Delete failed")
        }

        return { error: null }
      },
      createSignedUrl: async (path: string, expiresIn: number) => {
        const response = await fetch(`${this.baseUrl}/storage/signed-url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ bucket, path, expiresIn })
        })

        if (!response.ok) {
          throw new Error("Failed to create signed URL")
        }

        const result = await response.json()
        return { data: result.signedUrl, error: null }
      }
    })
  }
}

// Create a singleton instance
export const dbClient = new DatabaseClient()
