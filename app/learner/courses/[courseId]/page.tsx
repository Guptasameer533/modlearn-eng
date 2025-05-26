"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { LearnerLayout } from "@/components/learner-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight, FileText, Layers, Lock } from "lucide-react"
import { mockCourseDetails, mockUserProgress } from "@/lib/mock-data"
import { useToast } from "@/components/ui/use-toast"

interface Question {
  _id: string
  type: string
  text: string
}

interface Chapter {
  _id: string
  title: string
  description: string
  content: string
  questions: Question[]
}

interface Unit {
  _id: string
  title: string
  description: string
  chapters: Chapter[]
}

interface Section {
  _id: string
  title: string
  description: string
  units: Unit[]
}

interface Course {
  _id: string
  title: string
  description: string
  sections: Section[]
  createdAt: string
}

interface UserProgress {
  completedChapters: string[]
  lastAccessedSection: string
  lastAccessedUnit: string
  lastAccessedChapter: string
}

export default function LearnerCoursePage() {
  const params = useParams<{ courseId: string }>()
  const router = useRouter()
  const { toast } = useToast()
  const [course, setCourse] = useState<Course | null>(null)
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchCourse = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Find the course in our mock data
        const foundCourse = mockCourseDetails.find((c) => c._id === params.courseId)

        if (foundCourse) {
          setCourse(foundCourse)

          // Check if user is enrolled
          const userProgress = mockUserProgress.find((p) => p.courseId === params.courseId)
          if (userProgress) {
            setIsEnrolled(true)
            setProgress({
              completedChapters: userProgress.completedChapters,
              lastAccessedSection: userProgress.lastAccessedSection,
              lastAccessedUnit: userProgress.lastAccessedUnit,
              lastAccessedChapter: userProgress.lastAccessedChapter,
            })
          }
        } else {
          // If course not found, redirect to courses page
          router.push("/learner/courses")
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching course:", error)
        setIsLoading(false)
      }
    }

    if (params.courseId) {
      fetchCourse()
    }
  }, [params.courseId, router])

  const handleEnroll = async () => {
    setEnrolling(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set enrolled status
      setIsEnrolled(true)

      // Create initial progress
      if (course && course.sections.length > 0) {
        const firstSection = course.sections[0]
        const firstUnit = firstSection.units[0] || { _id: "" }
        const firstChapter = firstUnit.chapters[0] || { _id: "" }

        setProgress({
          completedChapters: [],
          lastAccessedSection: firstSection._id,
          lastAccessedUnit: firstUnit._id,
          lastAccessedChapter: firstChapter._id,
        })
      }

      toast({
        title: "Enrolled successfully",
        description: "You have been enrolled in this course.",
      })
    } catch (error) {
      toast({
        title: "Enrollment failed",
        description: "There was a problem enrolling in this course.",
        variant: "destructive",
      })
    } finally {
      setEnrolling(false)
    }
  }

  const calculateProgress = () => {
    if (!course || !progress) return 0

    let totalChapters = 0
    course.sections.forEach((section) => {
      section.units.forEach((unit) => {
        totalChapters += unit.chapters.length
      })
    })

    if (totalChapters === 0) return 0
    return Math.round((progress.completedChapters.length / totalChapters) * 100)
  }

  const isChapterCompleted = (chapterId: string) => {
    return progress?.completedChapters.includes(chapterId) || false
  }

  if (isLoading) {
    return (
      <LearnerLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading course...</p>
        </div>
      </LearnerLayout>
    )
  }

  if (!course) {
    return (
      <LearnerLayout>
        <div className="flex items-center justify-center h-full">
          <p>Course not found</p>
        </div>
      </LearnerLayout>
    )
  }

  return (
    <LearnerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/learner/courses")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
          {!isEnrolled && (
            <Button onClick={handleEnroll} disabled={enrolling}>
              {enrolling ? "Enrolling..." : "Enroll in Course"}
            </Button>
          )}
        </div>

        {isEnrolled && progress && (
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Course Completion</span>
                  <span className="text-sm font-medium">{calculateProgress()}%</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
                {progress.lastAccessedChapter && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Continue where you left off:</p>
                    <Link
                      href={`/learner/courses/${course._id}/sections/${progress.lastAccessedSection}/units/${progress.lastAccessedUnit}/chapters/${progress.lastAccessedChapter}`}
                    >
                      <Button variant="outline" className="mt-2">
                        <ChevronRight className="mr-2 h-4 w-4" />
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>Browse through sections, units, and chapters</CardDescription>
          </CardHeader>
          <CardContent>
            {course.sections.length > 0 ? (
              <Accordion type="multiple" className="w-full">
                {course.sections.map((section) => (
                  <AccordionItem key={section._id} value={section._id}>
                    <AccordionTrigger className="hover:bg-muted/50 px-4 py-2 rounded-md">
                      <div className="flex items-center">
                        <Layers className="mr-2 h-4 w-4" />
                        <span>{section.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6">
                      <p className="text-sm text-muted-foreground mb-2">{section.description}</p>

                      {section.units.length > 0 ? (
                        <div className="space-y-2">
                          {section.units.map((unit) => (
                            <div key={unit._id} className="border rounded-md">
                              <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value={unit._id}>
                                  <AccordionTrigger className="hover:bg-muted/50 px-4 py-2">
                                    <div className="flex items-center">
                                      <BookOpen className="mr-2 h-4 w-4" />
                                      <span>{unit.title}</span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pl-6">
                                    <p className="text-sm text-muted-foreground mb-2">{unit.description}</p>

                                    {unit.chapters.length > 0 ? (
                                      <div className="space-y-2 pl-4">
                                        {unit.chapters.map((chapter) => (
                                          <div key={chapter._id} className="border rounded-md p-3">
                                            <div className="flex justify-between items-center">
                                              <div className="flex items-center">
                                                <FileText className="mr-2 h-4 w-4" />
                                                <span>{chapter.title}</span>
                                                {isChapterCompleted(chapter._id) && (
                                                  <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                                                )}
                                              </div>
                                              <div>
                                                {isEnrolled ? (
                                                  <Link
                                                    href={`/learner/courses/${course._id}/sections/${section._id}/units/${unit._id}/chapters/${chapter._id}`}
                                                  >
                                                    <Button variant="ghost" size="sm">
                                                      <ChevronRight className="h-4 w-4" />
                                                      Start
                                                    </Button>
                                                  </Link>
                                                ) : (
                                                  <Button variant="ghost" size="sm" disabled>
                                                    <Lock className="mr-2 h-4 w-4" />
                                                    Locked
                                                  </Button>
                                                )}
                                              </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">{chapter.description}</p>
                                            <div className="mt-2">
                                              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                                {chapter.questions.length} questions
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground italic pl-4">
                                        No chapters in this unit.
                                      </p>
                                    )}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No units in this section.</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Layers className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">This course has no content yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </LearnerLayout>
  )
}
