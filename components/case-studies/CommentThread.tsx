






"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, MoreVertical } from "lucide-react"
import { getInitials } from "@/lib/getInitials"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Comment,
  Reply,
  UseCaseStudyCommentsReturn,
} from "@/hooks/useCaseStudyComments"

type Props = {
  postId: number
  comment: Comment
  state: UseCaseStudyCommentsReturn
}

export function CommentThread({ postId, comment, state }: Props) {
  const {
    repliesByComment,
    replyBoxOpen,
    setReplyBoxOpen,
    replyTextByComment,
    setReplyTextByComment,
    commentLikesByComment,
    userCommentLiked,
    handleLikeComment,
    handleSubmitReply,
    handleEditComment,
    handleDeleteComment,
    handleEditReply,
    handleDeleteReply,
  } = state

  const replies = repliesByComment[comment.id] ?? []
  const liked = userCommentLiked[comment.id] ?? false
  const likeCount = commentLikesByComment[comment.id] ?? 0

  const [editingCommentId, setEditingCommentId] =
    useState<number | null>(null)
  const [editingReplyId, setEditingReplyId] =
    useState<number | null>(null)
  const [editText, setEditText] = useState("")

  return (
    <div className="space-y-3">
      {/* ================= COMMENT ================= */}
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-avatar flex items-center justify-center text-xs font-bold">
          {getInitials(comment.user.first_name, comment.user.last_name)}
        </div>

        <div className="flex-1 card px-4 py-3">
          <div className="flex justify-between items-start">
            <p className="text-sm font-semibold">
              {comment.user.username}
            </p>

            {/* ⋮ MENU */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-full hover-accent-dark">
                  <MoreVertical className="w-4 h-4 icon-default" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setEditingCommentId(comment.id)
                    setEditText(comment.content)
                  }}
                >
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleDeleteComment(comment)}
                  className="text-status-error"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          {editingCommentId === comment.id ? (
            <div className="space-y-2 mt-2">
              <textarea
                rows={1}
                className="w-full resize-none border rounded-lg px-3 py-2"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="btn-primary"
                  onClick={() => {
                    handleEditComment(comment, editText)
                    setEditingCommentId(null)
                  }}
                >
                  Save
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingCommentId(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm mt-1">{comment.content}</p>
          )}

          {/* Actions */}
          <div className="flex gap-4 mt-2 text-xs text-muted">
            <button
              onClick={() => handleLikeComment(comment.id)} // ✅ FIXED
              className={`flex items-center gap-1 ${
                liked ? "icon-active" : "icon-default"
              }`}
            >
              <Heart
                className="w-3 h-3"
                fill={liked ? "currentColor" : "none"}
              />
              {likeCount}
            </button>

            <button
              onClick={() =>
                setReplyBoxOpen((p) =>
                  p[comment.id] ? {} : { [comment.id]: true }
                )
              }
            >
              Reply
            </button>
          </div>

          {/* Reply Box */}
          {replyBoxOpen[comment.id] && (
            <div className="flex gap-2 mt-3">
              <textarea
                rows={1}
                className="flex-1 resize-none border rounded-lg px-3 py-2 text-xs"
                placeholder="Write a reply..."
                value={replyTextByComment[comment.id] ?? ""}
                onChange={(e) =>
                  setReplyTextByComment((p) => ({
                    ...p,
                    [comment.id]: e.target.value,
                  }))
                }
              />

              <Button
                size="sm"
                className="btn-primary"
                disabled={!replyTextByComment[comment.id]?.trim()}
                onClick={() =>
                  handleSubmitReply(postId, comment.id) // ✅ FIXED
                }
              >
                Reply
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ================= REPLIES ================= */}
      {replies.length > 0 && (
        <div className="pl-12 space-y-3">
          {replies.map((r: Reply) => (
            <div key={r.id} className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-avatar flex items-center justify-center text-[10px] font-bold">
                {getInitials(r.user.first_name, r.user.last_name)}
              </div>

              <div className="card px-3 py-2 w-full">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-semibold">
                    {r.user.username}
                  </p>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-full hover-accent-dark">
                        <MoreVertical className="w-3 h-3 icon-default" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingReplyId(r.id)
                          setEditText(r.content)
                        }}
                      >
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleDeleteReply(r)}
                        className="text-status-error"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {editingReplyId === r.id ? (
                  <div className="space-y-2 mt-1">
                    <textarea
                      rows={1}
                      className="w-full resize-none border rounded-lg px-3 py-2 text-xs"
                      value={editText}
                      onChange={(e) =>
                        setEditText(e.target.value)
                      }
                    />

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="btn-primary"
                        onClick={() => {
                          handleEditReply(r, editText)
                          setEditingReplyId(null)
                        }}
                      >
                        Save
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setEditingReplyId(null)
                        }
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs mt-1">{r.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
