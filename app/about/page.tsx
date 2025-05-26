import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, BookOpen, Users, Award, Layers, BarChart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background">
        <Link className="flex items-center justify-center" href="/">
          <GraduationCap className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold">ModLearn</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/features">
            Features
          </Link>
          <Link className="text-sm font-medium text-primary hover:underline underline-offset-4" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About ModLearn</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Transforming education through structured, modular learning experiences
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Mission</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Empowering learners through structured education
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  At ModLearn, we believe that education should be accessible, structured, and engaging. Our platform is
                  designed to provide a comprehensive learning experience that adapts to the needs of both educators and
                  learners.
                </p>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  We're committed to creating a learning environment that fosters growth, encourages exploration, and
                  celebrates achievement. Through our modular approach, we make complex subjects approachable and
                  learning paths clear.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-6">
                      <Card className="bg-background/80 backdrop-blur-sm">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <BookOpen className="h-8 w-8 text-primary mb-2" />
                          <span className="text-sm font-medium">Structured Learning</span>
                        </CardContent>
                      </Card>
                      <Card className="bg-background/80 backdrop-blur-sm">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <Users className="h-8 w-8 text-primary mb-2" />
                          <span className="text-sm font-medium">Community</span>
                        </CardContent>
                      </Card>
                      <Card className="bg-background/80 backdrop-blur-sm">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <Award className="h-8 w-8 text-primary mb-2" />
                          <span className="text-sm font-medium">Achievement</span>
                        </CardContent>
                      </Card>
                      <Card className="bg-background/80 backdrop-blur-sm">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <Layers className="h-8 w-8 text-primary mb-2" />
                          <span className="text-sm font-medium">Modularity</span>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Approach</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed mx-auto">
                  ModLearn's unique approach to education is built on four key principles
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Modularity</h3>
                <p className="text-sm text-muted-foreground">
                  Breaking down complex subjects into manageable, interconnected modules
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Structure</h3>
                <p className="text-sm text-muted-foreground">
                  Clear learning paths with progressive difficulty and logical organization
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive tracking and visualization of learning achievements
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Collaborative learning environments that connect learners and educators
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Team</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed mx-auto">
                  Meet the passionate educators and technologists behind ModLearn
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Founder & Educational Director",
                  bio: "Former professor with 15+ years in educational technology",
                  initials: "SJ",
                },
                {
                  name: "Michael Chen",
                  role: "Chief Technology Officer",
                  bio: "Software architect specializing in educational platforms",
                  initials: "MC",
                },
                {
                  name: "Priya Patel",
                  role: "Content Strategy Lead",
                  bio: "Curriculum developer with expertise in modular learning",
                  initials: "PP",
                },
                {
                  name: "James Wilson",
                  role: "UX/UI Design Lead",
                  bio: "Designer focused on creating accessible learning experiences",
                  initials: "JW",
                },
                {
                  name: "Elena Rodriguez",
                  role: "Learning Science Researcher",
                  bio: "PhD in cognitive science applied to educational technology",
                  initials: "ER",
                },
                {
                  name: "David Kim",
                  role: "Community Engagement Manager",
                  bio: "Building connections between educators and learners",
                  initials: "DK",
                },
              ].map((member, index) => (
                <div key={index} className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm font-medium text-primary">{member.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Learning Community</h2>
                <p className="max-w-[700px] md:text-xl/relaxed mx-auto">
                  Start your structured learning journey with ModLearn today
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">© 2023 ModLearn. All rights reserved.</p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
