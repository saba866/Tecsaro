






"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

/* ================= TYPES ================= */

export interface User {
  id: string
  username: string
  first_name: string
  last_name: string | null
  avatar: string | null
}

export interface Comment {
  id: number
  case_study_id: number
  content: string
  created_at: string
  user_id: string
  user: User
}

export interface Reply {
  id: number
  comment_id: number
  content: string
  created_at: string
  user_id: string
  user: User
}

/* ================= HELPERS ================= */

function normalizeUser(user: any): User {
  if (Array.isArray(user)) return user[0]
  return user
}

/* ================= HOOK ================= */

export function useCaseStudyComments() {
  const [userId, setUserId] = useState<string | null>(null)

  const [commentCounts, setCommentCounts] =
    useState<Record<number, number>>({})

  const [commentsByCaseStudy, setCommentsByCaseStudy] =
    useState<Record<number, Comment[]>>({})

  const [repliesByComment, setRepliesByComment] =
    useState<Record<number, Reply[]>>({})

  const [openComments, setOpenComments] =
    useState<Record<number, boolean>>({})

  const [commentTextByCaseStudy, setCommentTextByCaseStudy] =
    useState<Record<number, string>>({})

  const [replyBoxOpen, setReplyBoxOpen] =
    useState<Record<number, boolean>>({})

  const [replyTextByComment, setReplyTextByComment] =
    useState<Record<number, string>>({})

  const [commentLikesByComment, setCommentLikesByComment] =
    useState<Record<number, number>>({})

  const [userCommentLiked, setUserCommentLiked] =
    useState<Record<number, boolean>>({})

  /* ================= AUTH ================= */

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null)
    })
  }, [])

  /* ================= LOAD COMMENTS ================= */

  const toggleCommentsSection = async (caseStudyId: number) => {
    const isOpen = openComments[caseStudyId]

    setOpenComments((p) => ({ ...p, [caseStudyId]: !isOpen }))
    if (isOpen || commentsByCaseStudy[caseStudyId]) return

    const { data: comments, error } = await supabase
      .from("case_study_comments")
      .select(`
        id,
        case_study_id,
        content,
        created_at,
        user_id,
        user:users (
          id,
          username,
          first_name,
          last_name,
          avatar
        ),
        case_study_comment_likes (
          user_id
        )
      `)
      .eq("case_study_id", caseStudyId)
      .order("created_at", { ascending: true })

    if (error || !comments) {
      console.error(error)
      return
    }

    const likesCountMap: Record<number, number> = {}
    const likedMap: Record<number, boolean> = {}

    const normalizedComments: Comment[] = comments.map((c: any) => {
      likesCountMap[c.id] = c.case_study_comment_likes.length
      likedMap[c.id] = c.case_study_comment_likes.some(
        (l: any) => l.user_id === userId
      )

      return {
        ...c,
        user: normalizeUser(c.user),
      }
    })

    setCommentsByCaseStudy((p) => ({
      ...p,
      [caseStudyId]: normalizedComments,
    }))

    setCommentLikesByComment((p) => ({ ...p, ...likesCountMap }))
    setUserCommentLiked((p) => ({ ...p, ...likedMap }))

    setCommentCounts((p) => ({
      ...p,
      [caseStudyId]: normalizedComments.length,
    }))

    /* ---------- LOAD REPLIES ---------- */

    const commentIds = normalizedComments.map((c) => c.id)
    if (!commentIds.length) return

    const { data: replies } = await supabase
      .from("case_study_comment_replies")
      .select(`
        id,
        comment_id,
        content,
        created_at,
        user_id,
        user:users (
          id,
          username,
          first_name,
          last_name,
          avatar
        )
      `)
      .in("comment_id", commentIds)
      .order("created_at", { ascending: true })

    const grouped: Record<number, Reply[]> = {}

    replies?.forEach((r: any) => {
      const reply: Reply = {
        ...r,
        user: normalizeUser(r.user),
      }
      grouped[reply.comment_id] ||= []
      grouped[reply.comment_id].push(reply)
    })

    setRepliesByComment(grouped)
  }

  /* ================= CREATE COMMENT ================= */

  const handleSubmitComment = async (caseStudyId: number) => {
    if (!userId) return alert("Login required")

    const text = commentTextByCaseStudy[caseStudyId]?.trim()
    if (!text) return

    const { data, error } = await supabase
      .from("case_study_comments")
      .insert({
        case_study_id: caseStudyId,
        user_id: userId,
        content: text,
      })
      .select(`
        id,
        case_study_id,
        content,
        created_at,
        user_id,
        user:users (
          id,
          username,
          first_name,
          last_name,
          avatar
        )
      `)
      .single()

    if (error || !data) return console.error(error)

    const comment: Comment = {
      ...data,
      user: normalizeUser(data.user),
    }

    setCommentsByCaseStudy((p) => ({
      ...p,
      [caseStudyId]: [...(p[caseStudyId] ?? []), comment],
    }))

    setCommentCounts((p) => ({
      ...p,
      [caseStudyId]: (p[caseStudyId] ?? 0) + 1,
    }))

    setCommentTextByCaseStudy((p) => ({ ...p, [caseStudyId]: "" }))
  }

  /* ================= CREATE REPLY ================= */

  const handleSubmitReply = async (
    caseStudyId: number,
    commentId: number
  ) => {
    if (!userId) return alert("Login required")

    const text = replyTextByComment[commentId]?.trim()
    if (!text) return

    const { data, error } = await supabase
      .from("case_study_comment_replies")
      .insert({
        comment_id: commentId,
        user_id: userId,
        content: text,
      })
      .select(`
        id,
        comment_id,
        content,
        created_at,
        user_id,
        user:users (
          id,
          username,
          first_name,
          last_name,
          avatar
        )
      `)
      .single()

    if (error || !data) return console.error(error)

    const reply: Reply = {
      ...data,
      user: normalizeUser(data.user),
    }

    setRepliesByComment((p) => ({
      ...p,
      [commentId]: [...(p[commentId] ?? []), reply],
    }))

    setCommentCounts((p) => ({
      ...p,
      [caseStudyId]: (p[caseStudyId] ?? 0) + 1,
    }))

    setReplyTextByComment((p) => ({ ...p, [commentId]: "" }))
    setReplyBoxOpen({})
  }

  
  const handleEditComment = async (
    comment: Comment,
    newContent: string
  ) => {
    await supabase
      .from("case_study_comments")
      .update({ content: newContent })
      .eq("id", comment.id)

    setCommentsByCaseStudy((p) => ({
      ...p,
      [comment.case_study_id]: p[comment.case_study_id].map((c) =>
        c.id === comment.id ? { ...c, content: newContent } : c
      ),
    }))
  }

  const handleEditReply = async (
    reply: Reply,
    newContent: string
  ) => {
    await supabase
      .from("case_study_comment_replies")
      .update({ content: newContent })
      .eq("id", reply.id)

    setRepliesByComment((p) => ({
      ...p,
      [reply.comment_id]: p[reply.comment_id].map((r) =>
        r.id === reply.id ? { ...r, content: newContent } : r
      ),
    }))
  }

  /* ================= DELETE ================= */

  const handleDeleteComment = async (comment: Comment) => {
    await supabase
      .from("case_study_comments")
      .delete()
      .eq("id", comment.id)

    setCommentsByCaseStudy((p) => ({
      ...p,
      [comment.case_study_id]: p[comment.case_study_id].filter(
        (c) => c.id !== comment.id
      ),
    }))

    setRepliesByComment((p) => {
      const copy = { ...p }
      delete copy[comment.id]
      return copy
    })
  }

  const handleDeleteReply = async (reply: Reply) => {
    await supabase
      .from("case_study_comment_replies")
      .delete()
      .eq("id", reply.id)

    setRepliesByComment((p) => ({
      ...p,
      [reply.comment_id]: p[reply.comment_id].filter(
        (r) => r.id !== reply.id
      ),
    }))
  }

  /* ================= LIKE COMMENT ================= */
const handleLikeComment = async (commentId: number) => {
  if (!userId) {
    alert("Please login to like comments")
    return
  }

  const liked = userCommentLiked[commentId] ?? false

  // ---------- UNLIKE ----------
  if (liked) {
    const { error } = await supabase
      .from("case_study_comment_likes")
      .delete()
      .eq("comment_id", commentId)
      .eq("user_id", userId)

    if (error) {
      console.error("Unlike failed:", error)
      return
    }

    setUserCommentLiked((p) => ({ ...p, [commentId]: false }))
    setCommentLikesByComment((p) => ({
      ...p,
      [commentId]: Math.max((p[commentId] ?? 1) - 1, 0),
    }))

    return
  }

  // ---------- LIKE (UPSERT SAFE) ----------
  const { error } = await supabase
    .from("case_study_comment_likes")
    .upsert(
      { comment_id: commentId, user_id: userId },
      { onConflict: "comment_id,user_id" }
    )

  if (error) {
    console.error("Like failed:", error)
    return
  }

  setUserCommentLiked((p) => ({ ...p, [commentId]: true }))
  setCommentLikesByComment((p) => ({
    ...p,
    [commentId]: (p[commentId] ?? 0) + 1,
  }))
}


  /* ================= RETURN ================= */

  return {
    commentCounts,
    setCommentCounts,

    commentsByCaseStudy,
    repliesByComment,

    openComments,
    toggleCommentsSection,

    commentTextByCaseStudy,
    setCommentTextByCaseStudy,

    replyBoxOpen,
    setReplyBoxOpen,
    replyTextByComment,
    setReplyTextByComment,

    commentLikesByComment,
    userCommentLiked,

    handleSubmitComment,
    handleSubmitReply,
     handleEditComment,
    handleDeleteComment,
    handleEditReply,
    handleDeleteReply,
    handleLikeComment,
  }
}

export type UseCaseStudyCommentsReturn =
  ReturnType<typeof useCaseStudyComments>
