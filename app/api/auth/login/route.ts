import { NextRequest, NextResponse } from "next/server"

// Mock user data - in a real implementation, this would come from your backend
const mockUsers = [
  {
    id: "e9fc7e46-a8a5-4fd4-8ba7-af485013e6fa",
    email: "test@test.com",
    password: "password", // In real implementation, this would be hashed
    username: "testuser"
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user by email
    const user = mockUsers.find(u => u.email === email)

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Create a simple session token (in real implementation, use JWT)
    const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString(
      "base64"
    )

    // Set session cookie
    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          username: user.username
        },
        session: {
          access_token: sessionToken,
          refresh_token: sessionToken
        }
      },
      { status: 200 }
    )

    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
