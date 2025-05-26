"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, LinkIcon, Code, ImageIcon } from "lucide-react"

interface EditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function Editor({ value, onChange, placeholder }: EditorProps) {
  const [activeTab, setActiveTab] = useState("edit")
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    setSelectionStart(target.selectionStart)
    setSelectionEnd(target.selectionEnd)
  }

  const insertMarkdown = (markdownBefore: string, markdownAfter = "") => {
    const newValue =
      value.substring(0, selectionStart) +
      markdownBefore +
      value.substring(selectionStart, selectionEnd) +
      markdownAfter +
      value.substring(selectionEnd)
    onChange(newValue)
  }

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <TabsList className="grid w-40 grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          {activeTab === "edit" && (
            <div className="flex items-center space-x-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => insertMarkdown("**", "**")}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => insertMarkdown("*", "*")}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => insertMarkdown("\n- ")}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => insertMarkdown("\n1. ")}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => insertMarkdown("[", "](url)")}
                title="Link"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => insertMarkdown("`", "`")}
                title="Code"
              >
                <Code className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => insertMarkdown("![alt text](", ")")}
                title="Image"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <TabsContent value="edit" className="p-0 border-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onSelect={handleTextareaSelect}
            placeholder={placeholder}
            className="min-h-[300px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-4"
          />
        </TabsContent>
        <TabsContent value="preview" className="p-4 border-0">
          {value ? (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <p className="text-muted-foreground">{placeholder || "Nothing to preview"}</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
