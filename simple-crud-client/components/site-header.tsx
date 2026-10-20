"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "cn"

const links = [
  { href: "/users", label: "Users" },
  { href: "/users/new", label: "Add user" },
]

function isActive(href: string, pathname: string) {
  if (href === "/users") {
    return (
      pathname === "/users" ||
      (pathname.startsWith("/users/") && pathname !== "/users/new")
    )
  }

  return pathname === href
}

export function SiteHeader() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === "dark"

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <UserRound className="size-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">Userbase</span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active = isActive(link.href, pathname)

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}

          <Button
            variant="ghost"
            size="icon"
            className="ml-1"
            title="Toggle theme (d)"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <Sun className="hidden size-4 dark:block" />
            <Moon className="size-4 dark:hidden" />
          </Button>
        </nav>
      </div>
    </header>
  )
}
