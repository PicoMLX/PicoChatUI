import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

export const createClient = async (cookieStore: ReturnType<typeof cookies>) => {
  const resolvedCookieStore = await cookieStore
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return resolvedCookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            resolvedCookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            resolvedCookieStore.set({ name, value: "", ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        }
      }
    }
  )
}
