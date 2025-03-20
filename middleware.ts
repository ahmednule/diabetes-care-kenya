import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-at-least-32-characters-long")

const userProtectedRoutes = ["/dashboard", "/readings", "/appointments", "/profile", "/health-companion"]
const adminProtectedRoutes = ["/admin"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isUserProtectedRoute = userProtectedRoutes.some((route) => pathname.startsWith(route))
  const isAdminProtectedRoute = adminProtectedRoutes.some((route) => pathname.startsWith(route))

  if (!isUserProtectedRoute && !isAdminProtectedRoute) {
    return NextResponse.next()
  }

  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    if (isAdminProtectedRoute && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (pathname === "/dashboard" && payload.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }
}

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

