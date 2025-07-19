// Mock Supabase client for compatibility during transition to Swift backend
import { dbClient } from "@/lib/db/client"

// Mock auth implementation
const mockAuth = {
  signOut: async () => {
    // Clear any local session data
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    return { error: null }
  },
  getSession: async () => {
    // Check for session cookie
    const sessionCookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("session="))

    if (sessionCookie) {
      // Return mock session data
      return {
        data: {
          session: {
            user: {
              id: "mock-user-id",
              email: "mock@example.com"
            }
          }
        },
        error: null
      }
    }

    return { data: { session: null }, error: null }
  },
  updateUser: async (data: any) => {
    // Mock password update - in real implementation this would call the Swift backend
    console.log("Mock password update:", data)
    return { error: null }
  }
}

// Create a mock table operations object that returns proper Supabase-style responses
const createMockTable = (table: string) => ({
  select: (columns = "*") => {
    const builder = {
      eq: (column: string, value: any) => {
        const eqBuilder = {
          single: () => Promise.resolve({ data: {}, error: null })
        }
        return Object.assign(
          Promise.resolve({ data: [], error: null }),
          eqBuilder
        )
      },
      single: () => Promise.resolve({ data: {}, error: null })
    }
    // Make the select builder itself awaitable
    return Object.assign(Promise.resolve({ data: [], error: null }), builder)
  },
  insert: (data: any) => {
    const builder = {
      select: () => Promise.resolve({ data: [data], error: null })
    }
    // Make the insert builder itself awaitable
    return Object.assign(
      Promise.resolve({ data: [data], error: null }),
      builder
    )
  },
  update: (data: any) => {
    const builder = {
      eq: (column: string, value: any) => {
        const eqBuilder = {
          select: () => Promise.resolve({ data: [data], error: null })
        }
        return Object.assign(
          Promise.resolve({ data: [data], error: null }),
          eqBuilder
        )
      }
    }
    return builder
  },
  delete: () => {
    const builder = {
      eq: (column: string, value: any) => {
        return Promise.resolve({ data: null, error: null })
      }
    }
    return builder
  }
})

// Mock Supabase client that delegates to our database client
export const supabase = {
  auth: mockAuth,
  from: (table: string) => createMockTable(table),
  storage: dbClient.storage
}
