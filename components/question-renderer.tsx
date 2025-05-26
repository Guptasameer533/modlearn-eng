"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

interface QuestionRendererProps {
  question: Question
  index: number
  value: any
  onChange: (value: any) => void
}

export function QuestionRenderer({ question, index, value, onChange }: QuestionRendererProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Question {index + 1}</h3>
        <p className="text-muted-foreground mt-1">{question.text}</p>
      </div>

      {question.type === "mcq" && question.options && (
        <RadioGroup value={value} onValueChange={onChange}>
          <div className="space-y-2">
            {question.options.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={option.text} id={`${question._id}-${i}`} />
                <Label htmlFor={`${question._id}-${i}`} className="cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      )}

      {question.type === "fillInBlank" && (
        <div className="space-y-2">
          <Label htmlFor={`answer-${question._id}`}>Your Answer</Label>
          <Input
            id={`answer-${question._id}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your answer..."
          />
        </div>
      )}

      {question.type === "text" && (
        <div className="space-y-2">
          <Label htmlFor={`answer-${question._id}`}>Your Answer</Label>
          <Textarea
            id={`answer-${question._id}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your answer..."
            className="min-h-[100px]"
          />
        </div>
      )}
    </div>
  )
}
