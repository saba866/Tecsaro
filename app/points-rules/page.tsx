"use client"

import { useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trophy, Info } from "lucide-react"

export default function PointsRulesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-8">
            {/* Page header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-2">
                  <Trophy className="w-7 h-7 text-accent" />
                  Points & Leaderboard Rules
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Understand how you earn points, how leaderboards work, and what each badge means.
                </p>
              </div>

              <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
                <Link href="/leaderboard">← Back to Leaderboard</Link>
              </Button>
            </div>

            {/* Section: How you earn points */}
            <Card className="p-4 md:p-6 border border-border">
              <h2 className="text-lg md:text-xl font-semibold mb-3">1. How you earn points</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Points are awarded for constructive activity across debates, ideas, case studies and learning content.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span>Start a new debate (approved by moderator)</span>
                  <span className="font-semibold text-accent whitespace-nowrap">+25 pts</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>Post a detailed argument / reply in a debate</span>
                  <span className="font-semibold text-accent whitespace-nowrap">+15 pts</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>Comment on a case study or learning post</span>
                  <span className="font-semibold text-accent whitespace-nowrap">+8 pts</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>Your idea or argument receives an upvote / like</span>
                  <span className="font-semibold text-accent whitespace-nowrap">+2 pts</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>Daily active streak (login & meaningful participation)</span>
                  <span className="font-semibold text-accent whitespace-nowrap">+5 pts / day</span>
                </div>
              </div>

              <p className="text-[11px] md:text-xs text-muted-foreground mt-3 flex items-start gap-1">
                <Info className="w-3 h-3 mt-[2px]" />
                Very short or low-quality content may not receive points if it’s considered spammy or off-topic.
              </p>
            </Card>

            {/* Section: Leaderboard periods */}
            <Card className="p-4 md:p-6 border border-border">
              <h2 className="text-lg md:text-xl font-semibold mb-3">2. Leaderboard periods</h2>
              <p className="text-sm text-muted-foreground mb-4">
                The leaderboard can be viewed by different time ranges. Your rank may change between tabs.
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Weekly</span>: points earned in the last 7 days.
                </li>
                <li>
                  <span className="font-medium text-foreground">Monthly</span>: points earned in the last 30 days.
                </li>
                <li>
                  <span className="font-medium text-foreground">All</span>: total points since you joined Tecsaro.
                </li>
              </ul>

              <p className="text-[11px] md:text-xs text-muted-foreground mt-3">
                In MVP, leaderboard data may use sample/mock values and might not reflect real-time activity yet.
              </p>
            </Card>

            {/* Section: Badges */}
            <Card className="p-4 md:p-6 border border-border">
              <h2 className="text-lg md:text-xl font-semibold mb-3">3. Badges & titles</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Badges highlight members who consistently add value to the community.
              </p>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🏆 <span className="font-medium text-foreground">Champion</span> – #1 in Top Debaters for the current period.</p>
                <p>🌟 <span className="font-medium text-foreground">Rising Star</span> – New member entering the Top 10.</p>
                <p>💡 <span className="font-medium text-foreground">Innovator</span> – Leading in idea contributions.</p>
                <p>🎓 <span className="font-medium text-foreground">Expert</span> – High long-term contribution score across multiple sections.</p>
              </div>

              <p className="text-[11px] md:text-xs text-muted-foreground mt-3">
                Badges may change over time as your performance improves or as new members join the leaderboard.
              </p>
            </Card>

            {/* Section: Fair use & anti-abuse */}
            <Card className="p-4 md:p-6 border border-border">
              <h2 className="text-lg md:text-xl font-semibold mb-3">4. Fair use & anti-abuse</h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Spamming low-effort content just to gain points is not allowed.</li>
                <li>Duplicate, off-topic or harmful content may be removed without points.</li>
                <li>Accounts that try to game the system may have points adjusted or reset.</li>
              </ul>
            </Card>

            {/* Back button (mobile) */}
            <div className="md:hidden">
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/leaderboard">← Back to Leaderboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
