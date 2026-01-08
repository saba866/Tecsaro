
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"
import InitialAvatar from "@/components/profile/InitialAvatar"

type Props = {
  profile: any
  isEditing: boolean
  onEditClick: () => void
}

export default function ProfileHeader({
  profile,
  isEditing,
  onEditClick,
}: Props) {
  return (
    <Card className="bg-card border border-border p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        <InitialAvatar
          firstName={profile.first_name}
          lastName={profile.last_name}
          username={profile.username}
          size="lg"
        />

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-text">
                {profile.first_name} {profile.last_name}
              </h1>
              <p className="text-sm text-muted mt-1">
                @{profile.username}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={onEditClick}
                className="btn-primary"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>

              <Link href="/dashboard">
                <Button className="btn-secondary">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 border border-border rounded-lg p-4">
            <h2 className="text-sm font-semibold text-text mb-4">
              Profile Details
            </h2>

            <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              {[
                ["Email", profile.email],
                ["Phone", profile.phone],
                ["Role", profile.role],
                ["Country", profile.country],
                ["State", profile.state],
                ["City", profile.city],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-text font-medium">
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
