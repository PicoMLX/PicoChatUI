import { i18nRouter } from "next-i18n-router"
import { NextResponse, type NextRequest } from "next/server"
import i18nConfig from "./i18nConfig"

export async function middleware(request: NextRequest) {
  const i18nResult = i18nRouter(request, i18nConfig)
  if (i18nResult) return i18nResult

  try {
    // Check for session cookie
    const sessionToken = request.cookies.get('session')?.value

    if (sessionToken && request.nextUrl.pathname === "/") {
      // For now, redirect to a default workspace
      // In a real implementation, you'd verify the session and get the user's home workspace
      return NextResponse.redirect(
        new URL(`/workspace-1/chat`, request.url)
      )
    }

    return NextResponse.next({
      request: {
        headers: request.headers
      }
    })
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers
      }
    })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)"
  ]
}
