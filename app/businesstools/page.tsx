




import ToolsClient from "./ToolsClient"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ToolsPage() {
  const { data: tools } = await supabase
    .from("business_tools")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })

  return <ToolsClient tools={tools ?? []} />
}
