









"use client"

import React, { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { ThumbsUp, Send } from "lucide-react"

/* ---------------- types ---------------- */

export type ArgumentNode = {
  id: string
  content: string
  author: string
  avatar?: string
  upvotes: number
  replies?: number
  team: "for" | "against"
  children: ArgumentNode[]
  timestamp?: string
  first_name?: string
  last_name?: string
}

/* ---------------- helpers ---------------- */

function getInitials(name?: string | null) {
  if (!name) return "??"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function avatarIsUrl(v?: string | null) {
  if (!v) return false
  return /^https?:\/\//i.test(v) || v.startsWith("data:")
}

/* ---------------- component ---------------- */

export default function DebateKeyArguments({
  loading = false,
  threadedArgumentsFor = [],
  threadedArgumentsAgainst = [],
  onReplyClick,
  onLike,
  likingIds = [],
}: {
  loading?: boolean
  threadedArgumentsFor?: ArgumentNode[]
  threadedArgumentsAgainst?: ArgumentNode[]
  onReplyClick?: (arg: ArgumentNode, content?: string) => void
  onLike?: (id: string) => void
  likingIds?: string[]
}) {
  const threadedArguments = useMemo(
    () => [...threadedArgumentsFor, ...threadedArgumentsAgainst],
    [threadedArgumentsFor, threadedArgumentsAgainst]
  )

  const flatten = (nodes: ArgumentNode[]): ArgumentNode[] => {
    const res: ArgumentNode[] = []
    const walk = (list: ArgumentNode[]) => {
      list.forEach((n) => {
        res.push(n)
        if (n.children?.length) walk(n.children)
      })
    }
    walk(nodes)
    return res
  }

  const flat = useMemo(() => flatten(threadedArguments), [threadedArguments])

  const support = flat.filter((a) => a.team === "for")
  const against = flat.filter((a) => a.team === "against")

  const supportLikes = support.reduce((s, a) => s + (a.upvotes ?? 0), 0)
  const againstLikes = against.reduce((s, a) => s + (a.upvotes ?? 0), 0)
  const total = supportLikes + againstLikes || 1

  const supportPct = Math.round((supportLikes / total) * 100)
  const againstPct = 100 - supportPct

  if (loading) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-2xl font-bold">Key Arguments ⚔️ Battle Mode</h2>
        <p className="text-xs text-muted">Loading arguments…</p>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden p-6 mb-8 bg-background border border-border shadow-md">
      {/* Arena background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-arena-support" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-arena-against" />
      </div>

      {/* Divider */}
      <div className="hidden md:block absolute inset-y-4 left-1/2 -translate-x-1/2 w-[2px] bg-divider opacity-60" />

      {/* VS badge */}
      <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 rounded-full bg-vs text-vs-text font-black text-3xl items-center justify-center shadow-lg">
        VS
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-4">
        <h2 className="text-3xl font-bold text-foreground">
          Key Arguments ⚔️ Battle Mode
        </h2>
        <p className="text-xs text-muted">
          Reply to specific points — not randomly
        </p>
      </div>

      {/* Power bar */}
      <div className="relative z-10 mb-6">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-primary">Support {supportPct}%</span>
          <span className="text-muted-light">Against {againstPct}%</span>
        </div>

        <div className="flex h-3 rounded bg-powerbar overflow-hidden">
          <div className="bg-support" style={{ width: `${supportPct}%` }} />
          <div className="bg-against" style={{ width: `${againstPct}%` }} />
        </div>
      </div>

      {/* Threads */}
      <div className="relative z-10 space-y-6">
        {threadedArguments.length === 0 ? (
          <p className="text-center text-sm text-muted">
            No arguments yet. Be the first to start.
          </p>
        ) : (
          threadedArguments.map((root) => (
            <ThreadChain
              key={root.id}
              node={root}
              depth={0}
              onReplyClick={onReplyClick}
              onLike={onLike}
              likingIds={likingIds}
            />
          ))
        )}
      </div>
    </Card>
  )
}

/* ---------------- thread ---------------- */

function ThreadChain({
  node,
  depth,
  onReplyClick,
  onLike,
  likingIds,
}: {
  node: ArgumentNode
  depth: number
  onReplyClick?: (arg: ArgumentNode, content?: string) => void
  onLike?: (id: string) => void
  likingIds: string[]
}) {
  return (
    <div className={depth ? "ml-6" : ""}>
      <ArgumentBubble
        arg={node}
        onReplyClick={onReplyClick}
        onLike={onLike}
        likingIds={likingIds}
      />
      {node.children?.length > 0 && (
        <div className="mt-3 space-y-3">
          {node.children.map((c) => (
            <ThreadChain
              key={c.id}
              node={c}
              depth={depth + 1}
              onReplyClick={onReplyClick}
              onLike={onLike}
              likingIds={likingIds}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------------- bubble ---------------- */

function ArgumentBubble({
  arg,
  onReplyClick,
  onLike,
  likingIds,
}: {
  arg: ArgumentNode
  onReplyClick?: (arg: ArgumentNode, content?: string) => void
  onLike?: (id: string) => void
  likingIds: string[]
}) {
  const isSupport = arg.team === "for"
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")

  const avatar = arg.avatar
  const showImg = avatarIsUrl(avatar)

  return (
    <div className={`flex ${isSupport ? "justify-start" : "justify-end"}`}>
      <div className="max-w-[40%] bg-bubble border border-bubble rounded-2xl p-3 shadow-md">
        <div className="flex gap-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-avatar-neutral text-foreground font-semibold">
            {showImg ? (
              <img src={avatar} className="w-9 h-9 rounded-full" />
            ) : (
              getInitials(
                arg.first_name && arg.last_name
                  ? `${arg.first_name} ${arg.last_name}`
                  : arg.author
              )
            )}
          </div>

          <div className="flex-1">
            <div className="text-xs font-semibold">{arg.author}</div>
            <p className="text-sm mt-1">{arg.content}</p>

            {open && (
              <div className="mt-2">
                <textarea
                  className="w-full border border-border rounded p-2 text-sm"
                  rows={2}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-end mt-1">
                  <button
                    className="btn-primary text-xs px-3 py-1 rounded"
                    onClick={() => {
                      if (!text.trim()) return
                      onReplyClick?.(arg, text)
                      setText("")
                      setOpen(false)
                    }}
                  >
                    <Send className="w-3 h-3 inline mr-1" />
                    Reply
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-2 text-xs">
              <button
                onClick={() => onLike?.(arg.id)}
                disabled={likingIds.includes(arg.id)}
                className="flex items-center gap-1 text-muted hover:text-foreground disabled:text-muted-light"
              >
                <ThumbsUp className="w-3 h-3" />
                {arg.upvotes ?? 0}
              </button>

              <button onClick={() => setOpen((p) => !p)}>↩ Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
