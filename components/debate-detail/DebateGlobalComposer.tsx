




"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DebateGlobalComposer({
  phase,
  replyTo,
  selectedTeam,
  setSelectedTeam,
  setReplyTo,
  comment,
  setComment,
  submit,
  posting,
}: any) {
  return (
    <Card
      id="add-argument-card"
      className="p-6 mb-8 bg-card border border-border"
    >
      {phase !== "closed" ? (
        <>
          {!replyTo && !selectedTeam ? (
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setSelectedTeam("for")
                  setReplyTo(null)
                }}
                className="w-full btn-primary"
              >
                Argue For
              </Button>

              <Button
                onClick={() => {
                  setSelectedTeam("against")
                  setReplyTo(null)
                }}
                className="w-full btn-primary"
              >
                Argue Against
              </Button>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="mb-2 text-sm text-text">
                {replyTo ? (
                  <>
                    Replying to <b>{(replyTo as any).author}</b>{" "}
                    <button
                      onClick={() => {
                        setReplyTo(null)
                        setSelectedTeam(null)
                        setComment("")
                      }}
                      className="ml-2 text-primary hover:text-primary-hover underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {selectedTeam === "for"
                      ? "Arguing For"
                      : "Arguing Against"}{" "}
                    <button
                      onClick={() => {
                        setSelectedTeam(null)
                        setComment("")
                      }}
                      className="ml-2 text-primary hover:text-primary-hover underline"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>

              {/* TEXTAREA */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-border p-3 rounded mb-3 text-text placeholder:text-disabled"
                placeholder={
                  replyTo
                    ? "Write your reply..."
                    : selectedTeam === "for"
                    ? "Write your supporting argument..."
                    : "Write your opposing argument..."
                }
              />

              {/* ACTIONS */}
              <div className="flex gap-3">
                <Button
                  disabled={
                    posting ||
                    !comment.trim() ||
                    (!replyTo && !selectedTeam)
                  }
                  onClick={submit}
                  className="btn-primary"
                >
                  {replyTo ? "Post Reply" : "Post Argument"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setReplyTo(null)
                    setSelectedTeam(null)
                    setComment("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-xs text-muted">
          Debate closed — global composer disabled.
        </div>
      )}
    </Card>
  )
}
