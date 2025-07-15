import { NextRequest, NextResponse } from "next/server"

// Mock user data - in a real implementation, this would come from your backend
const mockUsers = [
  {
    id: "e9fc7e46-a8a5-4fd4-8ba7-af485013e6fa",
    email: "test@test.com",
    password: "password",
    username: "testuser"
  }
]

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session")?.value

    if (!sessionToken) {
      return NextResponse.json({ session: null }, { status: 200 })
    }

    // Decode session token to get user ID
    try {
      const decoded = Buffer.from(sessionToken, "base64").toString("utf-8")
      const [userId] = decoded.split(":")

      // Find user by ID
      const user = mockUsers.find(u => u.id === userId)

      if (!user) {
        return NextResponse.json({ session: null }, { status: 200 })
      }

      return NextResponse.json(
        {
          session: {
            user: {
              id: user.id,
              email: user.email,
              username: user.username
            },
            access_token: sessionToken,
            refresh_token: sessionToken
          }
        },
        { status: 200 }
      )
    } catch (error) {
      return NextResponse.json({ session: null }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
