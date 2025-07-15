// Authentication client to replace Supabase
export class AuthClient {
  private baseUrl: string

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
  }

  async signInWithPassword({
    email,
    password
  }: {
    email: string
    password: string
  }) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Login failed")
    }

    return response.json()
  }

  async signUp({ email, password }: { email: string; password: string }) {
    const response = await fetch(`${this.baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Signup failed")
    }

    return response.json()
  }

  async signOut() {
    const response = await fetch(`${this.baseUrl}/auth/logout`, {
      method: "POST"
    })

    if (!response.ok) {
      throw new Error("Logout failed")
    }

    return response.json()
  }

  async getSession() {
    const response = await fetch(`${this.baseUrl}/auth/session`, {
      method: "GET"
    })

    if (!response.ok) {
      throw new Error("Failed to get session")
    }

    return response.json()
  }

  async getUser() {
    const { data } = await this.getSession()
    return { data: { user: data.session?.user || null } }
  }
}

// Create a singleton instance
export const authClient = new AuthClient()
