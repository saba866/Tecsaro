



"use client"

import { useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard"
import { useCaseStudies } from "@/hooks/useCaseStudies"

/* ================= TYPES (LOCAL, NO SEPARATE FILE) ================= */

export interface CaseStudy {
  id: number
  title: string
  description: string
  image_url: string | null
  category: string
  sponsor?: string | null
  author: string
  read_time: string
  featured?: boolean
  likes: number
  comment_count?: number
}

/* ================= PROPS ================= */

type Props = {
  initialCaseStudies: CaseStudy[]
}

/* ================= COMPONENT ================= */

export default function CaseStudiesClient({
  initialCaseStudies,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ✅ hydrate hook with server data
  const state = useCaseStudies(initialCaseStudies)

  return (
    <div className="flex h-screen bg-background">
      {/* ===== Sidebar ===== */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ===== Main Area ===== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="pt-8 px-6 max-w-4xl mx-auto space-y-8">

            {/* ================= PAGE HEADER ================= */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-text">
                Case Studies
              </h1>

              <p className="text-sm text-muted max-w-2xl">
                Deep dives into real-world business decisions, product
                strategies, growth experiments, and lessons learned from
                successful (and failed) companies.
              </p>
            </div>

            {/* ================= CASE STUDIES LIST ================= */}
            <div className="space-y-6">
              {state.caseStudies.map((post) => (
                <CaseStudyCard
                  key={post.id}
                  post={post}
                  state={state}
                />
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
