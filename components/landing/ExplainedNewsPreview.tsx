



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
type NewsArticle = {
  id: string
  headline: string
  summary: string | null
  published_at: string
}

/* ================= COMPONENT ================= */
export default function ExplainedNewsPreview() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      const { data, error } = await supabase
        .from("news_articles")
        .select("id, headline, summary, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(2)

      if (!error && data) {
        setNews(data)
      }

      setLoading(false)
    }

    loadNews()
  }, [])

  return (
    <LandingSection
      title="Explained News"
      subtitle="Current events explained through decision context."
    >
      {loading ? (
        <p className="text-sm text-muted">Loading explained news…</p>
      ) : (
        <div className="space-y-4">
          {news.map((n) => (
            <div
              key={n.id}
              tabIndex={0}
              className="
                bg-card
                border border-border
                p-6
                cursor-pointer
                transition
                card-hover
                hover:shadow-sm
                focus:outline-none
                focus:border-border
                focus:shadow-sm
              "
            >
              <h3 className="text-md font-medium text-foreground">
                {n.headline}
              </h3>

              {n.summary && (
                <p className="mt-2 text-sm text-muted line-clamp-2">
                  {n.summary}
                </p>
              )}

              <a
                href="/login"
                className="mt-3 inline-block text-sm text-primary text-primary-hover"
              >
                Read explanation →
              </a>
            </div>
          ))}

          {!news.length && (
            <p className="text-sm text-muted">
              No explained news available yet.
            </p>
          )}
        </div>
      )}
    </LandingSection>
  )
}
