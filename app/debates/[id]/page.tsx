





"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { isNullOrUndefined } from "util"

import DebateLayout from "@/components/debate-detail/DebateLayout"
import DebateHeader from "@/components/debate-detail/DebateHeader"
import DebateResult from "@/components/debate-detail/DebateResult"
import DebateStats from "@/components/debate-detail/DebateStats"
import DebateTeamComposers from "@/components/debate-detail/DebateTeamComposers"
import DebateGlobalComposer from "@/components/debate-detail/DebateGlobalComposer"
import DebateArguments from "@/components/debate-detail/DebateArguments"
import DebateToasts from "@/components/debate-detail/DebateToasts"

/* ================= TYPES ================= */

type ArgumentNode = {
  id: string
  content: string
  author: string
  avatar?: string
  upvotes: number
  replies: number
  team: "for" | "against"
  children: ArgumentNode[]
  timestamp: string
}

type ArgRow = {
  id: number
  debate_id: number
  user_id: string | null
  username: string
  avatar: string | null
  team: "for" | "against"
  content: string
  likes_count: number
  replies_count: number
  created_at: string
  parent_id: number | null
}

type LikeRow = {
  id: number
  argument_id: number
  user_id: string
  created_at: string
}

type UserRow = {
  id: string
  username: string
  avatar: string | null
}

/* ================= HELPERS ================= */

function getInitialsLocal(name?: string | null) {
  if (!name) return "??"
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/* ================= PAGE ================= */

export default function DebateDetailPage() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const debateId = Number(id)
  const SHOW_DEBUG = searchParams?.get("debug") === "1"

  /* ================= UI ================= */
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /* ================= COMPOSERS ================= */
  const [comment, setComment] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<"for" | "against" | null>(null)
  const [replyTo, setReplyTo] = useState<ArgumentNode | null>(null)
  const [supportComment, setSupportComment] = useState("")
  const [againstComment, setAgainstComment] = useState("")
  const [supportPosting, setSupportPosting] = useState(false)
  const [againstPosting, setAgainstPosting] = useState(false)

  /* ================= DATA ================= */
  const [argumentsList, setArgumentsList] = useState<ArgRow[]>([])
  const [likesList, setLikesList] = useState<LikeRow[]>([])
  const [likingIds, setLikingIds] = useState<number[]>([])
  const [posting, setPosting] = useState(false)
  const [loadingArgs, setLoadingArgs] = useState(true)

  /* ================= DEBATE ================= */
  const [debateRecord, setDebateRecord] = useState<any>(null)
  const [loadingDebate, setLoadingDebate] = useState(true)
  const [phase, setPhase] = useState<"upcoming" | "active" | "closed">("active")
  const [timeRemainingSec, setTimeRemainingSec] = useState(86400)

  /* ================= USER ================= */
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  /* ================= TOASTS ================= */
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([])
  const toastIdRef = useRef(0)

  const pushToast = (message: string) => {
    const id = ++toastIdRef.current
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 4200)
  }

  /* ================= LOAD USER ================= */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.id) setCurrentUserId(data.user.id)
    })
  }, [])

  /* ================= LOAD DEBATE ================= */
  const computePhaseAndRemaining = (record: any) => {
    const now = Date.now()
    const start = record?.start_date ? Date.parse(record.start_date) : null
    const end = record?.end_date ? Date.parse(record.end_date) : null

    if (record?.status === "completed") return { phase: "closed", remaining: 0 }
    if (start && now < start) return { phase: "upcoming", remaining: Math.floor((start - now) / 1000) }
    if (end && now < end) return { phase: "active", remaining: Math.floor((end - now) / 1000) }
    return { phase: "closed", remaining: 0 }
  }

  const loadDebate = useCallback(async () => {
    const { data } = await supabase
      .from("topic_debates")
      .select("*")
      .eq("id", debateId)
      .single()

    if (data) {
      setDebateRecord(data)
      const res = computePhaseAndRemaining(data)
      setPhase(res.phase)
      setTimeRemainingSec(res.remaining)
    }

    setLoadingDebate(false)
  }, [debateId])

  useEffect(() => {
    if (debateId > 0) loadDebate()
  }, [debateId, loadDebate])

  /* ================= ARGUMENTS ================= */
  useEffect(() => {
    if (!debateId) return
    setLoadingArgs(true)

    supabase
      .from("topic_debate_arguments")
      .select("*")
      .eq("debate_id", debateId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        const enriched =
          data?.map((a) => ({
            ...a,
            avatar: a.avatar || getInitialsLocal(a.username),
          })) || []

        setArgumentsList(enriched)
        setLoadingArgs(false)
      })
  }, [debateId])

  /* ================= THREADING ================= */
  const buildThreaded = useCallback((rows: ArgRow[]): ArgumentNode[] => {
    const map = new Map<number, any>()
    rows.forEach((r) =>
      map.set(r.id, {
        id: String(r.id),
        content: r.content,
        author: r.username,
        avatar: r.avatar,
        upvotes: r.likes_count,
        replies: r.replies_count,
        team: r.team,
        children: [],
        timestamp: r.created_at,
        parentId: r.parent_id,
      })
    )

    const roots: ArgumentNode[] = []
    map.forEach((node) => {
      if (node.parentId && map.has(node.parentId)) {
        map.get(node.parentId).children.push(node)
      } else {
        roots.push(node)
      }
    })
    return roots
  }, [])

  const threadedArguments = useMemo(() => {
    const roots = buildThreaded(argumentsList)
    return {
      for: roots.filter((r) => r.team === "for"),
      against: roots.filter((r) => r.team === "against"),
    }
  }, [argumentsList, buildThreaded])

  /* ================= STATS ================= */
  const participants = useMemo(
    () => new Set(argumentsList.map((a) => a.user_id).filter(Boolean)).size,
    [argumentsList]
  )

  const forArgs = argumentsList.filter((a) => a.team === "for")
  const againstArgs = argumentsList.filter((a) => a.team === "against")

  const supportPoints = forArgs.reduce((s, a) => s + (a.likes_count || 0), 0)
  const againstPoints = againstArgs.reduce((s, a) => s + (a.likes_count || 0), 0)

  const totalPoints = Math.max(supportPoints + againstPoints, 1)
  const supportPct = Math.round((supportPoints / totalPoints) * 100)
  const againstPct = 100 - supportPct

  const winner =
    phase === "closed"
      ? supportPoints > againstPoints
        ? "for"
        : againstPoints > supportPoints
        ? "against"
        : "draw"
      : null

  const headerCountdownLabel =
    phase === "active"
      ? `Ends in ${timeRemainingSec}s`
      : phase === "upcoming"
      ? `Starts in ${timeRemainingSec}s`
      : "Debate Closed"

  const isFinalHour = phase === "active" && timeRemainingSec <= 3600

  /* ================= ACTIONS ================= */

  const postArgument = async (
    content: string,
    team: "for" | "against",
    parentId: number | null = null,
    cb?: () => void
  ) => {
    if (!currentUserId || !content.trim()) return

    setPosting(true)
    const { data } = await supabase
      .from("topic_debate_arguments")
      .insert([
        {
          debate_id: debateId,
          user_id: currentUserId,
          username: "Anonymous User",
          avatar: null,
          team,
          content,
          parent_id: parentId,
        },
      ])
      .select()
      .single()

    if (data) {
      setArgumentsList((p) => [...p, { ...data, avatar: getInitialsLocal(data.username) }])
      cb?.()
    }
    setPosting(false)
  }

  const postSupportArgument = () =>
    postArgument(supportComment, "for", null, () => setSupportComment(""))

  const postAgainstArgument = () =>
    postArgument(againstComment, "against", null, () => setAgainstComment(""))

  const submit = () => {
    if (!replyTo) return
    postArgument(comment, replyTo.team, Number(replyTo.id), () => {
      setComment("")
      setReplyTo(null)
      setSelectedTeam(null)
    })
  }

  const handleReplyClick = (arg: ArgumentNode) => {
    setReplyTo(arg)
    setSelectedTeam(null)
    setComment("")
    document.getElementById("add-argument-card")?.scrollIntoView({ behavior: "smooth" })
  }

  const likeArgument = async (argumentId: number) => {
    if (!currentUserId) return
    await supabase.from("topic_debate_argument_likes").insert([
      { argument_id: argumentId, user_id: currentUserId },
    ])
  }

  /* ================= RENDER ================= */

  return (
    <DebateLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <DebateHeader debateRecord={debateRecord} />

        <DebateResult
          phase={phase}
          headerCountdownLabel={headerCountdownLabel}
          supportPoints={supportPoints}
          againstPoints={againstPoints}
          supportPct={supportPct}
          againstPct={againstPct}
          winner={winner}
          participants={participants}
          argumentsList={argumentsList}
          isFinalHour={isFinalHour}
        />

        <DebateStats
          participants={participants}
          argumentsList={argumentsList}
          debateRecord={debateRecord}
          supportPoints={supportPoints}
          againstPoints={againstPoints}
        />

        <DebateTeamComposers
          debateRecord={debateRecord}
          phase={phase}
          supportComment={supportComment}
          setSupportComment={setSupportComment}
          againstComment={againstComment}
          setAgainstComment={setAgainstComment}
          supportPosting={supportPosting}
          againstPosting={againstPosting}
          postSupportArgument={postSupportArgument}
          postAgainstArgument={postAgainstArgument}
          replyTo={replyTo}
          supportPoints={supportPoints}
          againstPoints={againstPoints}
          forArgs={forArgs}
          againstArgs={againstArgs}
        />

        <DebateGlobalComposer
          phase={phase}
          replyTo={replyTo}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          setReplyTo={setReplyTo}
          comment={comment}
          setComment={setComment}
          submit={submit}
          posting={posting}
        />

        <DebateArguments
          loadingArgs={loadingArgs}
          threadedArguments={threadedArguments}
          handleReplyClick={handleReplyClick}
          likeArgument={likeArgument}
          likingIds={likingIds}
        />

        {SHOW_DEBUG && (
          <div className="mt-6 text-xs text-muted-foreground">
            <div>debateId: {debateId}</div>
            <div>phase: {phase}</div>
            <div>arguments: {argumentsList.length}</div>
          </div>
        )}

        <DebateToasts toasts={toasts} />
      </div>
    </DebateLayout>
  )
}
