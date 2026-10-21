import Link from "next/link"
import {
  ArrowRight,
  Database,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  UserPlus,
  UsersRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "cn"
import { API_DISPLAY_HOST } from "@/lib/api"

const endpoints = [
  { method: "GET", path: "/users", description: "List everyone" },
  { method: "POST", path: "/users", description: "Create a record" },
  { method: "PATCH", path: "/users/:id", description: "Update details" },
  { method: "DELETE", path: "/users/:id", description: "Remove a record" },
]

const methodStyles: Record<string, string> = {
  GET: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  POST: "bg-primary/10 text-primary",
  PATCH: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  DELETE: "bg-destructive/10 text-destructive",
}

const features = [
  {
    title: "Create",
    description: "Add a user with a name and email in a single step.",
    href: "/users/new",
    icon: UserPlus,
  },
  {
    title: "Browse",
    description: "Scan the whole directory in a responsive card grid.",
    href: "/users",
    icon: UsersRound,
  },
  {
    title: "Update",
    description: "Edit a record in a focused dialog without losing context.",
    href: "/users",
    icon: Pencil,
  },
  {
    title: "Delete",
    description: "Remove a user behind an explicit confirmation.",
    href: "/users",
    icon: Trash2,
  },
]

export default function Page() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-10">
        <div className="space-y-6">
          <Badge
            variant="outline"
            className="gap-1.5 border-primary/20 bg-primary/5 text-primary"
          >
            <Sparkles className="size-3" />
            Next.js 16 + MongoDB
          </Badge>

          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Manage users without the busywork.
            </h1>
            <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
              A focused CRUD client for your MongoDB directory. Create, browse,
              update, and remove records in a few clicks.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/users" className={cn(buttonVariants({ size: "lg" }))}>
              Browse users
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/users/new"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Plus className="size-4" />
              Add a user
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Press{" "}
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
              d
            </kbd>{" "}
            to toggle dark mode.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-destructive/60" />
              <span className="size-2.5 rounded-full bg-amber-400/70" />
              <span className="size-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              {API_DISPLAY_HOST}
            </span>
          </div>

          <ul className="divide-y">
            {endpoints.map((endpoint) => (
              <li
                key={`${endpoint.method}-${endpoint.path}`}
                className="flex items-center gap-3 px-4 py-3"
              >
                <span
                  className={cn(
                    "w-16 rounded-md px-1.5 py-0.5 text-center font-mono text-[10px] font-semibold",
                    methodStyles[endpoint.method]
                  )}
                >
                  {endpoint.method}
                </span>
                <code className="text-sm text-foreground">{endpoint.path}</code>
                <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
                  {endpoint.description}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 border-t bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
            <Database className="size-3.5" />
            simpleCrudDB.users
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-1.5">
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Workflow
          </p>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Everything the directory needs
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Card className="h-full transition-colors group-hover:ring-foreground/20">
                <CardContent className="space-y-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Ready to add someone?
          </h2>
          <p className="text-sm text-muted-foreground">
            Create a record and it appears in the directory immediately.
          </p>
        </div>
        <Link href="/users/new" className={cn(buttonVariants({ size: "lg" }))}>
          <Plus className="size-4" />
          Add a user
        </Link>
      </section>
    </div>
  )
}
