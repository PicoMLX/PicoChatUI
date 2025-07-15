import { NextRequest, NextResponse } from "next/server"

// Mock user data - in a real implementation, this would come from your backend
let mockUsers = [
  {
    id: "e9fc7e46-a8a5-4fd4-8ba7-af485013e6fa",
    email: "test@test.com",
    password: "password",
    username: "testuser"
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Generate new user ID
    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create new user
    const newUser = {
      id: userId,
      email,
      password, // In real implementation, this would be hashed
      username: `user${Math.random().toString(36).substr(2, 6)}`
    }

    mockUsers.push(newUser)

    // Create a simple session token
    const sessionToken = Buffer.from(`${newUser.id}:${Date.now()}`).toString(
      "base64"
    )

    // Set session cookie
    const response = NextResponse.json(
      {
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username
        },
        session: {
          access_token: sessionToken,
          refresh_token: sessionToken
        }
      },
      { status: 201 }
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
