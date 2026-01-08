



"use client"

import { useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Bookmark,
  Share2,
  MessageSquare,
} from "lucide-react"
import {
  CaseStudy,
  UseCaseStudiesReturn,
} from "@/hooks/useCaseStudies"
import type { Comment } from "@/hooks/useCaseStudyComments"
import { CommentThread } from "./CommentThread"

/* ================= AUTO GROW TEXTAREA ================= */
function useAutoGrow(
  ref: React.RefObject<HTMLTextAreaElement | null>,
  value: string
) {
  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = "auto"
    ref.current.style.height = ref.current.scrollHeight + "px"
  }, [value])
}

type Props = {
  post: CaseStudy
  state: UseCaseStudiesReturn
}

export function CaseStudyCard({ post, state }: Props) {
  const {
    commentsByCaseStudy,
    expandedDesc,
    setExpandedDesc,
    openComments,
    toggleCommentsSection,
    commentTextByCaseStudy,
    setCommentTextByCaseStudy,
    likedCaseStudies,
    bookmarkedCaseStudies,
    handleSubmitComment,
    handleLikeCaseStudy,
    handleToggleBookmark,
    handleShareCaseStudy,
    commentCounts,
  } = state

  const comments = commentsByCaseStudy[post.id] ?? []
  const commentsOpen = openComments[post.id] ?? false
  const isDescExpanded = expandedDesc[post.id] ?? false

  const shouldTruncate = post.description.length > 220
  const desc =
    shouldTruncate && !isDescExpanded
      ? post.description.slice(0, 220) + "…"
      : post.description

  const commentText = commentTextByCaseStudy[post.id] ?? ""
  const likedPost = likedCaseStudies[post.id] ?? false
  const bookmarked = bookmarkedCaseStudies[post.id] ?? false

  const commentRef = useRef<HTMLTextAreaElement | null>(null)
  useAutoGrow(commentRef, commentText)

  return (
    <Card className="p-6 rounded-2xl bg-card border border-border space-y-5">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={post.image_url || "/placeholder.svg"}
          className="w-full md:w-60 h-44 object-cover rounded-xl"
          alt={post.title}
        />

        <div className="flex-1 space-y-2">
          <p className="text-xs font-semibold uppercase text-primary">
            {post.category}
          </p>

          <h2 className="text-2xl font-bold text-text">
            {post.title}
          </h2>

          <p className="text-sm text-muted">{desc}</p>

          {shouldTruncate && (
            <button
              onClick={() =>
                setExpandedDesc((p) => ({
                  ...p,
                  [post.id]: !isDescExpanded,
                }))
              }
              className="text-xs font-medium text-primary hover:underline"
            >
              {isDescExpanded ? "Read Less" : "Read More"}
            </button>
          )}

          <p className="text-xs text-muted">
            {post.author} • {post.read_time} read
          </p>
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={() => handleLikeCaseStudy(post.id)}
            className={`flex items-center gap-1 ${
              likedPost ? "icon-active" : "icon-default"
            }`}
          >
            <Heart
              className="w-4 h-4"
              fill={likedPost ? "currentColor" : "none"}
            />
            {post.likes + (likedPost ? 1 : 0)}
          </button>

          <button
            onClick={() => handleToggleBookmark(post.id)}
            className={bookmarked ? "icon-active" : "icon-default"}
          >
            <Bookmark
              className="w-4 h-4"
              fill={bookmarked ? "currentColor" : "none"}
            />
          </button>

          <button
            onClick={() => handleShareCaseStudy(post)}
            className="icon-default hover:text-primary"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => toggleCommentsSection(post.id)}
          className="flex items-center gap-1 text-xs text-muted"
        >
          <MessageSquare className="w-4 h-4" />
          {commentCounts?.[post.id] ?? comments.length} Comments
        </button>
      </div>

      {/* ================= COMMENTS ================= */}
      {commentsOpen && (
        <>
          <div className="flex gap-3">
            <textarea
              ref={commentRef}
              rows={1}
              className="flex-1 resize-none overflow-hidden border rounded-xl px-4 py-2"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) =>
                setCommentTextByCaseStudy((p) => ({
                  ...p,
                  [post.id]: e.target.value,
                }))
              }
            />

            <Button
              size="sm"
              disabled={!commentText.trim()}
              onClick={() => handleSubmitComment(post.id)}
              className="btn-primary"
            >
              Post
            </Button>
          </div>

          <div className="space-y-4 pt-2">
            {comments.map((c: Comment) => (
              <CommentThread
                key={c.id}
                postId={post.id}
                comment={c}
                state={state}
              />
            ))}
          </div>
        </>
      )}
    </Card>
  )
}
