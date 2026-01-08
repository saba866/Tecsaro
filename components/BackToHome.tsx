import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BackToHome() {
  return (
    <Link
      href="/"
      className="
        inline-flex items-center gap-2
        text-sm
        text-muted
        hover:text-primary
        transition
        mb-6
      "
    >
      <ArrowLeft size={16} />
    </Link>
  )
}
