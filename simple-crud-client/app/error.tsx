"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import { API_DISPLAY_HOST } from "@/lib/api"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-5" />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="mx-auto max-w-md text-sm text-pretty text-muted-foreground">
          The directory couldn&apos;t reach the API. Make sure the server at{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
            {API_DISPLAY_HOST}
          </code>{" "}
          is running, then try again.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={reset}>
          <RotateCcw className="size-4" />
          Try again
        </Button>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </div>
    </div>
  )
}
