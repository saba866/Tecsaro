








"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useCaseStudyComments } from "./useCaseStudyComments"

/* ================= TYPES ================= */

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

/* ================= HOOK ================= */

export function useCaseStudies(initialData: CaseStudy[]) {
  /* ---------- DATA ---------- */

  const [caseStudies] = useState<CaseStudy[]>(initialData)

  const [expandedDesc, setExpandedDesc] =
    useState<Record<number, boolean>>({})

  const [likedCaseStudies, setLikedCaseStudies] =
    useState<Record<number, boolean>>({})

  const [bookmarkedCaseStudies, setBookmarkedCaseStudies] =
    useState<Record<number, boolean>>({})

  const [userId, setUserId] = useState<string | null>(null)

  const comments = useCaseStudyComments()

  /* ================= AUTH ================= */

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null)
    })
  }, [])

  /* ================= INIT COMMENT COUNTS (ONCE) ================= */

  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return
    if (!comments.commentCounts) return

    const initialCounts: Record<number, number> = {}
    initialData.forEach((row) => {
      initialCounts[row.id] = row.comment_count ?? 0
    })

    comments.setCommentCounts(initialCounts)
    initializedRef.current = true
  }, [initialData, comments])

  /* ================= LOAD LIKES & SAVES ================= */

  useEffect(() => {
    if (!userId) return

    const loadUserActions = async () => {
      const { data: likes } = await supabase
        .from("case_study_likes")
        .select("case_study_id")

      const { data: saves } = await supabase
        .from("case_study_saves")
        .select("case_study_id")

      const likedMap: Record<number, boolean> = {}
      likes?.forEach((l) => {
        likedMap[l.case_study_id] = true
      })

      const savedMap: Record<number, boolean> = {}
      saves?.forEach((s) => {
        savedMap[s.case_study_id] = true
      })

      setLikedCaseStudies(likedMap)
      setBookmarkedCaseStudies(savedMap)
    }

    loadUserActions()
  }, [userId])

  /* ================= LIKE ================= */

  const handleLikeCaseStudy = async (caseStudyId: number) => {
    if (!userId) {
      alert("Login required")
      return
    }

    const liked = likedCaseStudies[caseStudyId] ?? false

    if (liked) {
      // UNLIKE
      await supabase
        .from("case_study_likes")
        .delete()
        .eq("case_study_id", caseStudyId)
        .eq("user_id", userId)
    } else {
      // LIKE
      await supabase
        .from("case_study_likes")
        .insert({
          case_study_id: caseStudyId,
          user_id: userId,
        })
    }

    setLikedCaseStudies((p) => ({
      ...p,
      [caseStudyId]: !liked,
    }))
  }

  /* ================= SAVE ================= */

  const handleToggleBookmark = async (caseStudyId: number) => {
    if (!userId) {
      alert("Login required")
      return
    }

    const saved = bookmarkedCaseStudies[caseStudyId] ?? false

    if (saved) {
      // UNSAVE
      await supabase
        .from("case_study_saves")
        .delete()
        .eq("case_study_id", caseStudyId)
        .eq("user_id", userId)
    } else {
      // SAVE
      await supabase
        .from("case_study_saves")
        .insert({
          case_study_id: caseStudyId,
          user_id: userId,
        })
    }

    setBookmarkedCaseStudies((p) => ({
      ...p,
      [caseStudyId]: !saved,
    }))
  }

  /* ================= SHARE ================= */

  const handleShareCaseStudy = async (post: CaseStudy) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert("Link copied")
      }
    } catch (err) {
      console.error("Share failed", err)
    }
  }

  /* ================= RETURN ================= */

  return {
    caseStudies,

    expandedDesc,
    setExpandedDesc,

    likedCaseStudies,
    bookmarkedCaseStudies,

    handleLikeCaseStudy,
    handleToggleBookmark,
    handleShareCaseStudy,

    ...comments,
  }
}

export type UseCaseStudiesReturn =
  ReturnType<typeof useCaseStudies>
