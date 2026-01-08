




"use client"

import { useEffect, useRef, useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { supabase } from "@/lib/supabaseClient"

/* ================= TYPES ================= */
type SavedItem = {
  id: string
  type: "case" | "insight" | "news"
  title: string
  preview: string
  created_at: string
}

/* ================= COMPONENT ================= */
export default function SavedClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [items, setItems] = useState<SavedItem[]>([])
  const [filter, setFilter] =
    useState<"all" | "case" | "insight" | "news">("all")

  /**
   * 🔒 Render gate
   * - Header + Sidebar ALWAYS render
   * - Content renders ONLY once (no flicker)
   */
  const readyRef = useRef(false)
  const [, forceRender] = useState(0)

  useEffect(() => {
    let mounted = true

    const loadSaved = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        if (mounted) {
          readyRef.current = true
          forceRender((x) => x + 1)
        }
        return
      }

      /* ---------- CASE STUDIES ---------- */
      const { data: caseSaves } = await supabase
        .from("case_study_saves")
        .select(
          `
          created_at,
          case_studies (
            id,
            title,
            description
          )
        `
        )
        .eq("user_id", user.id)

      const cases: SavedItem[] =
        caseSaves?.map((c: any) => ({
          id: `case-${c.case_studies.id}`,
          type: "case",
          title: c.case_studies.title,
          preview: c.case_studies.description,
          created_at: c.created_at,
        })) ?? []

      /* ---------- INSIGHTS ---------- */
      const { data: insightSaves } = await supabase
        .from("business_insights_saved")
        .select(
          `
          created_at,
          business_insights_posts (
            id,
            title,
            short_description
          )
        `
        )
        .eq("user_id", user.id)

      const insights: SavedItem[] =
        insightSaves?.map((i: any) => ({
          id: `insight-${i.business_insights_posts.id}`,
          type: "insight",
          title: i.business_insights_posts.title,
          preview:
            i.business_insights_posts.short_description ||
            "A concise explanation of a recurring decision pattern.",
          created_at: i.created_at,
        })) ?? []

      /* ---------- NEWS ---------- */
      const { data: newsSaves } = await supabase
        .from("news_saved")
        .select(
          `
          saved_at,
          news_articles (
            id,
            headline,
            summary
          )
        `
        )
        .eq("user_id", user.id)

      const news: SavedItem[] =
        newsSaves?.map((n: any) => ({
          id: `news-${n.news_articles.id}`,
          type: "news",
          title: n.news_articles.headline,
          preview:
            n.news_articles.summary ||
            "Decision context behind the reported event.",
          created_at: n.saved_at,
        })) ?? []

      const merged = [...cases, ...insights, ...news].sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )

      if (mounted) {
        setItems(merged)
        readyRef.current = true
        forceRender((x) => x + 1) // render ONCE
      }
    }

    loadSaved()

    return () => {
      mounted = false
    }
  }, [])

  const filtered =
    filter === "all"
      ? items
      : items.filter((i) => i.type === filter)

  return (
    <div className="flex h-screen bg-background">
      {/* ✅ ALWAYS VISIBLE */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1150px] mx-auto space-y-8">

            {/* PAGE HEADER */}
            <div>
              <h1 className="text-2xl font-semibold text-text">Saved</h1>
              <p className="mt-2 text-sm text-muted">
                Items you’ve saved to revisit, compare, or reflect on later.
              </p>
            </div>

            {/* FILTERS */}
            <div className="flex gap-2">
              {[
                { key: "all", label: "All" },
                { key: "case", label: "Case Studies" },
                { key: "insight", label: "Insights" },
                { key: "news", label: "News" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key as any)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition
                    ${
                      filter === f.key
                        ? "bg-accent border-border text-foreground"
                        : "bg-card border-border text-muted hover:border-hover"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* 🔒 CONTENT (NO FLICKER) */}
            {readyRef.current && (
              filtered.length === 0 ? (
                <div className="card p-10 text-center max-w-lg mx-auto">
                  <h3 className="text-lg font-medium text-text">
                    Nothing saved yet
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    Save case studies, insights, or news to revisit them here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((item) => (
                    <div key={item.id} className="card p-5">
                      <span className="inline-block text-xs px-2 py-1 rounded bg-accent text-foreground">
                        {item.type === "case"
                          ? "Case Study"
                          : item.type === "insight"
                          ? "Insight"
                          : "News"}
                      </span>

                      <h3 className="mt-3 text-lg font-medium text-text">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted line-clamp-2">
                        {item.preview}
                      </p>

                      <div className="mt-4 text-sm text-primary cursor-pointer">
                        View →
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
