




"use client"

import Link from "next/link"
import { ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DebateHeader({ debateRecord }: any) {
  return (
    <>
      <Link
        href="/debates"
        className="flex items-center gap-2 text-primary mb-6 text-primary-hover"
      >
        <ArrowLeft className="w-4 h-4" /> Back to debates
      </Link>

      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {debateRecord?.title ?? "Debate title"}
          </h1>
          <p className="text-muted">
            {debateRecord?.description ?? "Debate description"}
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="border-border text-muted hover:text-primary"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>
    </>
  )
}
