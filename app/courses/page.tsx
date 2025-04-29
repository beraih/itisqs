"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Plus } from "lucide-react"
import { useUser } from "@/components/user-context"

export default function CoursesPage() {
  // We'll use the useUser hook to get the user's role
  const { role, isAuthenticated } = useUser()

  // Check if the user is an instructor
  const isInstructor = isAuthenticated && role === "instructor"

  return (
    <div className="container px-4 py-12 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to IT-ISQS Courses!</h1>

          {/* Only show the "Add Course" button if the user is an instructor */}
          {isInstructor && (
            <Button asChild>
              <Link href="/instructor/create-course">
                <Plus className="mr-2 h-4 w-4" /> Add New Course
              </Link>
            </Button>
          )}
        </div>
        <p className="text-xl text-muted-foreground">
          Expand your knowledge with expert-led courses designed to enhance your skills in IT, cybersecurity, software
          development, and more!
        </p>
      </div>

      {/* Courses Grid - Only showing Introduction to Python */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1 max-w-xl mx-auto">
        {/* Course 1 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="aspect-video relative mb-2 overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=200&width=350"
                alt="Introduction to Python"
                width={350}
                height={200}
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">Beginner</div>
            </div>
            <CardTitle>Introduction to Python</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Dr. John Smith</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Learn the fundamentals of Python programming language and start your coding journey with hands-on projects
              and exercises.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
                if (isAuthenticated) {
                  window.location.href = `/courses/introduction-to-python`
                } else {
                  window.location.href = "/log-in"
                }
              }}
            >
              View Course
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
