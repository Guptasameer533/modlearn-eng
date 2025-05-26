"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, PlusCircle, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { mockCourses, mockUsers } from "@/lib/mock-data"

interface Course {
  _id: string
  title: string
  description: string
  sections: any[]
  createdAt: string
}

interface User {
  _id: string
  name: string
  email: string
  role: string
}

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setCourses(mockCourses)
        setUsers(mockUsers)
        setIsLoading(false)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">
                  {isLoading ? "Loading..." : `${courses.length} courses available`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                  {isLoading ? "Loading..." : `${users.length} registered users`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Active</div>
                <p className="text-xs text-muted-foreground">
                  {isLoading ? "Loading..." : "Platform is running smoothly"}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Courses</CardTitle>
                <CardDescription>Recently created courses on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading courses...</p>
                ) : courses.length > 0 ? (
                  <div className="space-y-4">
                    {courses.slice(0, 5).map((course) => (
                      <div key={course._id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {course.description.substring(0, 60)}
                            {course.description.length > 60 ? "..." : ""}
                          </p>
                        </div>
                        <Link href={`/admin/courses/${course._id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No courses available. Create your first course!</p>
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Recently registered users on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading users...</p>
                ) : users.length > 0 ? (
                  <div className="space-y-4">
                    {users.slice(0, 5).map((user) => (
                      <div key={user._id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {user.role}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No users available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">All Courses</h2>
            <Button onClick={() => document.getElementById("create-course-button")?.click()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </div>
          {isLoading ? (
            <p>Loading courses...</p>
          ) : courses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course._id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>
                      {course.description.substring(0, 100)}
                      {course.description.length > 100 ? "..." : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{course.sections.length} sections</p>
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(course.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Link href={`/admin/courses/${course._id}`}>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground mb-4">
                  No courses available. Create your first course!
                </p>
                <Button onClick={() => document.getElementById("create-course-button")?.click()}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Course
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">All Users</h2>
          </div>
          {isLoading ? (
            <p>Loading users...</p>
          ) : users.length > 0 ? (
            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {users.map((user) => (
                  <div key={user._id} className="grid grid-cols-4 gap-4 p-4">
                    <div>{user.name}</div>
                    <div className="text-muted-foreground">{user.email}</div>
                    <div>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {user.role}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Users className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">No users available.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}
