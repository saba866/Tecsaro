



"use client"

import { Card } from "@/components/ui/card"
import { Users, MessageSquare } from "lucide-react"

export default function DebateStats({
  participants,
  argumentsList,
  debateRecord,
  supportPoints,
  againstPoints,
}: any) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {/* Participants */}
      <Card className="p-4 text-center bg-card border border-border">
        <Users className="w-5 h-5 text-accent mx-auto mb-2" />
        <p className="text-2xl font-bold text-foreground">
          {participants}
        </p>
        <p className="text-xs text-muted">
          Participants
        </p>
      </Card>

      {/* Total Arguments */}
      <Card className="p-4 text-center bg-card border border-border">
        <MessageSquare className="w-5 h-5 text-accent mx-auto mb-2" />
        <p className="text-2xl font-bold text-foreground">
          {argumentsList.length}
        </p>
        <p className="text-xs text-muted">
          Total Arguments
        </p>
      </Card>

      {/* Support */}
      <Card className="p-4 text-center bg-accent border border-hover">
        <div className="text-sm font-semibold text-accent mb-2">
          {debateRecord?.for_team_name ?? "Support"}
        </div>
        <div className="text-2xl font-bold text-foreground">
          {supportPoints}
        </div>
        <div className="text-xs text-muted mt-1">
          Support points
        </div>
      </Card>

      {/* Against */}
      <Card className="p-4 text-center bg-background border border-border">
        <div className="text-sm font-semibold text-muted mb-2">
          {debateRecord?.against_team_name ?? "Against"}
        </div>
        <div className="text-2xl font-bold text-foreground">
          {againstPoints}
        </div>
        <div className="text-xs text-muted mt-1">
          Against points
        </div>
      </Card>
    </div>
  )
}
