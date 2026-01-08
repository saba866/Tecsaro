


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
type BusinessTool = {
  id: string
  name: string
  short_description: string
  created_at: string
}

/* ================= COMPONENT ================= */
export default function ToolsPreview() {
  const [tools, setTools] = useState<BusinessTool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTools = async () => {
      const { data, error } = await supabase
        .from("business_tools")
        .select("id, name, short_description, created_at")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(3)

      if (!error && data) {
        setTools(data)
      }

      setLoading(false)
    }

    loadTools()
  }, [])

  return (
    <LandingSection
      title="Business Tools"
      subtitle="Curated tools that support better thinking and analysis."
    >
      {loading ? (
        <p className="text-sm text-muted">Loading tools…</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
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
                focus:shadow-sm
              "
            >
              <h3 className="text-md font-medium text-foreground">
                {tool.name}
              </h3>

              <p className="mt-2 text-sm text-muted line-clamp-2">
                {tool.short_description}
              </p>

              <a
                href="/login"
                className="mt-3 inline-block text-sm text-primary hover:text-primary-hover"
              >
                Explore tool →
              </a>
            </div>
          ))}

          {/* Empty state (important for MVP stability) */}
          {!tools.length && (
            <p className="text-sm text-muted">
              No tools available yet.
            </p>
          )}
        </div>
      )}
    </LandingSection>
  )
}
