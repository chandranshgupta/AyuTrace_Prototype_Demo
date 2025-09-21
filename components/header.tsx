"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, X, LogOut, ToggleLeft, ToggleRight } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"consumer" | "dashboard">("consumer")
  const { user, logout, isLoggedIn } = useAuth()

  const handleLogout = () => {
    logout()
    setViewMode("consumer")
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "consumer" ? "dashboard" : "consumer")
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AyuTrace</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#home"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
            <a
              href="#scan"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Scan QR
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-4">
                {user.role === "farmer" && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Consumer View</span>
                    <Button variant="ghost" size="sm" onClick={toggleViewMode} className="p-1">
                      {viewMode === "consumer" ? (
                        <ToggleLeft className="h-5 w-5" />
                      ) : (
                        <ToggleRight className="h-5 w-5 text-primary" />
                      )}
                    </Button>
                    <span className="text-sm text-muted-foreground">Farmer Dashboard</span>
                  </div>
                )}
                <span className="text-sm font-medium">Welcome, {user.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" className="bg-transparent">
                  For Farmers
                </Button>
                <Button size="sm">Get Started</Button>
                <Link href="/login">
                  <Button variant="default" size="sm">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <a
                href="#home"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#scan"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Scan QR
              </a>
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                {isLoggedIn && user ? (
                  <>
                    {user.role === "farmer" && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">View Mode:</span>
                        <Button variant="ghost" size="sm" onClick={toggleViewMode} className="flex items-center gap-2">
                          {viewMode === "consumer" ? "Consumer" : "Dashboard"}
                          {viewMode === "consumer" ? (
                            <ToggleLeft className="h-4 w-4" />
                          ) : (
                            <ToggleRight className="h-4 w-4 text-primary" />
                          )}
                        </Button>
                      </div>
                    )}
                    <div className="text-sm font-medium">Welcome, {user.name}</div>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      For Farmers
                    </Button>
                    <Button size="sm">Get Started</Button>
                    <Link href="/login">
                      <Button variant="default" size="sm" className="w-full">
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
