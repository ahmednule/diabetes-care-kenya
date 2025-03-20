import { jwtVerify, SignJWT } from "jose"

// Secret key for JWT signing and verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-at-least-32-characters-long")

// JWT token expiration (24 hours)
const EXPIRES_IN = "24h"

// User type definition
export type User = {
  id: string
  name: string
  email: string
  diabetesType?: string
}

// Mock user database
const USERS_DB: Record<string, { password: string } & User> = {
  "user@example.com": {
    id: "1",
    name: "John Kamau",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    diabetesType: "type2",
  },
}

/**
 * Authenticate a user with email and password
 */
export async function login(email: string, password: string): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = USERS_DB[email]
  if (!user || user.password !== password) {
    return false
  }

  // Create JWT token
  const token = await createToken({
    id: user.id,
    name: user.name,
    email: user.email,
    diabetesType: user.diabetesType,
  })

  // Store token in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("auth-token", token)
  }

  return true
}

/**
 * Register a new user
 */
export async function signup(userData: any): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  if (USERS_DB[userData.email]) {
    return false
  }

  // In a real app, you would hash the password and store in a database
  const newUser = {
    id: String(Object.keys(USERS_DB).length + 1),
    name: userData.name,
    email: userData.email,
    password: userData.password, // In a real app, this would be hashed
    diabetesType: userData.diabetesType,
  }

  // Add user to mock database
  USERS_DB[userData.email] = newUser

  // Create JWT token
  const token = await createToken({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    diabetesType: newUser.diabetesType,
  })

  // Store token in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("auth-token", token)
  }

  return true
}

/**
 * Log out the current user
 */
export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-token")
  }
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  if (typeof window === "undefined") {
    return null
  }

  const token = localStorage.getItem("auth-token")
  if (!token) {
    return null
  }

  try {
    const verified = await verifyToken(token)
    return verified.payload as User
  } catch (error) {
    console.error("Error verifying token:", error)
    localStorage.removeItem("auth-token")
    return null
  }
}

/**
 * Check if the user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

/**
 * Update user profile
 */
export async function updateProfile(profileData: any): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = await getCurrentUser()
  if (!user) {
    return false
  }

  // In a real app, you would update the user in the database
  const existingUser = USERS_DB[user.email]
  if (!existingUser) {
    return false
  }

  // Update user data
  USERS_DB[user.email] = {
    ...existingUser,
    name: profileData.name,
    diabetesType: profileData.diabetesType,
  }

  // Update token with new user data
  const token = await createToken({
    id: user.id,
    name: profileData.name,
    email: user.email,
    diabetesType: profileData.diabetesType,
  })

  // Store updated token in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("auth-token", token)
  }

  return true
}

/**
 * Create a JWT token
 */
async function createToken(payload: any): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(JWT_SECRET)
}

/**
 * Verify a JWT token
 */
async function verifyToken(token: string) {
  return jwtVerify(token, JWT_SECRET)
}

