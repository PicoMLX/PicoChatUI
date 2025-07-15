"use client"

import { ChangePassword } from "@/components/utility/change-password"
import { authClient } from "@/lib/auth/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await authClient.getSession()
        const session = data.session

        if (!session) {
          router.push("/login")
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error("Session check error:", error)
        router.push("/login")
      }
    })()
  }, [])

  if (loading) {
    return null
  }

  return <ChangePassword />
}
