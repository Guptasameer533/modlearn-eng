"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { GraduationCap } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // For demo purposes, we'll use hardcoded credentials
      // In a real app, this would be an API call

      // Admin credentials
      if (email === "admin@example.com" && password === "Admin123!") {
        // Mock successful login
        const mockUser = {
          _id: "admin-123",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        }

        // Save mock token and user data
        localStorage.setItem("token", "mock-admin-jwt-token")
        localStorage.setItem("user", JSON.stringify(mockUser))

        toast({
          title: "Login successful",
          description: "You have been logged in as an admin.",
        })

        router.push("/admin/dashboard")
        return
      }

      // Learner credentials
      if (email === "learner@example.com" && password === "Learner123!") {
        // Mock successful login
        const mockUser = {
          _id: "learner-123",
          name: "Learner User",
          email: "learner@example.com",
          role: "learner",
        }

        // Save mock token and user data
        localStorage.setItem("token", "mock-learner-jwt-token")
        localStorage.setItem("user", JSON.stringify(mockUser))

        toast({
          title: "Login successful",
          description: "You have been logged in as a learner.",
        })

        router.push("/learner/dashboard")
        return
      }

      // If credentials don't match our test users
      throw new Error("Invalid email or password")
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center">
        <GraduationCap className="h-6 w-6 mr-2" />
        <span className="font-bold">ModLearn</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="rounded-md bg-muted p-4">
              <h3 className="text-sm font-medium mb-2">Test Credentials</h3>
              <div className="text-xs space-y-1">
                <p>
                  <strong>Admin:</strong> admin@example.com / Admin123!
                </p>
                <p>
                  <strong>Learner:</strong> learner@example.com / Learner123!
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
