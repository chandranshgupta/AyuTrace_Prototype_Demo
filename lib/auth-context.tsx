"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type UserRole = "farmer" | "lab" | "logistics" | null

interface User {
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (role: UserRole, name: string) => void
  logout: () => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (role: UserRole, name: string) => {
    setUser({ name, role })
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
