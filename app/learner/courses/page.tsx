"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { LearnerLayout } from "@/components/learner-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Search } from "lucide-react"
import { mockAvailableCourses } from "@/lib/mock-data"

interface Course {
  _id: string
  title: string
  description: string
  sections: any[]
  createdAt: string
  enrolled?: boolean
}

export default function LearnerCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchCourses = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setCourses(mockAvailableCourses)
        setFilteredCourses(mockAvailableCourses)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(courses)
    } else {
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredCourses(filtered)
    }
  }, [searchQuery, courses])

  return (
    <LearnerLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Available Courses</h1>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        {isLoading ? (
          <p>Loading courses...</p>
        ) : filteredCourses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course._id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    {course.description.substring(0, 100)}
                    {course.description.length > 100 ? "..." : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-sm text-muted-foreground">{course.sections.length} sections</p>
                    <p className="text-sm text-muted-foreground">
                      Added: {new Date(course.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  {course.enrolled ? (
                    <Link href={`/learner/courses/${course._id}`} className="w-full">
                      <Button className="w-full" variant="secondary">
                        Continue Learning
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/learner/courses/${course._id}`} className="w-full">
                      <Button className="w-full">Enroll Now</Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">
                {searchQuery ? "No courses match your search." : "No courses available."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </LearnerLayout>
  )
}
