"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Save, Trash2, X, Plus } from "lucide-react"

interface QuestionOption {
  text: string
  isCorrect: boolean
}

interface Question {
  _id: string
  type: string
  text: string
  options?: QuestionOption[]
  correctAnswer?: string
}

interface QuestionEditorProps {
  question: Question
  index: number
  onUpdate: (question: Question) => void
  onDelete: () => void
}

export function QuestionEditor({ question, index, onUpdate, onDelete }: QuestionEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [questionText, setQuestionText] = useState(question.text)
  const [questionType, setQuestionType] = useState(question.type)
  const [options, setOptions] = useState<QuestionOption[]>(question.options || [])
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer || "")

  const handleSave = () => {
    const updatedQuestion: Question = {
      ...question,
      text: questionText,
      type: questionType,
      ...(questionType === "mcq" ? { options } : { correctAnswer }),
    }
    onUpdate(updatedQuestion)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setQuestionText(question.text)
    setQuestionType(question.type)
    setOptions(question.options || [])
    setCorrectAnswer(question.correctAnswer || "")
    setIsEditing(false)
  }

  const addOption = () => {
    setOptions([...options, { text: "", isCorrect: false }])
  }

  const updateOption = (index: number, field: keyof QuestionOption, value: string | boolean) => {
    const newOptions = [...options]
    newOptions[index] = { ...newOptions[index], [field]: value }
    setOptions(newOptions)
  }

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  if (!isEditing) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Question {index + 1}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete} className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-medium">{question.text}</p>
            <p className="text-sm text-muted-foreground">Type: {question.type}</p>
            {question.type === "mcq" && question.options && (
              <div className="space-y-1">
                {question.options.map((option, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`text-sm ${option.isCorrect ? "font-medium text-green-600" : ""}`}>
                      {option.text} {option.isCorrect && "✓"}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {(question.type === "fillInBlank" || question.type === "text") && (
              <p className="text-sm">
                <strong>Correct Answer:</strong> {question.correctAnswer}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Edit Question {index + 1}</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question-text">Question Text</Label>
          <Textarea
            id="question-text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter your question..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="question-type">Question Type</Label>
          <Select value={questionType} onValueChange={setQuestionType}>
            <SelectTrigger>
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mcq">Multiple Choice</SelectItem>
              <SelectItem value="fillInBlank">Fill in the Blank</SelectItem>
              <SelectItem value="text">Text Answer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {questionType === "mcq" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Options</Label>
              <Button variant="outline" size="sm" onClick={addOption}>
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </Button>
            </div>
            <div className="space-y-2">
              {options.map((option, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={option.text}
                    onChange={(e) => updateOption(i, "text", e.target.value)}
                    placeholder={`Option ${i + 1}`}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={option.isCorrect}
                      onCheckedChange={(checked) => updateOption(i, "isCorrect", checked as boolean)}
                    />
                    <Label className="text-sm">Correct</Label>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeOption(i)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {(questionType === "fillInBlank" || questionType === "text") && (
          <div className="space-y-2">
            <Label htmlFor="correct-answer">Correct Answer</Label>
            <Input
              id="correct-answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Enter the correct answer..."
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
