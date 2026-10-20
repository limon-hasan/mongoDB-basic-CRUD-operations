"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Pencil } from "lucide-react"

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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { User } from "@/lib/types"

const UpdateUserDialog = ({ user }: { user: User }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const updateUser = Object.fromEntries(formData.entries())

    try {
      const res = await fetch(`http://localhost:5000/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      })

      if (!res.ok) {
        throw new Error(`Update failed with status ${res.status}`)
      }

      setOpen(false)
      router.refresh()
    } catch {
      setError("Could not save changes. Make sure the API is running.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (saving) {
          return
        }

        setOpen(nextOpen)

        if (!nextOpen) {
          setError(null)
        }
      }}
    >
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <Pencil className="size-4" />
            Edit
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleUpdateUser} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit user</DialogTitle>
            <DialogDescription>
              Update {user.name}&apos;s name or email. Changes apply
              immediately.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={`name-${user._id}`}>Name</FieldLabel>
              <Input
                id={`name-${user._id}`}
                name="name"
                defaultValue={user.name}
                autoComplete="name"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`email-${user._id}`}>Email</FieldLabel>
              <Input
                id={`email-${user._id}`}
                name="email"
                type="email"
                defaultValue={user.email}
                autoComplete="email"
                required
              />
            </Field>
          </FieldGroup>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={saving}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateUserDialog
