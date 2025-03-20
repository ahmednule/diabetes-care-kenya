"use server"
import { jwtVerify, SignJWT } from "jose"
import { compare, hash } from "bcryptjs"
import { cookies } from "next/headers"
import prisma from "./prisma"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-at-least-32-characters-long")

const EXPIRES_IN = "24h"

export type User = {
  id: string
  name: string
  email: string
  role: "USER" | "ADMIN"
  diabetesType?: string
}

export async function login(email: string, password: string): Promise<{ success: boolean; user?: User }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { success: false }
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return { success: false }
    }

    const token = await createToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      diabetesType: user.diabetesType,
    })

    ;(await cookies()).set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        diabetesType: user.diabetesType || undefined,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false }
  }
}


export async function signup(userData: any): Promise<{ success: boolean; user?: User }> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    if (existingUser) {
      return { success: false }
    }

    const hashedPassword = await hash(userData.password, 10)

    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        diabetesType: userData.diabetesType,
        role: userData.email.includes("admin") ? "ADMIN" : "USER", 
      },
    })

    const token = await createToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      diabetesType: newUser.diabetesType,
    })

    ;(await
      cookies()).set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
    })

    return {
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        diabetesType: newUser.diabetesType || undefined,
      },
    }
  } catch (error) {
    console.error("Signup error:", error)
    return { success: false }
  }
}


export async function logout (): Promise<void> {
  (await cookies()).delete("auth-token")
}


export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await verifyToken(token)
    return verified.payload as User
  } catch (error) {
    console.error("Error verifying token:", error)
    ;(await cookies()).delete("auth-token")
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}


export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === "ADMIN"
}

export async function updateProfile(profileData: any): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return false
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: profileData.name,
        diabetesType: profileData.diabetesType,
        phone: profileData.phone,
        address: profileData.address,
        city: profileData.city,
        diagnosisDate: profileData.diagnosisDate ? new Date(profileData.diagnosisDate) : undefined,
        medications: profileData.medications,
        allergies: profileData.allergies,
        emergencyContact: profileData.emergencyContact,
        emergencyPhone: profileData.emergencyPhone,
      },
    })

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    })

    if (!updatedUser) {
      return false
    }

    const token = await createToken({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      diabetesType: updatedUser.diabetesType,
    })

    ;(await cookies()).set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
    })

    return true
  } catch (error) {
    console.error("Update profile error:", error)
    return false
  }
}

async function createToken(payload: any): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(JWT_SECRET)
}

async function verifyToken(token: string) {
  return jwtVerify(token, JWT_SECRET)
}

