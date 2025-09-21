"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, User, FlaskConical, Truck, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

const MOCK_CREDENTIALS = {
  "farmer@demo": { password: "123", role: "farmer" as const, name: "Prakash Kumar", redirectPath: "/dashboard/farmer" },
  "lab@demo": { password: "123", role: "lab" as const, name: "Dr. Sharma", redirectPath: "/dashboard/lab" },
  "logistics@demo": {
    password: "123",
    role: "logistics" as const,
    name: "Ravi Transport",
    redirectPath: "/dashboard/logistics",
  },
}

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const credentials = MOCK_CREDENTIALS[email as keyof typeof MOCK_CREDENTIALS]

    if (!credentials || credentials.password !== password) {
      setError("Invalid email or password")
      setIsLoading(false)
      return
    }

    login(credentials.role, credentials.name)
    router.push(credentials.redirectPath)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AyuTrace Portal Login</h1>
          <p className="mt-2 text-gray-600">Enter your credentials to access your dashboard</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Demo Credentials:</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>
                  <strong>Farmer:</strong> farmer@demo / 123
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FlaskConical className="h-4 w-4" />
                <span>
                  <strong>Lab Analyst:</strong> lab@demo / 123
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4" />
                <span>
                  <strong>Logistics:</strong> logistics@demo / 123
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
