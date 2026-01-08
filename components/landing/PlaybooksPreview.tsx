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
type Playbook = {
  id: string
  title: string
  subtitle: string
  icon: string
  level: string
  created_at: string
}

/* ================= COMPONENT ================= */
export default function PlaybooksPreview() {
  const [playbooks, setPlaybooks] = useState<Playbook[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPlaybooks = async () => {
      const { data, error } = await supabase
        .from("playbooks")
        .select("id,title,subtitle,icon,level,created_at")
        .order("created_at", { ascending: false })
        .limit(2)

      if (!error && data) {
        setPlaybooks(data)
      }

      setLoading(false)
    }

    loadPlaybooks()
  }, [])

  return (
    <LandingSection
      title="Decision Playbooks"
      subtitle="Quick, structured guides to make smarter decisions fast."
    >
      {loading ? (
        <p className="text-sm text-muted">Loading playbooks…</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {playbooks.map((p) => (
            <div
              key={p.id}
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
              {/* Icon */}
              <div className="text-3xl mb-3">{p.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-medium text-text">
                {p.title}
              </h3>

              {/* Subtitle */}
              <p className="mt-2 text-sm text-muted line-clamp-3">
                {p.subtitle}
              </p>

              {/* Level */}
              <p className="mt-3 text-xs text-muted uppercase tracking-wide">
                {p.level}
              </p>

              {/* CTA */}
              <a
                href="/login"
                className="mt-4 inline-block text-sm text-primary hover:text-primary-hover"
              >
                Explore playbooks →
              </a>
            </div>
          ))}

          {/* Empty state */}
          {!playbooks.length && (
            <p className="text-sm text-muted">
              No playbooks published yet.
            </p>
          )}
        </div>
      )}
    </LandingSection>
  )
}
