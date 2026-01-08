


import DashboardClient from "./DashboardClient"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function DashboardPage() {
  const [
    { data: playbooks },
    { data: caseStudies },
    { data: tools },
  ] = await Promise.all([
    supabase
      .from("playbooks")
      .select("id,title,subtitle,icon,level")
      .order("created_at", { ascending: false })
      .limit(3),

    supabase
      .from("case_studies")
      .select("id,title,description")
      .order("created_at", { ascending: false })
      .limit(3),

    supabase
      .from("business_tools")
      .select("id,name,short_description")
      .eq("status", "active")
      .limit(3),
  ])

  return (
    <DashboardClient
      playbooks={playbooks ?? []}
      caseStudies={caseStudies ?? []}
      tools={tools ?? []}
    />
  )
}




