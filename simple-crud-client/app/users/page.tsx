import Link from "next/link"
import { Plus } from "lucide-react"

import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
import UserCard from "@/components/UserCard"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import type { User } from "@/lib/types"

export const dynamic = "force-dynamic"

const UsersPage = async () => {
  const res = await fetch("http://localhost:5000/users", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Failed to load users (status ${res.status})`)
  }

  const users = (await res.json()) as User[]

  if (!Array.isArray(users)) {
    throw new Error("Unexpected response from the users API")
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Directory"
        title="Users"
        description="Everyone in the MongoDB collection, in one place."
        actions={
          <>
            <Badge variant="secondary">
              {users.length} {users.length === 1 ? "user" : "users"}
            </Badge>
            <Link
              href="/users/new"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              <Plus className="size-4" />
              Add user
            </Link>
          </>
        }
      />

      {users.length === 0 ? (
        <EmptyState
          title="No users yet"
          description="The directory is empty. Add the first person to get started."
          action={
            <Link href="/users/new" className={cn(buttonVariants())}>
              <Plus className="size-4" />
              Add a user
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default UsersPage
