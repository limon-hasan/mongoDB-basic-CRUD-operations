"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, UserPlus } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "cn"
import { API_BASE_URL } from "@/lib/api"

const NewUserPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const newUser = Object.fromEntries(formData.entries())

    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })

      if (!res.ok) {
        throw new Error(`Create failed with status ${res.status}`)
      }

      const result = await res.json()

      if (!result?.acknowledged) {
        setError("The server did not confirm the new user. Try again.")
        return
      }

      router.push("/users")
      router.refresh()
    } catch {
      setError("Could not create the user. Make sure the API is running.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Link
        href="/users"
        className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeft className="size-4" />
        All users
      </Link>

      <PageHeader
        eyebrow="New record"
        title="Add a user"
        description="Create a new entry in the MongoDB directory."
      />

      <Card>
        <CardHeader>
          <CardTitle>User details</CardTitle>
          <CardDescription>Both fields are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddNewUser} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jordan Lee"
                  autoComplete="name"
                  disabled={submitting}
                  required
                />
                <FieldDescription>
                  The name shown on the user&apos;s card.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  disabled={submitting}
                  required
                />
                <FieldDescription>
                  Used to identify the user in the directory.
                </FieldDescription>
              </Field>
            </FieldGroup>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Link
                href="/users"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Cancel
              </Link>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <UserPlus className="size-4" />
                )}
                Add user
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default NewUserPage
