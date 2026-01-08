// "use client"

// import { useState } from "react"
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

// export default function NewsClient({
//   initialArticles,
// }: {
//   initialArticles: any[]
// }) {
//   /* ================= UI ================= */
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   /* ================= DATA (READY IMMEDIATELY) ================= */
//   const [articles] = useState(initialArticles)
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({})
//   const [showComments, setShowComments] = useState<Record<string, boolean>>({})
//   const [saved, setSaved] = useState<Record<string, boolean>>({})

//   /* ================= HELPERS ================= */
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
//   const toggleSave = async (id: string) => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()
//     if (!user) return alert("Login required")

//     saved[id]
//       ? await supabase.from("news_saved").delete().eq("article_id", id)
//       : await supabase
//           .from("news_saved")
//           .insert({ article_id: id, user_id: user.id })

//     setSaved((p) => ({ ...p, [id]: !p[id] }))
//   }

//   /* ================= RENDER ================= */
//   return (
//     <div className="flex h-screen bg-background">
//       {/* ✅ ALWAYS RENDER */}
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
//                         <p className="mt-3 text-sm whitespace-pre-line">
//                           {a.content}
//                         </p>
//                       )}

//                       <button
//                         className="text-xs mt-2 text-primary"
//                         onClick={() =>
//                           setExpanded((p) => ({ ...p, [a.id]: !p[a.id] }))
//                         }
//                       >
//                         {expanded[a.id] ? "Show Less" : "Read More"}
//                       </button>

//                       <div className="flex justify-between mt-4 pt-4 border-t">
//                         <div className="flex gap-4 text-xs text-muted">
//                           <ThumbsUp className="w-4 h-4" />
//                           <ThumbsDown className="w-4 h-4" />
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

//                         <div className="flex gap-4">
//                           <button onClick={() => toggleSave(a.id)}>
//                             <Bookmark className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() =>
//                               navigator.clipboard.writeText(a.url)
//                             }
//                           >
//                             <Share2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>

//                       {showComments[a.id] && (
//                         <ArticleComments articleId={a.id} />
//                       )}

//                       <p className="text-xs mt-2 text-muted">
//                         {timeAgo(a.published_at)}
//                       </p>
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





// "use client"

// import { useEffect, useState } from "react"
// import Header from "@/components/dashboard/header"
// import Sidebar from "@/components/dashboard/sidebar"
// import { Card } from "@/components/ui/card"
// import {
//   Share2,
//   Bookmark,
//   ThumbsUp,
//   ThumbsDown,
//   MessageCircle,
// } from "lucide-react"
// import { supabase } from "@/lib/supabaseClient"
// import { ArticleComments } from "@/components/news-comments/ArticleComments"

// /* ================= TYPES ================= */

// type Article = {
//   id: string
//   headline: string
//   summary: string
//   content: string
//   image: string
//   url: string
//   published_at: string
// }

// /* ================= COMPONENT ================= */

// export default function NewsClient({
//   initialArticles,
// }: {
//   initialArticles: Article[]
// }) {
//   /* ================= UI ================= */
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   /* ================= DATA ================= */
//   const [articles] = useState(initialArticles)
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({})
//   const [showComments, setShowComments] = useState<Record<string, boolean>>({})

//   /* ================= USER STATES ================= */
//   const [saved, setSaved] = useState<Record<string, boolean>>({})
//   const [shared, setShared] = useState<Record<string, boolean>>({})
//   const [reactions, setReactions] = useState<
//     Record<string, "like" | "dislike" | null>
//   >({})

//   /* ================= HELPERS ================= */
//   const timeAgo = (date: string) => {
//     const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
//     if (s < 60) return "just now"
//     const m = Math.floor(s / 60)
//     if (m < 60) return `${m} min ago`
//     const h = Math.floor(m / 60)
//     if (h < 24) return `${h} hr ago`
//     return `${Math.floor(h / 24)} days ago`
//   }

//   /* ================= LOAD USER DATA ================= */
//   useEffect(() => {
//     const loadUserState = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()
//       if (!user) return

//       /* SAVED */
//       const { data: savedRows } = await supabase
//         .from("news_saved")
//         .select("article_id")
//         .eq("user_id", user.id)

//       setSaved(
//         Object.fromEntries(
//           savedRows?.map((r) => [r.article_id, true]) ?? []
//         )
//       )

//       /* SHARED */
//     //   const { data: shareRows } = await supabase
//     //     .from("news_shares")
//     //     .select("article_id")
//     //     .eq("user_id", user.id)

//     //   setShared(
//     //     Object.fromEntries(
//     //       shareRows?.map((r) => [r.article_id, true]) ?? []
//     //     )
//     //   )
//     const handleSharenews = async (post: shared) => {
//         try {
//           if (navigator.share) {
//             await navigator.share({
//               title: post.title,
//               text: post.description,
//               url: window.location.href,
//             })
//           } else {
//             await navigator.clipboard.writeText(window.location.href)
//             alert("Link copied")
//           }
//         } catch (err) {
//           console.error("Share failed", err)
//         }
//       }
    

//       /* REACTIONS */
//       const { data: reactionRows } = await supabase
//         .from("news_reactions")
//         .select("article_id, reaction")
//         .eq("user_id", user.id)

//       const reactionMap: Record<string, "like" | "dislike"> = {}
//       reactionRows?.forEach(
//         (r) => (reactionMap[r.article_id] = r.reaction)
//       )
//       setReactions(reactionMap)
//     }

//     loadUserState()
//   }, [])

//   /* ================= ACTIONS ================= */

//   const toggleSave = async (articleId: string) => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()
//     if (!user) return alert("Login required")

//     if (saved[articleId]) {
//       await supabase
//         .from("news_saved")
//         .delete()
//         .eq("article_id", articleId)
//         .eq("user_id", user.id)

//       setSaved((p) => ({ ...p, [articleId]: false }))
//     } else {
//       await supabase.from("news_saved").insert({
//         article_id: articleId,
//         user_id: user.id,
//       })

//       setSaved((p) => ({ ...p, [articleId]: true }))
//     }
//   }

//   const toggleReaction = async (
//     articleId: string,
//     reaction: "like" | "dislike"
//   ) => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()
//     if (!user) return alert("Login required")

//     const current = reactions[articleId]

//     if (current === reaction) {
//       await supabase
//         .from("news_reactions")
//         .delete()
//         .eq("article_id", articleId)
//         .eq("user_id", user.id)

//       setReactions((p) => ({ ...p, [articleId]: null }))
//     } else {
//       await supabase.from("news_reactions").upsert({
//         article_id: articleId,
//         user_id: user.id,
//         reaction,
//       })

//       setReactions((p) => ({ ...p, [articleId]: reaction }))
//     }
//   }

//   const handleShare = async (articleId: string) => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()
//     if (!user) return alert("Login required")

//     await supabase.from("news_shares").upsert({
//       article_id: articleId,
//       user_id: user.id,
//     })

//     setShared((p) => ({ ...p, [articleId]: true }))
//   }

//   /* ================= RENDER ================= */
//   return (
//     <div className="flex h-screen bg-background">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

//         <div className="flex-1 overflow-y-auto">
//           <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
//             <h1 className="text-3xl font-bold text-foreground">
//               News Feed
//             </h1>

//             {articles.map((a) => (
//               <Card key={a.id} className="p-6 bg-card border-border">
//                 <div className="flex gap-6">
//                   <img
//                     src={a.image}
//                     className="w-48 h-40 rounded object-cover"
//                   />

//                   <div className="flex-1">
//                     <h3 className="text-lg font-bold text-foreground">
//                       {a.headline}
//                     </h3>

//                     <p className="text-sm mt-2 text-muted">
//                       {a.summary}
//                     </p>

//                     {expanded[a.id] && (
//                       <p className="mt-3 text-sm whitespace-pre-line">
//                         {a.content}
//                       </p>
//                     )}

//                     <button
//                       className="text-xs mt-2 text-primary"
//                       onClick={() =>
//                         setExpanded((p) => ({
//                           ...p,
//                           [a.id]: !p[a.id],
//                         }))
//                       }
//                     >
//                       {expanded[a.id] ? "Show Less" : "Read More"}
//                     </button>

//                     {/* ACTIONS */}
//                     <div className="flex justify-between mt-4 pt-4 border-t">
//                       <div className="flex gap-4">
//                         <button
//                           onClick={() =>
//                             toggleReaction(a.id, "like")
//                           }
//                         >
//                           <ThumbsUp
//                             className={`w-4 h-4 ${
//                               reactions[a.id] === "like"
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                             fill={
//                               reactions[a.id] === "like"
//                                 ? "currentColor"
//                                 : "none"
//                             }
//                           />
//                         </button>

//                         <button
//                           onClick={() =>
//                             toggleReaction(a.id, "dislike")
//                           }
//                         >
//                           <ThumbsDown
//                             className={`w-4 h-4 ${
//                               reactions[a.id] === "dislike"
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                             fill={
//                               reactions[a.id] === "dislike"
//                                 ? "currentColor"
//                                 : "none"
//                             }
//                           />
//                         </button>

//                         <button
//                           onClick={() =>
//                             setShowComments((p) => ({
//                               ...p,
//                               [a.id]: !p[a.id],
//                             }))
//                           }
//                         >
//                           <MessageCircle
//                             className={`w-4 h-4 ${
//                               showComments[a.id]
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                           />
//                         </button>
//                       </div>

//                       <div className="flex gap-4">
//                         <button onClick={() => toggleSave(a.id)}>
//                           <Bookmark
//                             className={`w-4 h-4 ${
//                               saved[a.id]
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                             fill={
//                               saved[a.id]
//                                 ? "currentColor"
//                                 : "none"
//                             }
//                           />
//                         </button>

//                         <button
//                           onClick={() => handleShare(a.id)}
//                         >
//                           <Share2
//                             className={`w-4 h-4 ${
//                               shared[a.id]
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                             fill={
//                               shared[a.id]
//                                 ? "currentColor"
//                                 : "none"
//                             }
//                           />
//                         </button>
//                       </div>
//                     </div>

//                     {showComments[a.id] && (
//                       <ArticleComments articleId={a.id} />
//                     )}

//                     <p className="text-xs mt-2 text-muted">
//                       {timeAgo(a.published_at)}
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



// "use client"

// import { useEffect, useState } from "react"
// import Header from "@/components/dashboard/header"
// import Sidebar from "@/components/dashboard/sidebar"
// import { Card } from "@/components/ui/card"
// import {
//   Share2,
//   Bookmark,
//   ThumbsUp,
//   ThumbsDown,
//   MessageCircle,
// } from "lucide-react"
// import { supabase } from "@/lib/supabaseClient"
// import NewsComments from "@/components/news-comments/NewsComments"


// /* ================= TYPES ================= */

// type Article = {
//   id: string
//   headline: string
//   summary: string
//   content: string
//   image: string
//   url: string
//   published_at: string
// }

// /* ================= COMPONENT ================= */

// export default function NewsClient({
//   initialArticles,
// }: {
//   initialArticles: Article[]
// }) {
//   /* ================= UI ================= */
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   /* ================= DATA ================= */
//   const [articles] = useState(initialArticles)
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({})
//   const [showComments, setShowComments] =
//     useState<Record<string, boolean>>({})

//   /* ================= USER STATES ================= */
//   const [saved, setSaved] = useState<Record<string, boolean>>({})
//   const [reactions, setReactions] = useState<
//     Record<string, "like" | "dislike" | null>
//   >({})

//   /* ================= HELPERS ================= */
//   const timeAgo = (date: string) => {
//     const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
//     if (s < 60) return "just now"
//     const m = Math.floor(s / 60)
//     if (m < 60) return `${m} min ago`
//     const h = Math.floor(m / 60)
//     if (h < 24) return `${h} hr ago`
//     return `${Math.floor(h / 24)} days ago`
//   }

//   /* ================= LOAD USER DATA ================= */
//   useEffect(() => {
//     const loadUserState = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()
//       if (!user) return

//       /* SAVED */
//       const { data: savedRows } = await supabase
//         .from("news_saved")
//         .select("article_id")
//         .eq("user_id", user.id)

//       setSaved(
//         Object.fromEntries(
//           savedRows?.map((r) => [r.article_id, true]) ?? []
//         )
//       )

//       /* REACTIONS */
//       const { data: reactionRows } = await supabase
//         .from("news_reactions")
//         .select("article_id, reaction")
//         .eq("user_id", user.id)

//       const reactionMap: Record<string, "like" | "dislike"> = {}
//       reactionRows?.forEach(
//         (r) => (reactionMap[r.article_id] = r.reaction)
//       )

//       setReactions(reactionMap)
//     }

//     loadUserState()
//   }, [])

//   /* ================= ACTIONS ================= */

//   const toggleSave = async (articleId: string) => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()
//     if (!user) return

//     if (saved[articleId]) {
//       await supabase
//         .from("news_saved")
//         .delete()
//         .eq("article_id", articleId)
//         .eq("user_id", user.id)

//       setSaved((p) => ({ ...p, [articleId]: false }))
//     } else {
//       await supabase.from("news_saved").insert({
//         article_id: articleId,
//         user_id: user.id,
//       })

//       setSaved((p) => ({ ...p, [articleId]: true }))
//     }
//   }

//   const toggleReaction = async (
//     articleId: string,
//     reaction: "like" | "dislike"
//   ) => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()
//     if (!user) return

//     const current = reactions[articleId]

//     if (current === reaction) {
//       await supabase
//         .from("news_reactions")
//         .delete()
//         .eq("article_id", articleId)
//         .eq("user_id", user.id)

//       setReactions((p) => ({ ...p, [articleId]: null }))
//     } else {
//       await supabase.from("news_reactions").upsert({
//         article_id: articleId,
//         user_id: user.id,
//         reaction,
//       })

//       setReactions((p) => ({ ...p, [articleId]: reaction }))
//     }
//   }

//   /* ================= SHARE (NO SUPABASE) ================= */

//   const handleShare = async (article: Article) => {
//     if (!navigator.share) {
//       window.open(
//         `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//           article.url
//         )}`,
//         "_blank"
//       )
//       return
//     }

//     try {
//       await navigator.share({
//         title: article.headline,
//         text: article.summary,
//         url: article.url,
//       })
//     } catch {
//       // user cancelled — do nothing
//     }
//   }

//   /* ================= RENDER ================= */

//   return (
//     <div className="flex h-screen bg-background">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

//         <div className="flex-1 overflow-y-auto">
//           <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
//             <h1 className="text-3xl font-bold text-foreground">
//               News Feed
//             </h1>

//             {articles.map((a) => (
//               <Card key={a.id} className="p-6 bg-card border-border">
//                 <div className="flex gap-6">
//                   <img
//                     src={a.image}
//                     className="w-48 h-40 rounded object-cover"
//                   />

//                   <div className="flex-1">
//                     <h3 className="text-lg font-bold text-foreground">
//                       {a.headline}
//                     </h3>

//                     <p className="text-sm mt-2 text-muted">
//                       {a.summary}
//                     </p>

//                     {expanded[a.id] && (
//                       <p className="mt-3 text-sm whitespace-pre-line">
//                         {a.content}
//                       </p>
//                     )}

//                     <button
//                       className="text-xs mt-2 text-primary"
//                       onClick={() =>
//                         setExpanded((p) => ({
//                           ...p,
//                           [a.id]: !p[a.id],
//                         }))
//                       }
//                     >
//                       {expanded[a.id] ? "Show Less" : "Read More"}
//                     </button>

//                     {/* ACTIONS */}
//                     <div className="flex justify-between mt-4 pt-4 border-t">
//                       <div className="flex gap-4">
//                         <button
//                           onClick={() => toggleReaction(a.id, "like")}
//                         >
//                           <ThumbsUp
//                             className={`w-4 h-4 ${
//                               reactions[a.id] === "like"
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                             fill={
//                               reactions[a.id] === "like"
//                                 ? "currentColor"
//                                 : "none"
//                             }
//                           />
//                         </button>

//                         <button
//                           onClick={() =>
//                             toggleReaction(a.id, "dislike")
//                           }
//                         >
//                           <ThumbsDown
//                             className={`w-4 h-4 ${
//                               reactions[a.id] === "dislike"
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                             fill={
//                               reactions[a.id] === "dislike"
//                                 ? "currentColor"
//                                 : "none"
//                             }
//                           />
//                         </button>

//                         <button
//                           onClick={() =>
//                             setShowComments((p) => ({
//                               ...p,
//                               [a.id]: !p[a.id],
//                             }))
//                           }
//                         >
//                           <MessageCircle
//                             className={`w-4 h-4 ${
//                               showComments[a.id]
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                           />
//                         </button>
//                       </div>

//                       <div className="flex gap-4">
//                         <button onClick={() => toggleSave(a.id)}>
//                           <Bookmark
//                             className={`w-4 h-4 ${
//                               saved[a.id]
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                             fill={
//                               saved[a.id]
//                                 ? "currentColor"
//                                 : "none"
//                             }
//                           />
//                         </button>

//                         <button onClick={() => handleShare(a)}>
//                           <Share2 className="w-4 h-4 icon-default hover:text-primary" />
//                         </button>
//                       </div>
//                     </div>

//                     {showComments[a.id] && (
//                       <NewsComments articleId={a.id} />
//                     )}

//                     <p className="text-xs mt-2 text-muted">
//                       {timeAgo(a.published_at)}
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }







// "use client"

// import { useEffect, useState } from "react"
// import Header from "@/components/dashboard/header"
// import Sidebar from "@/components/dashboard/sidebar"
// import { Card } from "@/components/ui/card"
// import {
//   Share2,
//   Bookmark,
//   ThumbsUp,
//   ThumbsDown,
//   MessageCircle,
// } from "lucide-react"
// import { supabase } from "@/lib/supabaseClient"
// import NewsComments from "@/components/news-comments/NewsComments"

// /* ================= TYPES ================= */

// type Article = {
//   id: string
//   headline: string
//   summary: string
//   content: string
//   image: string
//   url: string
//   published_at: string
// }

// /* ================= COMPONENT ================= */

// export default function NewsClient({
//   initialArticles,
// }: {
//   initialArticles: Article[]
// }) {
//   /* ================= UI ================= */
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   /* ================= DATA ================= */
//   const [articles] = useState(initialArticles)
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({})
//   const [showComments, setShowComments] =
//     useState<Record<string, boolean>>({})

//   /* ================= USER STATES ================= */
//   const [saved, setSaved] = useState<Record<string, boolean>>({})
//   const [reactions, setReactions] = useState<
//     Record<string, "like" | "dislike" | null>
//   >({})

//   /* ================= HELPERS ================= */
//   const timeAgo = (date: string) => {
//     const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
//     if (s < 60) return "just now"
//     const m = Math.floor(s / 60)
//     if (m < 60) return `${m} min ago`
//     const h = Math.floor(m / 60)
//     if (h < 24) return `${h} hr ago`
//     return `${Math.floor(h / 24)} days ago`
//   }

//   /* ================= LOAD USER DATA ================= */
//   useEffect(() => {
//     const loadUserState = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()
//       if (!user) return

//       /* SAVED */
//       const { data: savedRows } = await supabase
//         .from("news_saved")
//         .select("article_id")
//         .eq("user_id", user.id)

//       setSaved(
//         Object.fromEntries(
//           savedRows?.map((r) => [r.article_id, true]) ?? []
//         )
//       )

//       /* REACTIONS */
//       const { data: reactionRows } = await supabase
//         .from("news_reactions")
//         .select("article_id, reaction")
//         .eq("user_id", user.id)

//       const reactionMap: Record<string, "like" | "dislike"> = {}
//       reactionRows?.forEach(
//         (r) => (reactionMap[r.article_id] = r.reaction)
//       )

//       setReactions(reactionMap)
//     }

//     loadUserState()
//   }, [])

//   /* ================= ACTIONS ================= */

//   const toggleSave = async (articleId: string) => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()
//     if (!user) return

//     if (saved[articleId]) {
//       await supabase
//         .from("news_saved")
//         .delete()
//         .eq("article_id", articleId)
//         .eq("user_id", user.id)

//       setSaved((p) => ({ ...p, [articleId]: false }))
//     } else {
//       await supabase.from("news_saved").insert({
//         article_id: articleId,
//         user_id: user.id,
//       })

//       setSaved((p) => ({ ...p, [articleId]: true }))
//     }
//   }

//   const toggleReaction = async (
//     articleId: string,
//     reaction: "like" | "dislike"
//   ) => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()
//     if (!user) return

//     const current = reactions[articleId]

//     if (current === reaction) {
//       await supabase
//         .from("news_reactions")
//         .delete()
//         .eq("article_id", articleId)
//         .eq("user_id", user.id)

//       setReactions((p) => ({ ...p, [articleId]: null }))
//     } else {
//       await supabase.from("news_reactions").upsert({
//         article_id: articleId,
//         user_id: user.id,
//         reaction,
//       })

//       setReactions((p) => ({ ...p, [articleId]: reaction }))
//     }
//   }

//   /* ================= SHARE ================= */

//   const handleShare = async (article: Article) => {
//     if (!navigator.share) {
//       window.open(
//         `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//           article.url
//         )}`,
//         "_blank"
//       )
//       return
//     }

//     try {
//       await navigator.share({
//         title: article.headline,
//         text: article.summary,
//         url: article.url,
//       })
//     } catch {
//       /* user cancelled */
//     }
//   }

//   /* ================= RENDER ================= */

//   return (
//     <div className="flex h-screen bg-background">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

//         <div className="flex-1 overflow-y-auto">
//           <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
//             <h1 className="text-3xl font-bold text-foreground">
//               News Feed
//             </h1>

//             {articles.map((a) => (
//               <Card key={a.id} className="p-6 bg-card border-border">
//                 <div className="flex gap-6">
//                   <img
//                     src={a.image}
//                     className="w-48 h-40 rounded object-cover"
//                     alt={a.headline}
//                   />

//                   <div className="flex-1">
//                     <h3 className="text-lg font-bold text-foreground">
//                       {a.headline}
//                     </h3>

//                     <p className="text-sm mt-2 text-muted">
//                       {a.summary}
//                     </p>

//                     {expanded[a.id] && (
//                       <p className="mt-3 text-sm whitespace-pre-line">
//                         {a.content}
//                       </p>
//                     )}

//                     <button
//                       className="text-xs mt-2 text-primary"
//                       onClick={() =>
//                         setExpanded((p) => ({
//                           ...p,
//                           [a.id]: !p[a.id],
//                         }))
//                       }
//                     >
//                       {expanded[a.id] ? "Show Less" : "Read More"}
//                     </button>

//                     {/* ✅ PUBLISHED DATE (FIXED POSITION) */}
//                     <p className="text-xs mt-3 text-muted">
//                       {timeAgo(a.published_at)}
//                     </p>

//                     {/* ACTIONS */}
//                     <div className="flex justify-between mt-4 pt-4 border-t">
//                       <div className="flex gap-4">
//                         <button onClick={() => toggleReaction(a.id, "like")}>
//                           <ThumbsUp
//                             className={`w-4 h-4 ${
//                               reactions[a.id] === "like"
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                             fill={
//                               reactions[a.id] === "like"
//                                 ? "currentColor"
//                                 : "none"
//                             }
//                           />
//                         </button>

//                         <button
//                           onClick={() =>
//                             toggleReaction(a.id, "dislike")
//                           }
//                         >
//                           <ThumbsDown
//                             className={`w-4 h-4 ${
//                               reactions[a.id] === "dislike"
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                             fill={
//                               reactions[a.id] === "dislike"
//                                 ? "currentColor"
//                                 : "none"
//                             }
//                           />
//                         </button>

//                         <button
//                           onClick={() =>
//                             setShowComments((p) => ({
//                               ...p,
//                               [a.id]: !p[a.id],
//                             }))
//                           }
//                         >
//                           <MessageCircle
//                             className={`w-4 h-4 ${
//                               showComments[a.id]
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                           />
//                         </button>
//                       </div>

//                       <div className="flex gap-4">
//                         <button onClick={() => toggleSave(a.id)}>
//                           <Bookmark
//                             className={`w-4 h-4 ${
//                               saved[a.id]
//                                 ? "icon-active"
//                                 : "icon-default"
//                             }`}
//                             fill={
//                               saved[a.id]
//                                 ? "currentColor"
//                                 : "none"
//                             }
//                           />
//                         </button>

//                         <button onClick={() => handleShare(a)}>
//                           <Share2 className="w-4 h-4 icon-default hover:text-primary" />
//                         </button>
//                       </div>
//                     </div>

//                     {/* ✅ COMMENTS (MOUNTED ONCE – FIXED) */}
//                     <div
//                       className={
//                         showComments[a.id] ? "mt-4" : "hidden"
//                       }
//                     >
//                       <NewsComments articleId={a.id} />
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




"use client"

import { useEffect, useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import {
  Share2,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
} from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import NewsComments from "@/components/news-comments/NewsComments"

/* ================= TYPES ================= */

type Article = {
  id: string
  headline: string
  summary: string
  content: string
  image: string
  url: string
  published_at: string
}

/* ================= COMPONENT ================= */

export default function NewsClient({
  initialArticles,
}: {
  initialArticles: Article[]
}) {
  /* ================= UI ================= */
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /* ================= DATA ================= */
  const [articles] = useState(initialArticles)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [showComments, setShowComments] =
    useState<Record<string, boolean>>({})

  /* ================= COUNTS ================= */
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({})
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({})

  /* ================= USER STATES ================= */
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [reactions, setReactions] = useState<
    Record<string, "like" | "dislike" | null>
  >({})

  /* ================= HELPERS ================= */
  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return "just now"
    const m = Math.floor(s / 60)
    if (m < 60) return `${m} min ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h} hr ago`
    return `${Math.floor(h / 24)} days ago`
  }

  /* ================= LOAD USER + COUNTS ================= */
  useEffect(() => {
    const loadInitial = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      /* SAVED */
      const { data: savedRows } = await supabase
        .from("news_saved")
        .select("article_id")
        .eq("user_id", user.id)

      setSaved(
        Object.fromEntries(
          savedRows?.map((r) => [r.article_id, true]) ?? []
        )
      )

      /* USER REACTIONS */
      const { data: reactionRows } = await supabase
        .from("news_reactions")
        .select("article_id, reaction")
        .eq("user_id", user.id)

      const reactionMap: Record<string, "like" | "dislike"> = {}
      reactionRows?.forEach(
        (r) => (reactionMap[r.article_id] = r.reaction)
      )
      setReactions(reactionMap)

      /* LIKE COUNTS */
      const { data: likeRows } = await supabase
        .from("news_reactions")
        .select("article_id")

      const likeMap: Record<string, number> = {}
      likeRows?.forEach((r) => {
        likeMap[r.article_id] = (likeMap[r.article_id] || 0) + 1
      })
      setLikeCounts(likeMap)

      /* COMMENT COUNTS (includes replies) */
      const { data: commentRows } = await supabase
        .from("news_comments")
        .select("article_id")

      const commentMap: Record<string, number> = {}
      commentRows?.forEach((r) => {
        commentMap[r.article_id] =
          (commentMap[r.article_id] || 0) + 1
      })
      setCommentCounts(commentMap)
    }

    loadInitial()
  }, [])

  /* ================= ACTIONS ================= */

  const toggleSave = async (articleId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    if (saved[articleId]) {
      await supabase
        .from("news_saved")
        .delete()
        .eq("article_id", articleId)
        .eq("user_id", user.id)

      setSaved((p) => ({ ...p, [articleId]: false }))
    } else {
      await supabase.from("news_saved").insert({
        article_id: articleId,
        user_id: user.id,
      })

      setSaved((p) => ({ ...p, [articleId]: true }))
    }
  }

  const toggleReaction = async (
    articleId: string,
    reaction: "like" | "dislike"
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const current = reactions[articleId]

    if (current === reaction) {
      await supabase
        .from("news_reactions")
        .delete()
        .eq("article_id", articleId)
        .eq("user_id", user.id)

      setReactions((p) => ({ ...p, [articleId]: null }))
      setLikeCounts((p) => ({
        ...p,
        [articleId]: Math.max((p[articleId] || 1) - 1, 0),
      }))
    } else {
      await supabase.from("news_reactions").upsert({
        article_id: articleId,
        user_id: user.id,
        reaction,
      })

      setReactions((p) => ({ ...p, [articleId]: reaction }))
      if (reaction === "like") {
        setLikeCounts((p) => ({
          ...p,
          [articleId]: (p[articleId] || 0) + 1,
        }))
      }
    }
  }

  /* ================= SHARE ================= */

  const handleShare = async (article: Article) => {
    if (!navigator.share) {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          article.url
        )}`,
        "_blank"
      )
      return
    }

    try {
      await navigator.share({
        title: article.headline,
        text: article.summary,
        url: article.url,
      })
    } catch {}
  }

  /* ================= RENDER ================= */

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <h1 className="text-3xl font-bold text-foreground">News Feed</h1>

            {articles.map((a) => (
              <Card key={a.id} className="p-6 bg-card border-border">
                <div className="flex gap-6">
                  <img
                    src={a.image}
                    className="w-48 h-40 rounded object-cover"
                    alt={a.headline}
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{a.headline}</h3>

                    <p className="text-sm mt-2 text-muted">{a.summary}</p>

                    {expanded[a.id] && (
                      <p className="mt-3 text-sm whitespace-pre-line">
                        {a.content}
                      </p>
                    )}

                    <button
                      className="text-xs mt-2 text-primary"
                      onClick={() =>
                        setExpanded((p) => ({
                          ...p,
                          [a.id]: !p[a.id],
                        }))
                      }
                    >
                      {expanded[a.id] ? "Show Less" : "Read More"}
                    </button>

                    <p className="text-xs mt-3 text-muted">
                      {timeAgo(a.published_at)}
                    </p>

                    {/* ACTIONS */}
                    <div className="flex justify-between mt-4 pt-4 border-t">
                      <div className="flex gap-4">
                        <button
                          onClick={() => toggleReaction(a.id, "like")}
                          className="flex items-center gap-1"
                        >
                          <ThumbsUp
                            className={`w-4 h-4 ${
                              reactions[a.id] === "like"
                                ? "icon-active"
                                : "icon-default"
                            }`}
                          />
                          <span className="text-xs text-muted">
                            {likeCounts[a.id] || 0}
                          </span>
                        </button>

                        <button
                          onClick={() =>
                            setShowComments((p) => ({
                              ...p,
                              [a.id]: !p[a.id],
                            }))
                          }
                          className="flex items-center gap-1"
                        >
                          <MessageCircle
                            className={`w-4 h-4 ${
                              showComments[a.id]
                                ? "icon-active"
                                : "icon-default"
                            }`}
                          />
                          <span className="text-xs text-muted">
                            {commentCounts[a.id] || 0}
                          </span>
                        </button>
                      </div>

                      <div className="flex gap-4">
                        <button onClick={() => toggleSave(a.id)}>
                          <Bookmark
                            className={`w-4 h-4 ${
                              saved[a.id]
                                ? "icon-active"
                                : "icon-default"
                            }`}
                          />
                        </button>

                        <button onClick={() => handleShare(a)}>
                          <Share2 className="w-4 h-4 icon-default" />
                        </button>
                      </div>
                    </div>

                    {/* COMMENTS */}
                    {showComments[a.id] && (
                      <div className="mt-4">
                        <NewsComments
                          articleId={a.id}
                          onNewComment={() =>
                            setCommentCounts((p) => ({
                              ...p,
                              [a.id]: (p[a.id] || 0) + 1,
                            }))
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
