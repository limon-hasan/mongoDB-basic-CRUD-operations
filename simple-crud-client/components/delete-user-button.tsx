"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DeleteUserButtonProps {
  id: string
  name: string
  redirectTo?: string
  variant?: "icon" | "default"
}

export function DeleteUserButton({
  id,
  name,
  redirectTo,
  variant = "icon",
}: DeleteUserButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setDeleting(true)
    setError(null)

    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error(`Delete failed with status ${res.status}`)
      }

      const result = await res.json()

      if (!result?.deletedCount) {
        setError("The server did not delete this user. It may already be gone.")
        return
      }

      setOpen(false)

      if (redirectTo) {
        router.push(redirectTo)
      }

      router.refresh()
    } catch {
      setError("Could not delete this user. Make sure the API is running.")
    } finally {
      setDeleting(false)
    }
  }

  const trigger =
    variant === "icon" ? (
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Delete ${name}`}
        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="size-4" />
      </Button>
    ) : (
      <Button variant="destructive">
        <Trash2 className="size-4" />
        Delete
      </Button>
    )

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (deleting) {
          return
        }

        setOpen(nextOpen)

        if (!nextOpen) {
          setError(null)
        }
      }}
    >
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription>
            This permanently removes{" "}
            <span className="font-medium text-foreground">{name}</span> from the
            directory. This action can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" disabled={deleting}>
                Cancel
              </Button>
            }
          />
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            Delete user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
