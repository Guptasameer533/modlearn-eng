"use client"

import { LearnerLayout } from "@/components/learner-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function LearnerSettingsPage() {
  return (
    <LearnerLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Customize your learning experience</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>Configure how you want to learn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="difficulty">Default Difficulty Level</Label>
                <Select defaultValue="intermediate">
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-play" />
                <Label htmlFor="auto-play">Auto-play videos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="subtitles" defaultChecked />
                <Label htmlFor="subtitles">Show subtitles by default</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="course-updates" defaultChecked />
                <Label htmlFor="course-updates">Course updates and announcements</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="progress-reminders" defaultChecked />
                <Label htmlFor="progress-reminders">Progress reminders</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="new-courses" />
                <Label htmlFor="new-courses">New course recommendations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="achievements" defaultChecked />
                <Label htmlFor="achievements">Achievement notifications</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>Control your privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="public-profile" />
                <Label htmlFor="public-profile">Make my profile public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-progress" />
                <Label htmlFor="show-progress">Show my progress to other learners</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="analytics" defaultChecked />
                <Label htmlFor="analytics">Allow analytics for improving the platform</Label>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save Settings</Button>
          </div>
        </div>
      </div>
    </LearnerLayout>
  )
}
