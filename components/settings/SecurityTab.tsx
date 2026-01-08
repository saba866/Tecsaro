



// "use client"

// import { useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Eye, Key, Trash2 } from "lucide-react"

// interface PasswordFormState {
//   current: string
//   newPass: string
//   confirmNew: string
// }

// interface SecurityTabProps {
//   passwordForm: PasswordFormState
//   onPasswordFormChange: (updated: PasswordFormState) => void
//   passwordError: string | null
//   passwordSuccess: string | null
//   onChangePassword: () => void
// }

// export function SecurityTab({
//   passwordForm,
//   onPasswordFormChange,
//   passwordError,
//   passwordSuccess,
//   onChangePassword,
// }: SecurityTabProps) {
//   const [show, setShow] = useState([false, false, false])

//   return (
//     <Card className="bg-card border border-border p-8">
//       {/* ================= TITLE ================= */}
//       <h2 className="text-xl font-semibold text-text mb-6">
//         Security
//       </h2>

//       {/* ================= CHANGE PASSWORD ================= */}
//       <div className="border border-border rounded-md p-6 mb-10">
//         <h3 className="text-sm font-semibold text-text mb-4 flex items-center gap-2">
//           <Key className="w-4 h-4 text-primary" />
//           Change Password
//         </h3>

//         <div className="space-y-4">
//           {[
//             ["Current password", "current", 0],
//             ["New password", "newPass", 1],
//             ["Confirm new password", "confirmNew", 2],
//           ].map(([label, key, idx]: any) => (
//             <div key={key} className="relative">
//               <input
//                 type={show[idx] ? "text" : "password"}
//                 placeholder={label}
//                 className="
//                   w-full rounded-md
//                   border border-border
//                   px-3 py-2 pr-10
//                   bg-background text-text
//                   outline-none transition
//                   focus:border-hover
//                 "
//                 value={passwordForm[key]}
//                 onChange={(e) =>
//                   onPasswordFormChange({
//                     ...passwordForm,
//                     [key]: e.target.value,
//                   })
//                 }
//               />

//               <Eye
//                 className="w-4 h-4 absolute right-3 top-3 text-muted cursor-pointer"
//                 onClick={() => {
//                   const copy = [...show]
//                   copy[idx] = !copy[idx]
//                   setShow(copy)
//                 }}
//               />
//             </div>
//           ))}
//         </div>

//         {/* ================= STATUS ================= */}
//         {passwordError && (
//           <p className="mt-3 text-sm debate-text-status-error">
//             {passwordError}
//           </p>
//         )}

//         {passwordSuccess && (
//           <p className="mt-3 text-sm debate-text-status-success">
//             {passwordSuccess}
//           </p>
//         )}

//         {/* ================= ACTION ================= */}
//         <Button
//           onClick={onChangePassword}
//           className="mt-6 btn-primary"
//         >
//           Update Password
//         </Button>
//       </div>

//       {/* ================= DANGER ZONE ================= */}
//       <div className="border-t border-border pt-8">
//         <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
//           <Trash2 className="w-4 h-4 text-muted" />
//           Account Actions
//         </h3>

//         <Button
//           className="
//             bg-[var(--status-error)]
//             text-white
//             border border-[var(--status-error)]
//             hover:opacity-90
//           "
//         >
//           Delete Account
//         </Button>
//       </div>
//     </Card>
//   )
// }






"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Key, Trash2 } from "lucide-react"

interface PasswordFormState {
  current: string
  newPass: string
  confirmNew: string
}

interface SecurityTabProps {
  passwordForm: PasswordFormState
  onPasswordFormChange: (updated: PasswordFormState) => void
  passwordError: string | null
  passwordSuccess: string | null
  onChangePassword: () => void
}

/* ✅ Strongly typed field config */
const PASSWORD_FIELDS: {
  label: string
  key: keyof PasswordFormState
  idx: number
}[] = [
  { label: "Current password", key: "current", idx: 0 },
  { label: "New password", key: "newPass", idx: 1 },
  { label: "Confirm new password", key: "confirmNew", idx: 2 },
]

export function SecurityTab({
  passwordForm,
  onPasswordFormChange,
  passwordError,
  passwordSuccess,
  onChangePassword,
}: SecurityTabProps) {
  const [show, setShow] = useState<boolean[]>([false, false, false])

  return (
    <Card className="bg-card border border-border p-8">
      {/* ================= TITLE ================= */}
      <h2 className="text-xl font-semibold text-text mb-6">
        Security
      </h2>

      {/* ================= CHANGE PASSWORD ================= */}
      <div className="border border-border rounded-md p-6 mb-10">
        <h3 className="text-sm font-semibold text-text mb-4 flex items-center gap-2">
          <Key className="w-4 h-4 text-primary" />
          Change Password
        </h3>

        <div className="space-y-4">
          {PASSWORD_FIELDS.map(({ label, key, idx }) => (
            <div key={key} className="relative">
              <input
                type={show[idx] ? "text" : "password"}
                placeholder={label}
                className="
                  w-full rounded-md
                  border border-border
                  px-3 py-2 pr-10
                  bg-background text-text
                  outline-none transition
                  focus:border-hover
                "
                value={passwordForm[key]}
                onChange={(e) =>
                  onPasswordFormChange({
                    ...passwordForm,
                    [key]: e.target.value,
                  })
                }
              />

              <Eye
                className="w-4 h-4 absolute right-3 top-3 text-muted cursor-pointer"
                onClick={() => {
                  const copy = [...show]
                  copy[idx] = !copy[idx]
                  setShow(copy)
                }}
              />
            </div>
          ))}
        </div>

        {/* ================= STATUS ================= */}
        {passwordError && (
          <p className="mt-3 text-sm debate-text-status-error">
            {passwordError}
          </p>
        )}

        {passwordSuccess && (
          <p className="mt-3 text-sm debate-text-status-success">
            {passwordSuccess}
          </p>
        )}

        {/* ================= ACTION ================= */}
        <Button
          onClick={onChangePassword}
          className="mt-6 btn-primary"
        >
          Update Password
        </Button>
      </div>

      {/* ================= DANGER ZONE ================= */}
      <div className="border-t border-border pt-8">
        <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-muted" />
          Account Actions
        </h3>

        <Button
          className="
            bg-[var(--status-error)]
            text-white
            border border-[var(--status-error)]
            hover:opacity-90
          "
        >
          Delete Account
        </Button>
      </div>
    </Card>
  )
}
