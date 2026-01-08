


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
type CaseStudy = {
  id: number
  title: string
  description: string
  created_at: string
}

/* ================= DATE HELPER ================= */
function getRelativeDate(dateString: string) {
  const created = new Date(dateString)
  const now = new Date()

  const diffMs = now.getTime() - created.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  return `${diffDays} days ago`
}

/* ================= COMPONENT ================= */
export default function CaseStudiesPreview() {
  const [cases, setCases] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCaseStudies = async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("id, title, description, created_at")
        .order("created_at", { ascending: false })
        .limit(3)

      if (!error && data) {
        setCases(data)
      }

      setLoading(false)
    }

    loadCaseStudies()
  }, [])

  return (
    <LandingSection
      title="Decision Case Studies"
      subtitle="Focused on choices, constraints, and consequences — not success stories."
    >
      {loading ? (
        <p className="text-sm text-muted">Loading case studies…</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div
              key={c.id}
              className="card card-hover p-6 transition"
            >
              {/* Title */}
              <h3 className="text-lg font-medium text-text">
                {c.title}
              </h3>

              {/* Relative date */}
              <p className="mt-1 text-xs text-muted">
                Uploaded {getRelativeDate(c.created_at)}
              </p>

              {/* Description */}
              <p className="mt-3 text-sm text-muted line-clamp-3">
                {c.description}
              </p>

              {/* CTA */}
              <a
                href="/login"
                className="mt-4 inline-block text-sm text-primary hover:text-primary-hover"
              >
                Read case →
              </a>
            </div>
          ))}

          {/* Empty state */}
          {!cases.length && (
            <p className="text-sm text-muted">
              No case studies available yet.
            </p>
          )}
        </div>
      )}
    </LandingSection>
  )
}
