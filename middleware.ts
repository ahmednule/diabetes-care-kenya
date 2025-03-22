import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// Secret key for JWT verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-at-least-32-characters-long")

// Protected routes that require authentication
const userProtectedRoutes = ["/dashboard", "/readings", "/appointments", "/profile", "/health-companion"]
const adminProtectedRoutes = ["/admin"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isUserProtectedRoute = userProtectedRoutes.some((route) => pathname.startsWith(route))
  const isAdminProtectedRoute = adminProtectedRoutes.some((route) => pathname.startsWith(route))

  if (!isUserProtectedRoute && !isAdminProtectedRoute) {
    return NextResponse.next()
  }

  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value

  // If no token is found, redirect to login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Check if admin route and user is admin
    if (isAdminProtectedRoute && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // For regular user routes, redirect admins to admin dashboard if they try to access user dashboard
    if (pathname === "/dashboard" && payload.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // If token is invalid, redirect to login
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/readings/:path*",
    "/appointments/:path*",
    "/profile/:path*",
    "/health-companion/:path*",
    "/admin/:path*",
  ],
}

