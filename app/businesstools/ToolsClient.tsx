"use client"

import { useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@supabase/supabase-js"

/* ================= TYPES ================= */
interface BusinessTool {
  id: string
  name: string
  short_description: string
  features: string[] | null
  website_url: string
  is_featured: boolean
  status: string
  created_at: string
}

/* ================= SUPABASE (CLIENT ONLY FOR CLICKS) ================= */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ToolsClient({ tools }: { tools: BusinessTool[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /* ================= CLICK TRACKING (CLIENT-SIDE IS CORRECT) ================= */
  const handleToolClick = async (tool: BusinessTool) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      await supabase.from("business_tool_clicks").insert({
        tool_id: tool.id,
        user_id: user?.id ?? null,
      })
    } catch {
      // silent fail
    } finally {
      window.open(tool.website_url, "_blank")
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-10">

            {/* ================= PAGE HEADER ================= */}
            <div className="mb-12 max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-primary" />
                <span className="text-xs font-semibold tracking-widest text-muted uppercase">
                  Curated Resources
                </span>
              </div>

              <h1 className="text-4xl font-semibold text-foreground mb-4 leading-tight">
                Hidden Business Tools
              </h1>

              <p className="text-lg text-muted leading-relaxed">
                Carefully selected tools, websites, and platforms that quietly
                help founders, teams, and operators make better decisions.
              </p>
            </div>

            {/* ================= EMPTY STATE ================= */}
            {tools.length === 0 && (
              <p className="text-sm text-muted">
                No tools published yet.
              </p>
            )}

            {/* ================= TOOLS GRID ================= */}
            {tools.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="border border-border rounded-md transition hover-border-hover"
                  >
                    <Card className="bg-card p-6 flex flex-col border-0">
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-text">
                          {tool.name}
                        </h3>

                        {tool.is_featured && (
                          <p className="text-xs text-muted mt-1">
                            Frequently used by early-stage teams
                          </p>
                        )}
                      </div>

                      <p className="text-sm text-muted leading-relaxed mb-5 flex-1">
                        {tool.short_description}
                      </p>

                      {tool.features && tool.features.length > 0 && (
                        <ul className="text-sm text-muted mb-6 space-y-1">
                          {tool.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                      )}

                      <Button
                        onClick={() => handleToolClick(tool)}
                        className="w-full btn-primary"
                      >
                        Open Tool
                      </Button>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
