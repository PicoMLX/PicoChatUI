// Mock Supabase browser client for transition period
export const supabase = {
  auth: {
    signOut: async () => {
      console.log("Mock signOut called")
      return { error: null }
    },
    getSession: async () => {
      console.log("Mock getSession called")
      return { data: { session: null }, error: null }
    }
  }
}
