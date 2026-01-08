"use client"

import React, { useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, MessageSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

/* ================= TYPES ================= */

interface Debate {
  id: string
  title: string
  description: string
  topic: string
  forTeam: {
    name: string
    points: number
    contributors: number
  }
  againstTeam: {
    name: string
    points: number
    contributors: number
  }
  participants: number
  comments: number
  status: "active" | "scheduled" | "completed"
  startDate: string | null
  endDate: string | null
  difficulty: "beginner" | "intermediate" | "advanced"
}

/* ================= TIME HELPER ================= */

function timeRemainingFromIso(iso: string | null) {
  if (!iso) return null
  const end = new Date(iso)
  if (isNaN(end.getTime())) return null
  const diff = end.getTime() - Date.now()
  if (diff <= 0) return null
  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const m = Math.floor((diff / (1000 * 60)) % 60)
  const s = Math.floor((diff / 1000) % 60)
  return `${d}d ${h}h ${m}m ${s}s`
}

/* ================= COMPONENT ================= */

export default function DebatesClient({
  initialDebates,
}: {
  initialDebates: Debate[]
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filter, setFilter] =
    useState<"active" | "scheduled" | "completed">("active")

  // ✅ hydrated immediately — NO blank page
  const debates = initialDebates

  const filteredDebates = debates.filter((d) => d.status === filter)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">

            {/* ===== Page Header ===== */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-text mb-2">
                  Debates
                </h1>
                <p className="text-muted">
                  Engage in structured business strategy discussions
                </p>
              </div>

              <Link href="/debates/new">
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Start Debate
                </Button>
              </Link>
            </div>

            {/* ===== Filters ===== */}
            <div className="flex gap-3 mb-8 border-b border-border">
              {(["active", "scheduled", "completed"] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-3 font-medium border-b-2 transition ${
                      filter === status
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted hover:text-foreground"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)} (
                    {debates.filter((d) => d.status === status).length})
                  </button>
                )
              )}
            </div>

            {/* ===== Debates ===== */}
            <div className="space-y-6">
              {filteredDebates.map((debate) => {
                let timingLabel: string | null = null

                if (debate.status === "active") {
                  const rem = timeRemainingFromIso(debate.endDate)
                  timingLabel = rem ? `Ends in ${rem}` : "Ended"
                } else if (debate.status === "scheduled") {
                  const rem = timeRemainingFromIso(debate.startDate)
                  timingLabel = rem
                    ? `Starts in ${rem}`
                    : "Starting soon"
                } else {
                  timingLabel = "Completed"
                }

                return (
                  <Link key={debate.id} href={`/debates/${debate.id}`}>
                    <Card className="bg-card border border-border hover-border-hover transition p-6">
                      <div className="grid md:grid-cols-3 gap-6">

                        {/* ===== Left ===== */}
                        <div className="md:col-span-2 space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-text mb-2">
                                {debate.title}
                              </h3>
                              <p className="text-muted">
                                {debate.description}
                              </p>
                            </div>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                debate.difficulty === "beginner"
                                  ? "bg-accent text-primary"
                                  : debate.difficulty === "intermediate"
                                  ? "bg-background text-foreground"
                                  : "bg-accent/20 debate-text-status-error"
                              }`}
                            >
                              {debate.difficulty}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-background border border-border rounded-lg p-4">
                              <p className="text-sm font-semibold text-foreground mb-2">
                                For
                              </p>
                              <p className="font-semibold text-text mb-2">
                                {debate.forTeam.name}
                              </p>
                              <div className="flex justify-between text-xs text-muted">
                                <span>{debate.forTeam.points} pts</span>
                                <span>
                                  {debate.forTeam.contributors} contributors
                                </span>
                              </div>
                            </div>

                            <div className="bg-background border border-border rounded-lg p-4">
                              <p className="text-sm font-semibold text-foreground mb-2">
                                Against
                              </p>
                              <p className="font-semibold text-text mb-2">
                                {debate.againstTeam.name}
                              </p>
                              <div className="flex justify-between text-xs text-muted">
                                <span>{debate.againstTeam.points} pts</span>
                                <span>
                                  {debate.againstTeam.contributors} contributors
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ===== Right ===== */}
                        <div className="flex flex-col justify-between">
                          <div className="space-y-3 text-muted">
                            <div className="flex items-center gap-3">
                              <Users className="w-5 h-5 text-primary" />
                              {debate.participants} participants
                            </div>
                            <div className="flex items-center gap-3">
                              <MessageSquare className="w-5 h-5 text-primary" />
                              {debate.comments} comments
                            </div>
                            <div className="flex items-center gap-3">
                              <TrendingUp className="w-5 h-5 text-primary" />
                              {Math.max(
                                debate.forTeam.points,
                                debate.againstTeam.points
                              )} pts lead
                            </div>

                            <div className="mt-3 p-3 rounded-md bg-background text-text font-medium">
                              {timingLabel}
                            </div>
                          </div>

                          <Button className="w-full mt-4 btn-primary">
                            View Debate
                          </Button>
                        </div>

                      </div>
                    </Card>
                  </Link>
                )
              })}

              {filteredDebates.length === 0 && (
                <div className="text-muted">
                  No debates in this category.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
