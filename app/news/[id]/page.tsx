"use client"

import { useState } from "react"
import { ArrowLeft, Share2, Bookmark, ThumbsUp, ThumbsDown, Send } from "lucide-react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  upvotes: number
  downvotes: number
  userVote?: "up" | "down" | null
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Chen",
      avatar: "SC",
      content: "This is a game-changer for the enterprise software landscape. Excited to see how this evolves.",
      timestamp: "2h ago",
      upvotes: 24,
      downvotes: 1,
      userVote: null,
    },
    {
      id: "2",
      author: "James Williams",
      avatar: "JW",
      content: "The implications for team collaboration are massive. We should implement this at our company.",
      timestamp: "1h ago",
      upvotes: 18,
      downvotes: 0,
      userVote: null,
    },
  ])
  const [newComment, setNewComment] = useState("")

  const handlePostComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Math.random().toString(),
      author: "You",
      avatar: "YO",
      content: newComment,
      timestamp: "just now",
      upvotes: 0,
      downvotes: 0,
      userVote: null,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleCommentVote = (commentId: string, voteType: "up" | "down") => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          let newUpvotes = comment.upvotes
          let newDownvotes = comment.downvotes
          let newUserVote: "up" | "down" | null = comment.userVote

          if (voteType === "up") {
            if (comment.userVote === "up") {
              newUpvotes--
              newUserVote = null
            } else {
              if (comment.userVote === "down") newDownvotes--
              newUpvotes++
              newUserVote = "up"
            }
          } else {
            if (comment.userVote === "down") {
              newDownvotes--
              newUserVote = null
            } else {
              if (comment.userVote === "up") newUpvotes--
              newDownvotes++
              newUserVote = "down"
            }
          }

          return { ...comment, upvotes: newUpvotes, downvotes: newDownvotes, userVote: newUserVote }
        }
        return comment
      }),
    )
  }

  const handleShare = () => {
    const text = "Check out this article on Tecsaro"
    if (navigator.share) {
      navigator
        .share({
          title: "Enterprise Software M&A Activity Hits Record High",
          text: text,
          url: window.location.href,
        })
        .catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Article link copied to clipboard!")
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
            {/* Back Button */}
            <Link href="/news" className="flex items-center gap-2 text-accent hover:text-accent-muted mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to news
            </Link>

            {/* Article Header */}
            <div className="mb-8">
              <div className="mb-6">
                <p className="text-xs font-semibold text-accent uppercase mb-2">Forbes</p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Enterprise Software M&A Activity Hits Record High
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground mb-6">
                  <span>Published 4h ago</span>
                  <span className="hidden sm:inline">•</span>
                  <span>5 min read</span>
                </div>
              </div>

              {/* Article Image */}
              <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8 bg-secondary">
                <img src="/business-merger.jpg" alt="Article cover" className="w-full h-full object-cover" />
              </div>

              {/* Share & Bookmark */}
              <div className="flex gap-2 mb-8 flex-wrap sm:flex-nowrap">
                <Button onClick={handleShare} variant="outline" className="flex-1 sm:flex-none bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <Card className="border border-border p-6 md:p-8 mb-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground text-lg mb-6">
                  Tech giants are accelerating their acquisition strategies, with record-breaking M&A activity in the
                  enterprise software sector. This trend reflects the industry's need to consolidate capabilities and
                  market share in an increasingly competitive landscape.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Key Trends Shaping the Market</h2>
                <p className="text-foreground mb-4">
                  Several factors are driving this wave of consolidation. Companies are racing to acquire AI
                  capabilities, expand their cloud infrastructure, and build comprehensive platform offerings. The cost
                  of building these capabilities from scratch has become prohibitively expensive.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">What This Means for Companies</h2>
                <p className="text-foreground mb-4">
                  For smaller enterprises and startups, this consolidation trend presents both opportunities and
                  challenges. While larger players get stronger, there are also more potential acquirers and partnership
                  opportunities than ever before.
                </p>

                <p className="text-foreground">
                  Industry analysts predict this trend will continue through 2026, with estimates suggesting over $500
                  billion in enterprise software M&A transactions alone. Organizations should prepare for a landscape
                  with fewer but more powerful platforms.
                </p>
              </div>
            </Card>

            {/* Comments Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Comments ({comments.length})</h2>

              {/* New Comment Form */}
              <Card className="border border-border p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4">Add Your Thoughts</h3>
                <textarea
                  placeholder="Share your insights on this article..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none mb-4"
                  rows={4}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button
                    disabled={!newComment.trim()}
                    onClick={handlePostComment}
                    className="bg-accent hover:bg-accent-muted text-primary"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </Card>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="border border-border p-6">
                    <div className="flex gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-muted flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                        {comment.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-foreground">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                        </div>
                        <p className="text-foreground text-sm mb-4">{comment.content}</p>

                        {/* Comment Actions */}
                        <div className="flex items-center gap-4 text-xs">
                          <button
                            onClick={() => handleCommentVote(comment.id, "up")}
                            className={`flex items-center gap-1 transition ${comment.userVote === "up" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            {comment.upvotes}
                          </button>
                          <button
                            onClick={() => handleCommentVote(comment.id, "down")}
                            className={`flex items-center gap-1 transition ${comment.userVote === "down" ? "text-red-500" : "text-muted-foreground hover:text-foreground"}`}
                          >
                            <ThumbsDown className="w-4 h-4" />
                            {comment.downvotes}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
