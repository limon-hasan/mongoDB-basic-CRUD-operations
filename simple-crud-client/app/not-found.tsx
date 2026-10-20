import Link from "next/link"
import { ArrowLeft, SearchX } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <SearchX className="size-5" />
      </div>

      <div className="space-y-1.5">
        <p className="font-mono text-xs tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="text-xl font-semibold tracking-tight">Page not found</h1>
        <p className="mx-auto max-w-md text-sm text-pretty text-muted-foreground">
          That user or page doesn&apos;t exist. It may have been deleted from
          the directory.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Link href="/users" className={cn(buttonVariants())}>
          Browse users
        </Link>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </div>
    </div>
  )
}
