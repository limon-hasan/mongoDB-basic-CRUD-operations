import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Hash, Mail } from "lucide-react"

import { DeleteUserButton } from "@/components/delete-user-button"
import UpdateUserDialog from "@/components/UpdateUserDialog"
import { UserAvatar } from "@/components/user-avatar"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { User } from "@/lib/types"

const UsersDetailsPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>
}) => {
  const { userId } = await params

  const res = await fetch(`http://localhost:5000/users/${userId}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    notFound()
  }

  const user = (await res.json()) as User | null

  if (!user?._id) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <Link
        href="/users"
        className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeft className="size-4" />
        All users
      </Link>

      <section className="flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <UserAvatar name={user.name} size="lg" />
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold tracking-tight">
              {user.name}
            </h1>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <UpdateUserDialog user={user} />
          <DeleteUserButton
            id={user._id}
            name={user.name}
            variant="default"
            redirectTo="/users"
          />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>How to reach this user.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Email
                </p>
                <a
                  href={`mailto:${user.email}`}
                  className="text-sm break-all underline-offset-4 hover:underline"
                >
                  {user.email}
                </a>
              </div>
            </div>

            <a
              href={`mailto:${user.email}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <Mail className="size-4" />
              Send email
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Record</CardTitle>
            <CardDescription>
              Identifiers from the MongoDB collection.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <Hash className="size-3.5" />
                User ID
              </div>
              <p className="mt-1 font-mono text-xs break-all">{user._id}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Stored in{" "}
              <span className="font-medium text-foreground">
                simpleCrudDB.users
              </span>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UsersDetailsPage
