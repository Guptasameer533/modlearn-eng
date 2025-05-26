"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ChevronRight, Edit, FileText, Layers, PlusCircle, Trash2 } from "lucide-react"
import { CreateSectionDialog } from "@/components/create-section-dialog"
import { CreateUnitDialog } from "@/components/create-unit-dialog"
import { CreateChapterDialog } from "@/components/create-chapter-dialog"
import { mockCourseDetails } from "@/lib/mock-data"

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

export default function AdminCoursePage() {
  const params = useParams<{ courseId: string }>()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateSectionOpen, setIsCreateSectionOpen] = useState(false)
  const [isCreateUnitOpen, setIsCreateUnitOpen] = useState(false)
  const [isCreateChapterOpen, setIsCreateChapterOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)

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
        } else {
          // If course not found, redirect to courses page
          router.push("/admin/courses")
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

  const handleCreateUnit = (sectionId: string) => {
    setSelectedSection(sectionId)
    setIsCreateUnitOpen(true)
  }

  const handleCreateChapter = (sectionId: string, unitId: string) => {
    setSelectedSection(sectionId)
    setSelectedUnit(unitId)
    setIsCreateChapterOpen(true)
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading course...</p>
        </div>
      </AdminLayout>
    )
  }

  if (!course) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <p>Course not found</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push(`/admin/courses/${course._id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Course
            </Button>
            <Button onClick={() => setIsCreateSectionOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </div>
        </div>

        <Tabs defaultValue="structure" className="space-y-4">
          <TabsList>
            <TabsTrigger value="structure">Course Structure</TabsTrigger>
            <TabsTrigger value="settings">Course Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="structure" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>Manage sections, units, and chapters</CardDescription>
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
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-muted-foreground">{section.description}</p>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => handleCreateUnit(section._id)}
                              >
                                <PlusCircle className="h-4 w-4 mr-1" />
                                Add Unit
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>

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
                                        <div className="flex justify-between items-center mb-2">
                                          <p className="text-sm text-muted-foreground">{unit.description}</p>
                                          <div className="flex gap-2">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-8 px-2"
                                              onClick={() => handleCreateChapter(section._id, unit._id)}
                                            >
                                              <PlusCircle className="h-4 w-4 mr-1" />
                                              Add Chapter
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 px-2">
                                              <Edit className="h-4 w-4 mr-1" />
                                              Edit
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive">
                                              <Trash2 className="h-4 w-4 mr-1" />
                                              Delete
                                            </Button>
                                          </div>
                                        </div>

                                        {unit.chapters.length > 0 ? (
                                          <div className="space-y-2 pl-4">
                                            {unit.chapters.map((chapter) => (
                                              <div key={chapter._id} className="border rounded-md p-3">
                                                <div className="flex justify-between items-center">
                                                  <div className="flex items-center">
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    <span>{chapter.title}</span>
                                                  </div>
                                                  <div className="flex gap-2">
                                                    <Link
                                                      href={`/admin/courses/${course._id}/sections/${section._id}/units/${unit._id}/chapters/${chapter._id}`}
                                                    >
                                                      <Button variant="ghost" size="sm" className="h-8 px-2">
                                                        <ChevronRight className="h-4 w-4" />
                                                        Manage
                                                      </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="sm" className="h-8 px-2">
                                                      <Edit className="h-4 w-4 mr-1" />
                                                      Edit
                                                    </Button>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-8 px-2 text-destructive"
                                                    >
                                                      <Trash2 className="h-4 w-4 mr-1" />
                                                      Delete
                                                    </Button>
                                                  </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                  {chapter.description}
                                                </p>
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
                                            No chapters in this unit. Add your first chapter.
                                          </p>
                                        )}
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">
                              No units in this section. Add your first unit.
                            </p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Layers className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">This course has no sections yet.</p>
                    <Button onClick={() => setIsCreateSectionOpen(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add First Section
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
                <CardDescription>Manage course details and configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Course Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Title</p>
                        <p className="text-sm text-muted-foreground">{course.title}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Created</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(course.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Course Structure</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Sections</p>
                        <p className="text-sm text-muted-foreground">{course.sections.length}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Units</p>
                        <p className="text-sm text-muted-foreground">
                          {course.sections.reduce((acc, section) => acc + section.units.length, 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Chapters</p>
                        <p className="text-sm text-muted-foreground">
                          {course.sections.reduce(
                            (acc, section) =>
                              acc + section.units.reduce((unitAcc, unit) => unitAcc + unit.chapters.length, 0),
                            0,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CreateSectionDialog open={isCreateSectionOpen} onOpenChange={setIsCreateSectionOpen} courseId={course._id} />

      <CreateUnitDialog
        open={isCreateUnitOpen}
        onOpenChange={setIsCreateUnitOpen}
        courseId={course._id}
        sectionId={selectedSection || ""}
      />

      <CreateChapterDialog
        open={isCreateChapterOpen}
        onOpenChange={setIsCreateChapterOpen}
        courseId={course._id}
        sectionId={selectedSection || ""}
        unitId={selectedUnit || ""}
      />
    </AdminLayout>
  )
}
