import { Brand } from "@/components/ui/brand"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/ui/submit-button"
import { authClient } from "@/lib/auth/client"
import { get } from "@vercel/edge-config"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Login"
}

export default async function Login({
  searchParams
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams

  const signIn = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { data, error } = await authClient.signInWithPassword({
        email,
        password
      })

      if (error) {
        return redirect(`/login?message=${error.message}`)
      }

      // For now, redirect to a default workspace
      // In a real implementation, you'd get the user's home workspace
      return redirect(`/workspace-1/chat`)
    } catch (error: any) {
      return redirect(`/login?message=${error.message}`)
    }
  }

  const getEnvVarOrEdgeConfigValue = async (name: string) => {
    "use server"
    if (process.env.EDGE_CONFIG) {
      return await get<string>(name)
    }

    return process.env[name]
  }

  const signUp = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const emailDomainWhitelistPatternsString = await getEnvVarOrEdgeConfigValue(
      "EMAIL_DOMAIN_WHITELIST"
    )
    const emailDomainWhitelist = emailDomainWhitelistPatternsString?.trim()
      ? emailDomainWhitelistPatternsString?.split(",")
      : []
    const emailWhitelistPatternsString =
      await getEnvVarOrEdgeConfigValue("EMAIL_WHITELIST")
    const emailWhitelist = emailWhitelistPatternsString?.trim()
      ? emailWhitelistPatternsString?.split(",")
      : []

    // If there are whitelist patterns, check if the email is allowed to sign up
    if (emailDomainWhitelist.length > 0 || emailWhitelist.length > 0) {
      const domainMatch = emailDomainWhitelist?.includes(email.split("@")[1])
      const emailMatch = emailWhitelist?.includes(email)
      if (!domainMatch && !emailMatch) {
        return redirect(
          `/login?message=Email ${email} is not allowed to sign up.`
        )
      }
    }

    try {
      const { error } = await authClient.signUp({
        email,
        password
      })

      if (error) {
        console.error(error)
        return redirect(`/login?message=${error.message}`)
      }

      return redirect("/setup")
    } catch (error: any) {
      return redirect(`/login?message=${error.message}`)
    }
  }

  const handleResetPassword = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string

    // For now, just redirect with a message
    // In a real implementation, you'd send a password reset email
    return redirect(
      "/login?message=Password reset functionality not implemented yet"
    )
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
        action={signIn}
      >
        <Brand />

        <Label className="text-md mt-4" htmlFor="email">
          Email
        </Label>
        <Input
          className="mb-3 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />

        <Label className="text-md" htmlFor="password">
          Password
        </Label>
        <Input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
        />

        <SubmitButton className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white">
          Login
        </SubmitButton>

        <SubmitButton
          formAction={signUp}
          className="border-foreground/20 mb-2 rounded-md border px-4 py-2"
        >
          Sign Up
        </SubmitButton>

        <SubmitButton
          formAction={handleResetPassword}
          className="border-foreground/20 mb-2 rounded-md border px-4 py-2"
        >
          Reset Password
        </SubmitButton>

        {message && (
          <p className="mt-4 p-4 text-center text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  )
}
