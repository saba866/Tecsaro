export type TopicDebate = {
  id: number
  title: string
  description: string
  topic: string
  status: "active" | "scheduled" | "completed"
  start_date: string
  end_date: string
  difficulty: "beginner" | "intermediate" | "advanced"
  created_at: string
}
