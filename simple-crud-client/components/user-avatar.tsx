import { cn } from "cn"

const sizes = {
  sm: "size-9 text-xs",
  default: "size-11 text-sm",
  lg: "size-16 text-xl",
} as const

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  return initials || "?"
}

interface UserAvatarProps {
  name: string
  size?: keyof typeof sizes
  className?: string
}

export function UserAvatar({
  name,
  size = "default",
  className,
}: UserAvatarProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary ring-1 ring-primary/15",
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}
