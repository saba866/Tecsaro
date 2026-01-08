// lib/startupIdeasTypes.ts

export interface StartupIdea {
  id: string
  title: string
  description: string
  userName: string
  avatar: string
  likes: number
  dislikes: number
  comments: number
  featured?: boolean
  timestamp: string
  userReaction?: "like" | "dislike" | null
  isSaved?: boolean
  userId: string
}

export interface Comment {
  id: string
  ideaId: string
  content: string
  userName: string
  avatar: string
  createdAt: string
  parentId: string | null
  userId: string
}

export interface Reply {
  id: string
  commentId: string
  content: string
  userName: string
  avatar: string
  createdAt: string
  userId: string
}

// Helpers
export const getInitialsFromName = (fullName: string) => {
  if (!fullName) return ""
  const parts = fullName.trim().split(" ").filter(Boolean)
  if (parts.length === 1) return parts[0][0]?.toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const formatTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp)
  const diff = Math.floor((Date.now() - date.getTime()) / 1000)
  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return `${Math.floor(diff / 604800)}w ago`
}
