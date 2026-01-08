


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
type BusinessInsight = {
  id: number
  title: string
  short_description: string | null
  created_at: string
}

/* ================= COMPONENT ================= */
export default function InsightsPreview() {
  const [insights, setInsights] = useState<BusinessInsight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadInsights = async () => {
      const { data, error } = await supabase
        .from("business_insights_posts")
        .select("id, title, short_description, created_at")
        .order("created_at", { ascending: false })
        .limit(3)

      if (!error && data) {
        setInsights(data)
      }

      setLoading(false)
    }

    loadInsights()
  }, [])

  return (
    <LandingSection
      title="Business Insights"
      subtitle="Short explanations of patterns seen in real decision-making."
    >
      {loading ? (
        <p className="text-sm text-muted">Loading insights…</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((i) => (
            <div
              key={i.id}
              tabIndex={0}
              className="
                card
                card-hover
                p-6
                cursor-pointer
                transition
                hover:shadow-sm
                focus:outline-none
                focus:shadow-sm
              "
            >
              <h3 className="text-md font-medium text-foreground">
                {i.title}
              </h3>

              <p className="mt-2 text-sm text-muted line-clamp-2">
                {i.short_description ||
                  "A concise explanation of a recurring decision pattern."}
              </p>

              <a
                href="/login"
                className="mt-3 inline-block text-sm text-primary text-primary-hover"
              >
                Read more →
              </a>
            </div>
          ))}

          {!insights.length && (
            <p className="text-sm text-muted">
              No insights published yet.
            </p>
          )}
        </div>
      )}
    </LandingSection>
  )
}
