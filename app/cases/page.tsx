






export const dynamic = "force-dynamic"

import CaseStudiesClient from "./CaseStudiesClient"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function CaseStudiesPage() {
  const { data } = await supabase
    .from("case_studies")
    .select(`
      id,
      title,
      description,
      image_url,
      category,
      sponsor,
      author,
      read_time,
      case_study_likes(count),
      case_study_comments(count)
    `)
    .order("created_at", { ascending: false })

  const mapped =
    data?.map((row: any) => ({
      ...row,
      likes: row.case_study_likes?.[0]?.count ?? 0,
      comment_count: row.case_study_comments?.[0]?.count ?? 0,
    })) ?? []

  return <CaseStudiesClient initialCaseStudies={mapped} />
}
