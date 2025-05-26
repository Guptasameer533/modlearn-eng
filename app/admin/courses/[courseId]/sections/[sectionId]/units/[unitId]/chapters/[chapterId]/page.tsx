"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Editor } from "@/components/editor"
import { QuestionEditor } from "@/components/question-editor"
import { ArrowLeft, Edit, PlusCircle, Save } from "lucide-react"
import { mockChapterDetails } from "@/lib/mock-data"
import { useToast } from "@/components/ui/use-toast"

interface Question {
  _id: string
  type: string
  text: string
  options?: { text: string; isCorrect: boolean }[]
  correctAnswer?: string
}

interface Chapter {
  _id: string
  title: string
  description: string
  content: string
  questions: Question[]
}

export default function AdminChapterPage() {
  const params = useParams<{
    courseId: string
    sectionId: string
    unitId: string
    chapterId: string
  }>()
  const router = useRouter()
  const { toast } = useToast()
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchChapter = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Find the chapter in our mock data
        const foundChapter = mockChapterDetails.find((c) => c._id === params.chapterId)

        if (foundChapter) {
          setChapter(foundChapter)
          setContent(foundChapter.content)
        } else {
          // If chapter not found, redirect back
          router.back()
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching chapter:", error)
        setIsLoading(false)
      }
    }

    if (params.chapterId) {
      fetchChapter()
    }
  }, [params.chapterId, router])

  const handleSaveContent = async () => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      if (chapter) {
        setChapter({
          ...chapter,
          content,
        })
      }

      toast({
        title: "Content saved",
        description: "Chapter content has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error saving content",
        description: "There was a problem saving the chapter content.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddQuestion = () => {
    if (!chapter) return

    // Create a new question
    const newQuestion: Question = {
      _id: `question-${Date.now()}`,
      type: "mcq",
      text: "New question",
      options: [
        { text: "Option 1", isCorrect: true },
        { text: "Option 2", isCorrect: false },
      ],
    }

    // Update local state
    setChapter({
      ...chapter,
      questions: [...chapter.questions, newQuestion],
    })

    toast({
      title: "Question added",
      description: "A new question has been added to this chapter.",
    })
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading chapter...</p>
        </div>
      </AdminLayout>
    )
  }

  if (!chapter) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <p>Chapter not found</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{chapter.title}</h1>
            <p className="text-muted-foreground">{chapter.description}</p>
          </div>
        </div>

        <Tabs defaultValue="content" className="space-y-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Chapter Content</CardTitle>
                  <CardDescription>Edit the content for this chapter</CardDescription>
                </div>
                <Button onClick={handleSaveContent} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardHeader>
              <CardContent>
                <Editor value={content} onChange={setContent} placeholder="Enter chapter content here..." />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Chapter Questions</CardTitle>
                  <CardDescription>Manage questions for this chapter</CardDescription>
                </div>
                <Button onClick={handleAddQuestion}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </CardHeader>
              <CardContent>
                {chapter.questions.length > 0 ? (
                  <div className="space-y-6">
                    {chapter.questions.map((question, index) => (
                      <QuestionEditor
                        key={question._id}
                        question={question}
                        index={index}
                        onUpdate={(updatedQuestion) => {
                          const updatedQuestions = [...chapter.questions]
                          updatedQuestions[index] = updatedQuestion
                          setChapter({
                            ...chapter,
                            questions: updatedQuestions,
                          })
                        }}
                        onDelete={() => {
                          const updatedQuestions = chapter.questions.filter((q) => q._id !== question._id)
                          setChapter({
                            ...chapter,
                            questions: updatedQuestions,
                          })
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-muted-foreground mb-4">No questions added to this chapter yet.</p>
                    <Button onClick={handleAddQuestion}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add First Question
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chapter Settings</CardTitle>
                <CardDescription>Manage chapter details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Chapter Details
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Title</p>
                      <p className="text-sm text-muted-foreground">{chapter.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Questions</p>
                      <p className="text-sm text-muted-foreground">{chapter.questions.length}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
