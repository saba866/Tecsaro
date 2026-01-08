



"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import DebateResultBar from "./DebateResultBar"
import { useSmoothValue } from "@/hooks/useSmoothValue"

export default function DebateResult({
  phase,
  headerCountdownLabel,
  supportPoints,
  againstPoints,
  supportPct,
  againstPct,
  winner,
  participants,
  argumentsList,
  isFinalHour,
}: any) {
  // 🔹 WebSocket smoothing
  const smoothSupportPct = useSmoothValue(supportPct)
  const smoothAgainstPct = useSmoothValue(againstPct)

  return (
    <Card className="mb-6 p-6 bg-card border border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">Debate Result</h3>
          <p className="text-sm text-muted-foreground">
            Live scoreboard and final result
          </p>
        </div>

        <div className="flex items-center gap-4">
          {phase === "closed" ? (
            <div className="flex items-center gap-3">
              <AlertCircle className="text-status-error" />
              <div className="text-sm font-semibold text-status-error">
                Debate Closed
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              {headerCountdownLabel}
            </div>
          )}

          <div className="text-center">
            <div className="text-xs text-muted-foreground">Support</div>
            <div className="text-2xl font-bold text-accent">
              {supportPoints}
            </div>
          </div>

          {/* ✅ RESULT BAR */}
          <div className="w-48">
            <DebateResultBar
              supportPct={smoothSupportPct}
              againstPct={smoothAgainstPct}
              isFinalHour={isFinalHour}
            />

            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Support {smoothSupportPct}%</span>
              <span>Against {smoothAgainstPct}%</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-muted-foreground">Against</div>
            <div className="text-2xl font-bold text-text-disabled">
              {againstPoints}
            </div>
          </div>

          <div className="ml-4">
            {phase === "closed" ? (
              winner === "draw" ? (
                <div className="px-3 py-1 rounded-full bg-neutral-soft">
                  Draw
                </div>
              ) : (
                <div
                  className={`px-3 py-1 rounded-full ${
                    winner === "for"
                      ? "bg-win-support text-win-support-text"
                      : "bg-win-against text-win-against-text"
                  }`}
                >
                  Winner: {winner === "for" ? "Support" : "Against"}
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        Total participants: {participants} • Total arguments:{" "}
        {argumentsList.length}
      </div>
    </Card>
  )
}
