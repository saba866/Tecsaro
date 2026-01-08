




"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DebateTeamComposers({
  debateRecord,
  phase,
  supportComment,
  setSupportComment,
  againstComment,
  setAgainstComment,
  supportPosting,
  againstPosting,
  postSupportArgument,
  postAgainstArgument,
  replyTo,
  supportPoints,
  againstPoints,
  forArgs,
  againstArgs,
}: any) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {/* SUPPORT */}
      <Card className="p-4 bg-accent border border-hover">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-semibold text-accent">
              {debateRecord?.for_team_name ?? "Support"}
            </div>
            <div className="text-xs text-muted">
              {supportPoints} points • {forArgs.length} arguments
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {supportPoints}
          </div>
        </div>

        {phase !== "closed" ? (
          <>
            <textarea
              disabled={!!replyTo}
              value={supportComment}
              onChange={(e) => setSupportComment(e.target.value)}
              className="w-full border border-border p-3 rounded mb-3 text-text"
              placeholder="Start a supporting argument..."
            />

            <div className="flex gap-2">
              <Button
                disabled={!!replyTo || !supportComment.trim() || supportPosting}
                className="btn-primary"
                onClick={postSupportArgument}
              >
                Post Support
              </Button>

              <Button
                variant="outline"
                onClick={() => setSupportComment("")}
              >
                Clear
              </Button>
            </div>
          </>
        ) : (
          <div className="text-xs text-muted">
            Debate closed — cannot post new arguments.
          </div>
        )}
      </Card>

      {/* AGAINST */}
      <Card className="p-4 bg-background border border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-semibold text-muted">
              {debateRecord?.against_team_name ?? "Against"}
            </div>
            <div className="text-xs text-muted">
              {againstPoints} points • {againstArgs.length} arguments
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {againstPoints}
          </div>
        </div>

        {phase !== "closed" ? (
          <>
            <textarea
              disabled={!!replyTo}
              value={againstComment}
              onChange={(e) => setAgainstComment(e.target.value)}
              className="w-full border border-border p-3 rounded mb-3 text-text"
              placeholder="Start an opposing argument..."
            />

            <div className="flex gap-2">
              <Button
                disabled={!!replyTo || !againstComment.trim() || againstPosting}
                className="btn-primary"
                onClick={postAgainstArgument}
              >
                Post Against
              </Button>

              <Button
                variant="outline"
                onClick={() => setAgainstComment("")}
              >
                Clear
              </Button>
            </div>
          </>
        ) : (
          <div className="text-xs text-muted">
            Debate closed — cannot post new arguments.
          </div>
        )}
      </Card>
    </div>
  )
}
