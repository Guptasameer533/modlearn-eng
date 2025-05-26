"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { LearnerLayout } from "@/components/learner-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, GraduationCap } from "lucide-react"
import { mockEnrolledCourses } from "@/lib/mock-data"

interface EnrolledCourse {
  _id: string
  title: string
  description: string
  progress: number
  lastAccessed: string
}

export default function LearnerDashboardPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setEnrolledCourses(mockEnrolledCourses)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching enrolled courses:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <LearnerLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Learner Dashboard</h1>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                <p className="text-xs text-muted-foreground">
                  {isLoading ? "Loading..." : `${enrolledCourses.length} courses enrolled`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading
                    ? "Loading..."
                    : `${Math.round(
                        enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length,
                      )}%`}
                </div>
                <p className="text-xs text-muted-foreground">Across all courses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "Loading..." : new Date().toLocaleDateString()}</div>
                <p className="text-xs text-muted-foreground">Last login</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading courses...</p>
                ) : enrolledCourses.length > 0 ? (
                  <div className="space-y-6">
                    {enrolledCourses.slice(0, 3).map((course) => (
                      <div key={course._id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{course.title}</h3>
                          <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">
                            Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                          </p>
                          <Link href={`/learner/courses/${course._id}`}>
                            <Button variant="outline" size="sm">
                              Continue
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">You haven&apos;t enrolled in any courses yet.</p>
                    <Link href="/learner/courses">
                      <Button>Browse Courses</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Link href="/learner/courses">
              <Button variant="outline">Browse All Courses</Button>
            </Link>
          </div>
          {isLoading ? (
            <p>Loading courses...</p>
          ) : enrolledCourses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <Card key={course._id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>
                      {course.description.substring(0, 100)}
                      {course.description.length > 100 ? "..." : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </CardContent>
                  <CardFooter>
                    <Link href={`/learner/courses/${course._id}`} className="w-full">
                      <Button className="w-full">Continue Learning</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground mb-4">You haven&apos;t enrolled in any courses yet.</p>
                <Link href="/learner/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Track your learning milestones</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <GraduationCap className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">
                Complete courses to earn achievements and certificates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </LearnerLayout>
  )
}
