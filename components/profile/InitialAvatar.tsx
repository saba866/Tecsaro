



import { getInitials } from "../../lib/getInitials"
import clsx from "clsx"

type Props = {
  firstName?: string | null
  lastName?: string | null
  username?: string | null
  size?: "lg" | "md"
  className?: string
}

export default function InitialAvatar({
  firstName,
  lastName,
  username,
  size = "lg",
  className,
}: Props) {
  const initials = getInitials(firstName, lastName, username)

  const base =
    "rounded-full flex items-center justify-center font-semibold uppercase bg-avatar text-avatar"

  const sizeClasses =
    size === "lg"
      ? "w-24 h-24 text-2xl"
      : "w-16 h-16 text-lg"

  return (
    <div
      className={clsx(
        base,
        sizeClasses,
        "transition hover:ring-2 ring-avatar",
        className
      )}
    >
      {initials}
    </div>
  )
}
