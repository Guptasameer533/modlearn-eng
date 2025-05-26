"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { LearnerLayout } from "@/components/learner-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { QuestionRenderer } from "@/components/question-renderer"
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

export default function LearnerChapterPage() {
  const params = useParams<{
    courseId: string
    sectionId: string
    unitId: string
    chapterId: string
  }>()
  const router = useRouter()
  const { toast } = useToast()
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showQuestions, setShowQuestions] = useState(false)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [score, setScore] = useState<{ score: number; total: number } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

          // Initialize answers object
          const initialAnswers: Record<string, any> = {}
          foundChapter.questions.forEach((question) => {
            initialAnswers[question._id] = question.type === "mcq" ? "" : ""
          })
          setAnswers(initialAnswers)
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

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmitAnswers = async () => {
    if (!chapter) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Calculate score (in a real app, this would be done on the server)
      let correctAnswers = 0

      chapter.questions.forEach((question) => {
        const userAnswer = answers[question._id]

        if (question.type === "mcq") {
          const correctOption = question.options?.find((opt) => opt.isCorrect)
          if (correctOption && userAnswer === correctOption.text) {
            correctAnswers++
          }
        } else if (question.type === "fillInBlank" || question.type === "text") {
          if (userAnswer.toLowerCase() === question.correctAnswer?.toLowerCase()) {
            correctAnswers++
          }
        }
      })

      setScore({
        score: correctAnswers,
        total: chapter.questions.length,
      })

      toast({
        title: "Answers submitted",
        description: `You scored ${correctAnswers} out of ${chapter.questions.length}.`,
      })
    } catch (error) {
      toast({
        title: "Error submitting answers",
        description: "There was a problem submitting your answers.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContinue = () => {
    // In a real app, you would navigate to the next chapter
    // For now, just go back to the course page
    router.push(`/learner/courses/${params.courseId}`)
  }

  if (isLoading) {
    return (
      <LearnerLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading chapter...</p>
        </div>
      </LearnerLayout>
    )
  }

  if (!chapter) {
    return (
      <LearnerLayout>
        <div className="flex items-center justify-center h-full">
          <p>Chapter not found</p>
        </div>
      </LearnerLayout>
    )
  }

  return (
    <LearnerLayout>
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

        {!showQuestions ? (
          <Card>
            <CardHeader>
              <CardTitle>Chapter Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: chapter.content }} />
            </CardContent>
            <CardFooter className="flex justify-end">
              {chapter.questions.length > 0 ? (
                <Button onClick={() => setShowQuestions(true)}>
                  Continue to Questions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleContinue}>
                  Complete Chapter
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : score ? (
          <Card>
            <CardHeader>
              <CardTitle>Chapter Complete!</CardTitle>
              <CardDescription>You've completed this chapter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Great job!</h2>
                <p className="text-muted-foreground mb-4">
                  You scored {score.score} out of {score.total} questions.
                </p>
                <div className="text-4xl font-bold">{Math.round((score.score / score.total) * 100)}%</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleContinue}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Chapter Questions</CardTitle>
              <CardDescription>Answer the following questions to complete this chapter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {chapter.questions.map((question, index) => (
                  <div key={question._id} className="space-y-4">
                    {index > 0 && <Separator />}
                    <div className="pt-4">
                      <QuestionRenderer
                        question={question}
                        index={index}
                        value={answers[question._id]}
                        onChange={(value) => handleAnswerChange(question._id, value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowQuestions(false)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Content
              </Button>
              <Button onClick={handleSubmitAnswers} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Answers"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </LearnerLayout>
  )
}
