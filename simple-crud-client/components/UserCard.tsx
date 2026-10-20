import Link from "next/link"
import { Eye, Hash } from "lucide-react"

import { DeleteUserButton } from "@/components/delete-user-button"
import UpdateUserDialog from "@/components/UpdateUserDialog"
import { UserAvatar } from "@/components/user-avatar"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "cn"
import type { User } from "@/lib/types"

const UserCard = ({ user }: { user: User }) => {
  return (
    <Card className="transition-all hover:shadow-md hover:ring-foreground/15">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <UserAvatar name={user.name} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{user.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-1.5 text-xs text-muted-foreground">
          <Hash className="size-3.5 shrink-0" />
          <span className="truncate font-mono">{user._id}</span>
        </div>
      </CardContent>

      <CardFooter className="flex-wrap gap-2">
        <Link
          href={`/users/${user._id}`}
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
              className: "flex-1",
            })
          )}
        >
          <Eye className="size-4" />
          View details
        </Link>
        <UpdateUserDialog user={user} />
        <DeleteUserButton id={user._id} name={user.name} />
      </CardFooter>
    </Card>
  )
}

export default UserCard
