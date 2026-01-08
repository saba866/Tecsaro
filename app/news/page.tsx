





// "use client"

// import { useState, useEffect } from "react"
// import Header from "@/components/dashboard/header"
// import Sidebar from "@/components/dashboard/sidebar"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import {
//   Share2,
//   Bookmark,
//   ThumbsUp,
//   ThumbsDown,
//   MessageCircle,
// } from "lucide-react"
// import { supabase } from "@/lib/supabaseClient"
// import { ArticleComments } from "@/components/news-comments/ArticleComments"

// export default function NewsPage() {
//   /* ================= UI ================= */
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   /* ================= AUTH ================= */
//   const [user, setUser] = useState<any | null>(null)
//   const [userProfile, setUserProfile] = useState<any | null>(null)

//   /* ================= DATA ================= */
//   const [articles, setArticles] = useState<any[]>([])
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({})
//   const [showComments, setShowComments] = useState<Record<string, boolean>>({})

//   /* ================= REACTIONS ================= */
//   const [reactions, setReactions] = useState<Record<string, any>>({})
//   const [reactionCounts, setReactionCounts] = useState<Record<string, any>>({})
//   const [saved, setSaved] = useState<Record<string, boolean>>({})

//   /* ================= COMMENTS ================= */
//   const [commentsByArticle, setCommentsByArticle] = useState<Record<string, any[]>>({})
//   const [commentCounts, setCommentCounts] = useState<Record<string, number>>({})
//   const [newComments, setNewComments] = useState<Record<string, string>>({})
//   const [showReplies, setShowReplies] = useState<Record<string, boolean>>({})
//   const [replyInputs, setReplyInputs] = useState<Record<string, string>>({})
//   const [commentLikes, setCommentLikes] = useState<Record<string, number>>({})
//   const [userCommentLiked, setUserCommentLiked] = useState<Record<string, boolean>>({})
//   const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
//   const [editingCommentText, setEditingCommentText] = useState("")

//   /* ================= AUTH LOAD ================= */
//   useEffect(() => {
//     supabase.auth.getUser().then(({ data }) => {
//       setUser(data?.user ?? null)
//     })
//   }, [])

//   useEffect(() => {
//     if (!user) return
//     supabase
//       .from("users")
//       .select("id, first_name, last_name, username")
//       .eq("id", user.id)
//       .maybeSingle()
//       .then(({ data }) => setUserProfile(data || null))
//   }, [user])

//   /* ================= ARTICLES ================= */
//   useEffect(() => {
//     supabase
//       .from("news_articles")
//       .select("*")
//       .eq("status", "published")
//       .order("published_at", { ascending: false })
//       .then(({ data }) => setArticles(data || []))
//   }, [])

//   /* ================= COMMENTS + COUNTS ================= */
//   useEffect(() => {
//     if (!articles.length) return

//     ;(async () => {
//       const ids = articles.map((a) => a.id)

//       const { data: r } = await supabase
//         .from("news_reactions")
//         .select("article_id,reaction")
//         .in("article_id", ids)

//       const rc: any = {}
//       r?.forEach((x) => {
//         if (!rc[x.article_id]) rc[x.article_id] = { likes: 0, dislikes: 0 }
//         x.reaction === "like"
//           ? rc[x.article_id].likes++
//           : rc[x.article_id].dislikes++
//       })
//       setReactionCounts(rc)

//       const { data: c } = await supabase
//         .from("news_comments")
//         .select("*")
//         .in("article_id", ids)
//         .order("created_at", { ascending: true })

//       const grouped: any = {}
//       const counts: any = {}

//       c?.forEach((x: any) => {
//         if (!grouped[x.article_id]) grouped[x.article_id] = []
//         grouped[x.article_id].push(x)
//         counts[x.article_id] = (counts[x.article_id] || 0) + 1
//       })

//       const userIds = [...new Set(c?.map((i: any) => i.user_id).filter(Boolean))]
//       let usersMap: any = {}

//       if (userIds.length) {
//         const { data: users } = await supabase
//           .from("users")
//           .select("id, first_name, last_name, username")
//           .in("id", userIds)
//         users?.forEach((u) => (usersMap[u.id] = u))
//       }

//       const makeTree = (flat: any[]) => {
//         const map: any = {}
//         const roots: any[] = []
//         flat.forEach(
//           (i) => (map[i.id] = { ...i, children: [], user: usersMap[i.user_id] })
//         )
//         flat.forEach((i) =>
//           i.parent_id
//             ? map[i.parent_id]?.children.push(map[i.id])
//             : roots.push(map[i.id])
//         )
//         return roots
//       }

//       const nested: any = {}
//       Object.keys(grouped).forEach((id) => (nested[id] = makeTree(grouped[id])))

//       setCommentsByArticle(nested)
//       setCommentCounts(counts)
//     })()
//   }, [articles])

//   /* ================= HELPERS ================= */
//   const getInitials = (u: any) =>
//     u?.first_name ? u.first_name[0] + (u?.last_name?.[0] || "") : "U"

//   const timeAgo = (date: string) => {
//     const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
//     if (s < 60) return "just now"
//     const m = Math.floor(s / 60)
//     if (m < 60) return `${m} min ago`
//     const h = Math.floor(m / 60)
//     if (h < 24) return `${h} hr ago`
//     return `${Math.floor(h / 24)} days ago`
//   }

//   /* ================= ACTIONS ================= */
//   const toggleLike = async (id: string) => {
//     if (!user) return alert("Login required")
//     await supabase.from("news_reactions").upsert({
//       user_id: user.id,
//       article_id: id,
//       reaction: "like",
//     })
//   }

//   const toggleDislike = async (id: string) => {
//     if (!user) return alert("Login required")
//     await supabase.from("news_reactions").upsert({
//       user_id: user.id,
//       article_id: id,
//       reaction: "dislike",
//     })
//   }

//   const toggleSave = async (id: string) => {
//     if (!user) return alert("Login required")
//     saved[id]
//       ? await supabase.from("news_saved").delete().eq("article_id", id)
//       : await supabase.from("news_saved").insert({ article_id: id, user_id: user.id })
//     setSaved((p) => ({ ...p, [id]: !p[id] }))
//   }

//   /* ================= RENDER ================= */
//   return (
//     <div className="flex h-screen bg-background">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

//         <div className="flex-1 overflow-y-auto">
//           <div className="max-w-4xl mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-6 text-foreground">
//               News Feed
//             </h1>

//             <div className="space-y-6">
//               {articles.map((a) => (
//                 <Card key={a.id} className="p-6 bg-card border-border">
//                   <div className="flex gap-6">
//                     <img
//                       src={a.image}
//                       className="w-48 h-40 rounded object-cover"
//                     />

//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-foreground">
//                         {a.headline}
//                       </h3>

//                       <p className="text-sm mt-2 text-muted">
//                         {a.summary}
//                       </p>

//                       {expanded[a.id] && (
//                         <p className="mt-3 text-sm whitespace-pre-line text-text">
//                           {a.content}
//                         </p>
//                       )}

//                       <button
//                         className="text-xs mt-2 text-primary hover:text-primary-hover"
//                         onClick={() =>
//                           setExpanded((p) => ({ ...p, [a.id]: !p[a.id] }))
//                         }
//                       >
//                         {expanded[a.id] ? "Show Less" : "Read More"}
//                       </button>

//                       <div className="flex justify-between mt-4 pt-4 border-t border-border">
//                         <div className="flex gap-4 text-xs text-muted">
//                           <button onClick={() => toggleLike(a.id)}>
//                             <ThumbsUp className="w-4 h-4" />
//                           </button>
//                           <button onClick={() => toggleDislike(a.id)}>
//                             <ThumbsDown className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() =>
//                               setShowComments((p) => ({
//                                 ...p,
//                                 [a.id]: !p[a.id],
//                               }))
//                             }
//                           >
//                             <MessageCircle className="w-4 h-4" />
//                           </button>
//                         </div>

//                         <div className="flex gap-4 text-muted">
//                           <button onClick={() => toggleSave(a.id)}>
//                             <Bookmark className="w-4 h-4" />
//                           </button>
//                           <button onClick={() => navigator.clipboard.writeText(a.url)}>
//                             <Share2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>

//                       {showComments[a.id] && (
//                         <ArticleComments
//                           articleId={a.id}
//                           user={user}
//                           userProfile={userProfile}
//                           comments={commentsByArticle[a.id] || []}
//                           newComments={newComments}
//                           setNewComments={setNewComments}
//                           showReplies={showReplies}
//                           setShowReplies={setShowReplies}
//                           replyInputs={replyInputs}
//                           setReplyInputs={setReplyInputs}
//                           commentLikes={commentLikes}
//                           userCommentLiked={userCommentLiked}
//                           editingCommentId={editingCommentId}
//                           editingCommentText={editingCommentText}
//                           setEditingCommentText={setEditingCommentText}
//                           getInitials={getInitials}
//                           timeAgo={timeAgo}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }






import NewsClient from "./NewsClient"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function NewsPage() {
  const { data: articles } = await supabase
    .from("news_articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(20) // ✅ initial limit (fast, no flicker)

  return <NewsClient initialArticles={articles ?? []} />
}
