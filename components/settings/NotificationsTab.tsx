





"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NotificationsTabProps {
  settings: any
  onSettingsChange: (updated: any) => void
  saving: boolean
  onSave: () => void
}

export function NotificationsTab({
  settings,
}: NotificationsTabProps) {
  if (!settings) return null

  const items = [
    "email_notifications",
    "weekly_digest",
    "debate_notifications",
    "newsfeed_updates",
  ] as const

  return (
    <Card className="bg-card border border-border p-8">
      {/* TITLE */}
      <h2 className="text-xl font-semibold text-text mb-2">
        Email Notifications
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-muted mb-8 max-w-xl">
        Notification preferences will be available soon.  
        You’ll be able to control email alerts and digests in a future update.
      </p>

      {/* LIST */}
      <div className="space-y-4">
        {items.map((key) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 border border-border rounded-md bg-background"
          >
            <span className="text-sm font-medium text-text capitalize">
              {key.replace(/_/g, " ")}
            </span>

            <input
              type="checkbox"
              checked={settings[key]}
              disabled
              className="accent-[var(--primary-dark)] cursor-not-allowed"
            />
          </div>
        ))}
      </div>

      {/* ACTION */}
      <Button
        disabled
        className="mt-8 bg-secondary text-text-disabled cursor-not-allowed"
      >
        Coming Soon
      </Button>
    </Card>
  )
}
