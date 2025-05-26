"use client"

import { useEffect, useState } from "react"
import { LearnerLayout } from "@/components/learner-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockEnrolledCourses } from "@/lib/mock-data"

export default function LearnerProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Load enrolled courses
    setEnrolledCourses(mockEnrolledCourses)
  }, [])

  if (!user) {
    return (
      <LearnerLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading profile...</p>
        </div>
      </LearnerLayout>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const averageProgress =
    enrolledCourses.length > 0
      ? Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)
      : 0

  return (
    <LearnerLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account and view your learning progress</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <Button>Update Profile</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Statistics</CardTitle>
              <CardDescription>Your learning progress overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{averageProgress}%</div>
                  <p className="text-sm text-muted-foreground">Average Progress</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Course Progress</h4>
                {enrolledCourses.map((course) => (
                  <div key={course._id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{course.title}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button>Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </LearnerLayout>
  )
}
