"use client"

import { useEffect, useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { Heart, Bookmark, Share2, RotateCcw } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

/* ================= TYPES ================= */
interface BusinessInsightPost {
  id: number
  title: string
  short_description: string | null
  bullet_1: string | null
  bullet_2: string | null
  bullet_3: string | null
  bullet_4: string | null
  bullet_5: string | null
  like_count: number
  created_at: string | null
}

export default function BusinessInsightsClient({
  initialPosts,
}: {
  initialPosts: BusinessInsightPost[]
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /* 🔒 DATA IS READY ON FIRST PAINT */
  const [posts] = useState(initialPosts)

  const [userId, setUserId] = useState<string | null>(null)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [saved, setSaved] = useState<Set<number>>(new Set())
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  /* ================= USER-SPECIFIC DATA ONLY ================= */
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      const uid = data?.user?.id ?? null
      setUserId(uid)

      if (!uid) return

      const { data: likedRows } = await supabase
        .from("business_insights_reactions")
        .select("post_id")
        .eq("user_id", uid)

      setLiked(new Set(likedRows?.map((r) => r.post_id)))

      const { data: savedRows } = await supabase
        .from("business_insights_saved")
        .select("post_id")
        .eq("user_id", uid)

      setSaved(new Set(savedRows?.map((r) => r.post_id)))
    }

    loadUser()
  }, [])

  /* ================= ACTIONS ================= */
  const toggleFlip = (id: number) =>
    setFlipped((p) => ({ ...p, [id]: !p[id] }))

  const like = async (id: number) => {
    if (!userId) return alert("Login required")

    const isLiked = liked.has(id)
    const next = new Set(liked)
    isLiked ? next.delete(id) : next.add(id)
    setLiked(next)

    isLiked
      ? await supabase
          .from("business_insights_reactions")
          .delete()
          .eq("user_id", userId)
          .eq("post_id", id)
      : await supabase
          .from("business_insights_reactions")
          .insert({ user_id: userId, post_id: id })
  }

  const save = async (id: number) => {
    if (!userId) return alert("Login required")

    const isSaved = saved.has(id)
    const next = new Set(saved)
    isSaved ? next.delete(id) : next.add(id)
    setSaved(next)

    isSaved
      ? await supabase
          .from("business_insights_saved")
          .delete()
          .eq("user_id", userId)
          .eq("post_id", id)
      : await supabase
          .from("business_insights_saved")
          .insert({ user_id: userId, post_id: id })
  }

  const share = (id: number, title: string) => {
    const url = `${window.location.origin}/business-insights/${id}`
    navigator.share
      ? navigator.share({ title, url }).catch(() => {})
      : navigator.clipboard.writeText(url)
  }

  /* ================= UI ================= */
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="mb-12 max-w-3xl">
              <h1 className="text-4xl font-semibold text-foreground mb-4">
                Business Insights
              </h1>
              <p className="text-lg text-muted">
                Clear patterns behind real business decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => {
                const isFlipped = flipped[post.id]

                return (
                  <div
                    key={post.id}
                    className="relative h-80 perspective"
                    onClick={() => toggleFlip(post.id)}
                  >
                    <div
                      className={`relative h-full w-full transition-transform duration-700 transform-style-preserve-3d ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* FRONT */}
                      <div className="absolute inset-0 card rounded-xl flex flex-col justify-center text-center px-6 backface-hidden">
                        <h3 className="text-lg font-semibold text-text mb-3">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted">
                          {post.short_description}
                        </p>
                      </div>

                      {/* BACK */}
                      <div className="absolute inset-0 card rounded-xl p-6 rotate-y-180 backface-hidden flex flex-col">
                        <ul className="text-sm text-text space-y-1 mb-6">
                          {[post.bullet_1, post.bullet_2, post.bullet_3, post.bullet_4, post.bullet_5]
                            .filter(Boolean)
                            .map((b, i) => (
                              <li key={i}>• {b}</li>
                            ))}
                        </ul>

                        <div className="mt-auto flex justify-between">
                          <Heart
                            onClick={(e) => {
                              e.stopPropagation()
                              like(post.id)
                            }}
                            className={`w-5 h-5 ${
                              liked.has(post.id)
                                ? "icon-active"
                                : "icon-default"
                            }`}
                          />
                          <Bookmark
                            onClick={(e) => {
                              e.stopPropagation()
                              save(post.id)
                            }}
                            className={`w-5 h-5 ${
                              saved.has(post.id)
                                ? "icon-active"
                                : "icon-default"
                            }`}
                          />
                          <Share2
                            onClick={(e) => {
                              e.stopPropagation()
                              share(post.id, post.title)
                            }}
                            className="w-5 h-5 icon-default"
                          />
                          <RotateCcw className="w-5 h-5 icon-default" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
