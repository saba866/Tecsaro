




import BusinessInsightsClient from "./BusinessInsightsClient"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function BusinessInsightsPage() {
  const { data: posts } = await supabase
    .from("business_insights_posts")
    .select(`
      id,
      title,
      short_description,
      bullet_1,
      bullet_2,
      bullet_3,
      bullet_4,
      bullet_5,
      like_count,
      created_at
    `)
    .order("created_at", { ascending: false })

  return <BusinessInsightsClient initialPosts={posts ?? []} />
}
