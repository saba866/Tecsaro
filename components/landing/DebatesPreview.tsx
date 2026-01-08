



"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import LandingSection from "./LandingSection"

/* ================= SUPABASE CLIENT ================= */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/* ================= TYPES ================= */
type Debate = {
  id: number
  title: string
  description: string
  status: "active" | "scheduled" | "completed"
  start_date: string
  end_date: string
  created_at: string
}

/* ================= COMPONENT ================= */
export default function DebatesPreview() {
  const [debates, setDebates] = useState<Debate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDebates = async () => {
      const { data, error } = await supabase
        .from("topic_debates")
        .select(
          "id, title, description, status, start_date, end_date, created_at"
        )
        .order("created_at", { ascending: false })
        .limit(2)

      if (!error && data) {
        setDebates(data)
      }

      setLoading(false)
    }

    loadDebates()
  }, [])

  /* ================= HELPERS ================= */
  const getStatusLabel = (status: Debate["status"]) => {
    if (status === "active") return "Open · 24 hrs"
    if (status === "scheduled") return "Scheduled"
    return "Closed"
  }

  return (
    <LandingSection
      title="Structured Debates"
      subtitle="Time-bound discussions focused on real business decisions."
    >
      {loading ? (
        <p className="text-sm text-muted">Loading debates…</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {debates.map((d) => (
            <div
              key={d.id}
              tabIndex={0}
              className="
                card
                card-hover
                p-6
                cursor-pointer
                transition
                hover:shadow-sm
                focus:outline-none
              "
            >
              {/* Debate Question */}
              <h3 className="text-lg font-medium text-text">
                {d.title}
              </h3>

              {/* Context */}
              <p className="mt-2 text-sm text-muted line-clamp-3">
                {d.description}
              </p>

              {/* Status */}
              <p className="mt-3 text-xs text-muted">
                {getStatusLabel(d.status)}
              </p>

              {/* CTA */}
              <a
                href="/login"
                className="mt-4 inline-block text-sm text-primary text-primary-hover"
              >
                View debate →
              </a>
            </div>
          ))}

          {/* Empty state */}
          {!debates.length && (
            <p className="text-sm text-muted">
              No debates available right now.
            </p>
          )}
        </div>
      )}
    </LandingSection>
  )
}
