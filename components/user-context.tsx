"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "student" | "instructor" | null
type AuthStatus = "authenticated" | "unauthenticated" | "loading"

interface UserContextType {
  role: UserRole
  isAuthenticated: boolean
  authStatus: AuthStatus
  login: (role: UserRole) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null)
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading")

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      // Check if user is authenticated on client side
      const storedRole = localStorage.getItem("userRole") as UserRole
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

      if (isAuthenticated && storedRole) {
        setRole(storedRole)
        setAuthStatus("authenticated")
      } else {
        setRole(null)
        setAuthStatus("unauthenticated")
      }
    }
  }, [])

  useEffect(() => {
    // Listen for storage events (in case localStorage changes in another tab)
    const handleStorageChange = () => {
      const storedRole = localStorage.getItem("userRole") as UserRole
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

      if (isAuthenticated && storedRole) {
        setRole(storedRole)
        setAuthStatus("authenticated")
      } else {
        setRole(null)
        setAuthStatus("unauthenticated")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const login = (newRole: UserRole) => {
    setRole(newRole)
    setAuthStatus("authenticated")
    localStorage.setItem("userRole", newRole || "")
    localStorage.setItem("isAuthenticated", "true")
  }

  const logout = () => {
    setRole(null)
    setAuthStatus("unauthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("isAuthenticated")
  }

  return (
    <UserContext.Provider
      value={{
        role,
        isAuthenticated: authStatus === "authenticated",
        authStatus,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
