

// "use client"

// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { Menu } from "lucide-react"
// import { supabase } from "@/lib/supabaseClient"

// interface HeaderProps {
//   onMenuClick?: () => void
// }

// export default function Header({ onMenuClick }: HeaderProps) {
//   const [mounted, setMounted] = useState(false)
//   const [initials, setInitials] = useState("")

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   useEffect(() => {
//     if (!mounted) return

//     const loadUser = async () => {
//       const { data } = await supabase.auth.getUser()
//       const user = data?.user
//       if (!user) return

//       const { data: profile } = await supabase
//         .from("users")
//         .select("first_name, last_name")
//         .eq("id", user.id)
//         .single()

//       if (profile?.first_name) {
//         const first = profile.first_name[0] ?? ""
//         const last = profile.last_name?.[0] ?? ""
//         setInitials((first + last).toUpperCase())
//       }
//     }

//     loadUser()
//   }, [mounted])

//   return (
//     <header className="h-16 bg-card border-b border-border flex items-center justify-between px-10">
//       {/* Left */}
//       <div className="flex items-center gap-3">
//         {onMenuClick && (
//           <button onClick={onMenuClick} className="md:hidden text-foreground">
//             <Menu className="w-5 h-5" />
//           </button>
//         )}
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-4">
//         <Link href="/profile">
//           <div
//             className="
//               w-9 h-9 rounded-full
//               flex items-center justify-center
//               text-sm font-semibold
//               cursor-pointer select-none transition
//               bg-avatar text-avatar
//               hover:ring-2 hover:ring-avatar
//             "
//           >
//             {mounted ? initials : ""}
//           </div>
//         </Link>
//       </div>
//     </header>
//   )
// }





"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

interface HeaderProps {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [initials, setInitials] = useState("")

  useEffect(() => {
    let isMounted = true

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      const user = data?.user
      if (!user || !isMounted) return

      const { data: profile } = await supabase
        .from("users")
        .select("first_name, last_name")
        .eq("id", user.id)
        .single()

      if (!isMounted) return

      if (profile?.first_name) {
        const first = profile.first_name[0] ?? ""
        const last = profile.last_name?.[0] ?? ""
        setInitials((first + last).toUpperCase())
      }
    }

    loadUser()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-10">
      {/* Left */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden text-foreground"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Link href="/profile">
          <div
            className="
              w-9 h-9 rounded-full
              flex items-center justify-center
              text-sm font-semibold
              cursor-pointer select-none transition
              bg-avatar text-avatar
              hover:ring-2 hover:ring-avatar
            "
          >
            {initials || "•"}
          </div>
        </Link>
      </div>
    </header>
  )
}
