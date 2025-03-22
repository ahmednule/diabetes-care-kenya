"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { getCurrentUser, isAuthenticated, logout, type User } from "@/lib/auth"

type AuthContextType = {
  user: User | null
  loading: boolean
  authenticated: boolean
  isAdmin: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authenticated: false,
  isAdmin: false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await isAuthenticated()
        setAuthenticated(auth)

        if (auth) {
          const currentUser = await getCurrentUser()
          setUser(currentUser)
          setIsAdmin(currentUser?.role === "ADMIN")
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    setAuthenticated(false)
    setIsAdmin(false)
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated,
        isAdmin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

