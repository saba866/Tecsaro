


"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ROLES = ["Founder", "Product", "Marketing", "Engineering", "Designer", "Other"]

type Props = {
  profile: any | null
  editForm: any
  setEditForm: (val: any) => void
  onSave: () => void
  onCreate: () => void
  saving: boolean
  usernameAvailable: boolean | null
  checkingUsername: boolean
  countries: any[]
  states: any[]
  cities: any[]
}

export default function ProfileForm({
  profile,
  editForm,
  setEditForm,
  onSave,
  onCreate,
  saving,
  usernameAvailable,
  checkingUsername,
  countries,
  states,
  cities,
}: Props) {
  if (!editForm) return null

  return (
    <Card className="bg-card border border-border p-8 mb-10">
      {/* Title */}
      <h2 className="text-xl font-semibold text-foreground mb-6">
        {profile ? "Edit Profile" : "Create Profile"}
      </h2>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* FIRST NAME */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            First Name <span className="text-destructive">*</span>
          </label>
          <input
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
            value={editForm.first_name ?? ""}
            readOnly
          />
        </div>

        {/* LAST NAME */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Last Name <span className="text-destructive">*</span>
          </label>
          <input
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
            value={editForm.last_name ?? ""}
            readOnly
          />
        </div>

        {/* USERNAME */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Username <span className="text-destructive">*</span>
          </label>
          <input
            className="w-full rounded-md border border-border px-3 py-2 text-foreground focus:border-primary outline-none"
            value={editForm.username ?? ""}
            onChange={(e) =>
              setEditForm({ ...editForm, username: e.target.value })
            }
            required
          />
          <p className="mt-1 text-xs text-muted">
            {checkingUsername
              ? "Checking availability…"
              : usernameAvailable === false
              ? "Username already taken"
              : usernameAvailable === true
              ? "Username available"
              : ""}
          </p>
        </div>

        {/* ROLE */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Role <span className="text-destructive">*</span>
          </label>
          <select
            className="w-full rounded-md border border-border px-3 py-2 text-foreground"
            value={editForm.role ?? ""}
            onChange={(e) =>
              setEditForm({ ...editForm, role: e.target.value })
            }
            required
          >
            <option value="">Select role</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {editForm.role === "Other" && (
            <input
              className="mt-2 w-full rounded-md border border-border px-3 py-2"
              placeholder="Specify role"
              value={editForm.role_other ?? ""}
              onChange={(e) =>
                setEditForm({ ...editForm, role_other: e.target.value })
              }
              required
            />
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
            value={editForm.email ?? ""}
            readOnly
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Phone Number <span className="text-destructive">*</span>
          </label>
          <input
            className="w-full rounded-md border border-border px-3 py-2 text-foreground"
            value={editForm.phone ?? ""}
            onChange={(e) =>
              setEditForm({ ...editForm, phone: e.target.value })
            }
            required
          />
        </div>

        {/* COUNTRY */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Country <span className="text-destructive">*</span>
          </label>
          <select
            className="w-full rounded-md border border-border px-3 py-2 text-foreground"
            value={editForm.country ?? ""}
            onChange={(e) =>
              setEditForm({ ...editForm, country: e.target.value })
            }
            required
          >
            <option value="">Select country</option>
            {countries.map((c: any) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>

          {editForm.country === "Other" && (
            <input
              className="mt-2 w-full rounded-md border border-border px-3 py-2"
              placeholder="Type country"
              value={editForm.country_other ?? ""}
              onChange={(e) =>
                setEditForm({ ...editForm, country_other: e.target.value })
              }
              required
            />
          )}
        </div>

        {/* STATE */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            State / Region <span className="text-destructive">*</span>
          </label>
          <select
            className="w-full rounded-md border border-border px-3 py-2 text-foreground"
            value={editForm.state ?? ""}
            onChange={(e) =>
              setEditForm({ ...editForm, state: e.target.value })
            }
            disabled={!states.length}
            required={!!states.length}
          >
            <option value="">
              {states.length ? "Select state" : "Select country first"}
            </option>
            {states.map((s: any) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* CITY */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            City <span className="text-destructive">*</span>
          </label>
          <select
            className="w-full rounded-md border border-border px-3 py-2 text-foreground"
            value={editForm.city ?? ""}
            onChange={(e) =>
              setEditForm({ ...editForm, city: e.target.value })
            }
            disabled={!cities.length}
            required={!!cities.length}
          >
            <option value="">
              {cities.length
                ? "Select city"
                : states.length
                ? "Select state first"
                : "Select country first"}
            </option>
            {cities.map((c: any) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ACTION */}
      <div className="flex justify-end mt-8">
        <Button
          disabled={saving}
          onClick={profile ? onSave : onCreate}
          className="btn-primary"
        >
          {saving ? "Saving…" : profile ? "Save Changes" : "Create Profile"}
        </Button>
      </div>
    </Card>
  )
}
