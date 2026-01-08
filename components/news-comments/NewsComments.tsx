





"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Heart, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

/* ================= TYPES ================= */

type User = {
  id: string
  username: string
  first_name: string | null
  last_name: string | null
}

type NewsComment = {
  id: string
  article_id: string
  user_id: string
  parent_id: string | null
  comment: string
  created_at: string
  user: User
}

/* ================= HELPERS ================= */

function buildTree(rows: NewsComment[]) {
  const map: Record<string, any> = {}
  const roots: any[] = []

  rows.forEach((r) => (map[r.id] = { ...r, children: [] }))
  rows.forEach((r) => {
    if (r.parent_id && map[r.parent_id]) {
      map[r.parent_id].children.push(map[r.id])
    } else {
      roots.push(map[r.id])
    }
  })

  return roots
}

function autoGrow(e: React.FormEvent<HTMLTextAreaElement>) {
  const el = e.currentTarget
  el.style.height = "auto"
  el.style.height = `${el.scrollHeight}px`
}

function getAvatarInitials(user: User) {
  const f = user.first_name?.trim()?.charAt(0)?.toUpperCase()
  const l = user.last_name?.trim()?.charAt(0)?.toUpperCase()
  if (f || l) return `${f ?? ""}${l ?? ""}`
  return user.username.slice(0, 2).toUpperCase()
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700">
      {initials}
    </div>
  )
}

/* ================= COMPONENT ================= */

export default function NewsComments({ articleId }: { articleId: string }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [comments, setComments] = useState<NewsComment[]>([])
  const [commentText, setCommentText] = useState("")
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [replyOpen, setReplyOpen] = useState<Record<string, boolean>>({})
  const [likes, setLikes] = useState<Record<string, number>>({})
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  

  /* ================= LOAD USER ================= */

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) return

      const { data: userRow } = await supabase
        .from("users")
        .select("id, username, first_name, last_name")
        .eq("id", data.user.id)
        .single()

      if (userRow) setCurrentUser(userRow)
    }

    loadUser()
  }, [])

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!currentUser) return

    const fetchAll = async () => {
      const { data: commentRows } = await supabase
        .from("news_comments")
        .select("*")
        .eq("article_id", articleId)
        .order("created_at")

      if (!commentRows) return

      const userIds = [...new Set(commentRows.map((c) => c.user_id))]

      const { data: users } = await supabase
        .from("users")
        .select("id, username, first_name, last_name")
        .in("id", userIds)

      const userMap: Record<string, User> = {}
      users?.forEach((u) => (userMap[u.id] = u))

      setComments(
        commentRows.map((c) => ({
          ...c,
          user: userMap[c.user_id],
        }))
      )

      const { data: likesRows } = await supabase
        .from("news_comment_likes")
        .select("comment_id, user_id")

      const likeMap: Record<string, number> = {}
      const likedMap: Record<string, boolean> = {}

      likesRows?.forEach((l) => {
        likeMap[l.comment_id] = (likeMap[l.comment_id] || 0) + 1
        if (l.user_id === currentUser.id) likedMap[l.comment_id] = true
      })

      setLikes(likeMap)
      setLiked(likedMap)
    }

    fetchAll()
  }, [currentUser, articleId])

  const tree = useMemo(() => buildTree(comments), [comments])



  const postComment = async (parentId?: string) => {
  if (!currentUser) return

  const text = parentId ? replyText[parentId] : commentText
  if (!text.trim()) return

  const { data, error } = await supabase
    .from("news_comments")
    .insert({
      article_id: articleId,
      parent_id: parentId ?? null,
      user_id: currentUser.id,
      comment: text,
    })
    .select()
    .single()

  if (error || !data) return

  setComments((prev) => [
    ...prev,
    {
      ...(data as any),
      user: currentUser,
    },
  ])

  if (parentId) {
    setReplyText((p) => ({ ...p, [parentId]: "" }))
  } else {
    setCommentText("")
  }
}


  /* ================= ACTIONS ================= */

  const deleteItem = async (id: string) => {
    await supabase.from("news_comments").delete().eq("id", id)
    setComments((p) => p.filter((c) => c.id !== id))
  }

  const saveEdit = async (id: string) => {
    await supabase
      .from("news_comments")
      .update({ comment: editText })
      .eq("id", id)

    setComments((p) =>
      p.map((c) => (c.id === id ? { ...c, comment: editText } : c))
    )

    setEditingId(null)
    setEditText("")
  }

  const toggleLike = async (id: string) => {
    if (!currentUser) return

    if (liked[id]) {
      await supabase
        .from("news_comment_likes")
        .delete()
        .eq("comment_id", id)
        .eq("user_id", currentUser.id)

      setLiked((p) => ({ ...p, [id]: false }))
      setLikes((p) => ({ ...p, [id]: p[id] - 1 }))
    } else {
      await supabase
        .from("news_comment_likes")
        .insert({ comment_id: id, user_id: currentUser.id })

      setLiked((p) => ({ ...p, [id]: true }))
      setLikes((p) => ({ ...p, [id]: (p[id] || 0) + 1 }))
    }
  }

  /* ================= RENDER ================= */

  const renderNode = (c: any, depth = 0) => (
    <div key={c.id} style={{ marginLeft: depth * 32 }} className="space-y-3">
      <div className="flex gap-3">
        <Avatar initials={getAvatarInitials(c.user)} />

        <div className="flex-1 rounded-xl border px-4 py-3">
          <div className="flex justify-between">
            <p className="text-sm font-semibold">{c.user.username}</p>

            {c.user.id === currentUser?.id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 rounded hover:bg-muted">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setEditingId(c.id)
                      setEditText(c.comment)
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => deleteItem(c.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {editingId === c.id ? (
            <>
              <textarea
                rows={1}
                onInput={autoGrow}
                className="w-full border rounded mt-2 p-2 text-sm resize-none overflow-hidden"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <Button className={navyBtn} size="sm" onClick={() => saveEdit(c.id)}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm">{c.comment}</p>
          )}

          {/* LIKE ONLY FOR PARENT COMMENTS */}
          {!c.parent_id && (
            <div className="flex gap-4 mt-3 text-xs">
              <button
                onClick={() => toggleLike(c.id)}
                className="flex items-center gap-1"
              >
                <Heart
                  className="w-3.5 h-3.5"
                  fill={liked[c.id] ? "currentColor" : "none"}
                />
                {likes[c.id] || 0}
              </button>

              <button
                onClick={() =>
                  setReplyOpen((p) => ({ ...p, [c.id]: !p[c.id] }))
                }
              >
                Reply
              </button>
            </div>
          )}

          {replyOpen[c.id] && (
            <div className="mt-3 flex gap-2">
              <textarea
                rows={1}
                onInput={autoGrow}
                className="flex-1 border rounded p-2 text-xs resize-none overflow-hidden"
                value={replyText[c.id] || ""}
                onChange={(e) =>
                  setReplyText((p) => ({ ...p, [c.id]: e.target.value }))
                }
              />
              <Button
              size="sm"
              className="btn-primary"
              onClick={() => postComment(c.id)}
               >
               Reply
             </Button>
            </div>
          )}
        </div>
      </div>

      {c.children?.map((ch: any) => renderNode(ch, depth + 1))}
    </div>
  )

  if (!currentUser)
    return <p className="text-sm mt-4">Please login to comment.</p>

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <textarea
          rows={1}
          onInput={autoGrow}
          className="flex-1 border rounded px-3 py-2 resize-none overflow-hidden"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
       <Button
        className="btn-primary"
        disabled={!commentText.trim()}
        onClick={() => postComment()}
         >
        Post
        </Button>

      </div>

      {tree.map((c) => renderNode(c))}
    </div>
  )
}
