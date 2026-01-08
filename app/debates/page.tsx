


export const dynamic = "force-dynamic"

import DebatesClient from "./DebatesClient"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function DebatesPage() {
  const { data } = await supabase
    .from("topic_debates")
    .select("*")
    .order("created_at", { ascending: false })

  const debates =
    data?.map((r: any) => ({
      id: String(r.id),
      title: r.title,
      description: r.description,
      topic: r.topic,
      forTeam: {
        name: r.for_team_name ?? "For",
        points: Number(r.for_team_points) || 0,
        contributors: Number(r.for_team_contributors) || 0,
      },
      againstTeam: {
        name: r.against_team_name ?? "Against",
        points: Number(r.against_team_points) || 0,
        contributors: Number(r.against_team_contributors) || 0,
      },
      participants: Number(r.participants) || 0,
      comments: Number(r.comments_count) || 0,
      status: r.status || "active",
      startDate: r.start_date,
      endDate: r.end_date,
      difficulty: r.difficulty || "beginner",
    })) ?? []

  return <DebatesClient initialDebates={debates} />
}
