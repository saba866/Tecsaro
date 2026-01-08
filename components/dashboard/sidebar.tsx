
// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { usePathname, useRouter } from "next/navigation"
// import {
//   LayoutDashboard,
//   MessageSquare,
//   BookOpen,
//   Wrench,
//   Lightbulb,
//   Newspaper,
//   Users,
//   Bookmark,
//   Settings,
//   LogOut,
//   X,
// } from "lucide-react"
// import { supabase } from "@/lib/supabaseClient"

// /* ================= PROPS ================= */

// type SidebarProps = {
//   isOpen: boolean
//   onClose: () => void
// }

// /* ================= NAV ================= */

// const primaryNav = [
//   { label: "Home", href: "/dashboard", icon: LayoutDashboard },
//   { label: "Debates", href: "/debates", icon: MessageSquare },
//   { label: "Case Studies", href: "/cases", icon: BookOpen },
//   { label: "Business Tools", href: "/businesstools", icon: Wrench },
//   { label: "Insights", href: "/learning", icon: Lightbulb },
//   { label: "News", href: "/news", icon: Newspaper },
//   { label: "Saved", href: "/Saved", icon: Bookmark },
// ]

// /* ================= COMPONENT ================= */

// export default function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const pathname = usePathname()
//   const router = useRouter()

//   const isActive = (href: string) => pathname === href

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//     router.push("/login")
//   }

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 bg-black/40 z-30 md:hidden"
//         />
//       )}

//       <aside
//         className={`
//           fixed md:static inset-y-0 left-0 z-40
//           w-64 bg-card border-r border-border
//           flex flex-col
//           transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         {/* Brand */}
//         <div className="px-6 h-16 flex items-center gap-2 border-b border-border">
//           <Image src="/teclogo.png" alt="Tecsaro Logo" width={40} height={40} />
//           <Link
//             href="/dashboard"
//             className="text-2xl font-semibold text-foreground"
//             onClick={onClose}
//           >
//             Tecsaro
//           </Link>

//           {/* Close button (mobile) */}
//           <button
//             onClick={onClose}
//             className="ml-auto md:hidden text-muted hover:text-foreground"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-3 py-6 space-y-1">
//           {primaryNav.map((item) => {
//             const active = isActive(item.href)

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={onClose}
//                 className={`
//                   relative flex items-center gap-3 px-3 py-2 rounded-md
//                   text-sm font-medium transition
//                   ${
//                     active
//                       ? "text-foreground bg-accent"
//                       : "text-muted hover:text-foreground hover:bg-accent"
//                   }
//                 `}
//               >
//                 {active && (
//                   <span className="absolute left-0 w-1 h-5 bg-primary rounded-r" />
//                 )}

//                 <item.icon
//                   className={`w-5 h-5 ${
//                     active ? "text-primary" : "text-muted"
//                   }`}
//                 />

//                 {item.label}
//               </Link>
//             )
//           })}
//         </nav>

//         {/* Utilities */}
//         <div className="px-3 py-4 border-t border-border space-y-1">
//           <Link
//             href="/profile"
//             onClick={onClose}
//             className="flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md transition"
//           >
//             <Users className="w-5 h-5" />
//             Profile
//           </Link>

//           <Link
//             href="/settings"
//             onClick={onClose}
//             className="flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md transition"
//           >
//             <Settings className="w-5 h-5" />
//             Settings
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md transition"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   )
// }





// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { usePathname, useRouter } from "next/navigation"
// import {
//   LayoutDashboard,
//   MessageSquare,
//   BookOpen,
//   Wrench,
//   Lightbulb,
//   Newspaper,
//   Users,
//   Bookmark,
//   Settings,
//   LogOut,
//   X,
// } from "lucide-react"
// import { supabase } from "@/lib/supabaseClient"

// type SidebarProps = {
//   isOpen: boolean
//   onClose: () => void
// }

// const primaryNav = [
//   { label: "Home", href: "/dashboard", icon: LayoutDashboard },
//   { label: "PlayBook", href: "/playbooks", icon: MessageSquare },
//   { label: "Case Studies", href: "/cases", icon: BookOpen },
//   { label: "Business Tools", href: "/businesstools", icon: Wrench },
//   { label: "Insights", href: "/learning", icon: Lightbulb },
//   { label: "News", href: "/news", icon: Newspaper },
//   { label: "Saved", href: "/saved", icon: Bookmark },
// ]

// export default function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const pathname = usePathname()
//   const router = useRouter()

//   const isActive = (href: string) => pathname === href

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//     router.push("/login")
//   }

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 bg-black/40 z-30 md:hidden"
//         />
//       )}

//       <aside
//         className={`
//           z-40 w-64 bg-card border-r border-border flex flex-col
//           transition-transform duration-300

//           /* DESKTOP */
//           hidden md:flex md:static md:translate-x-0

//           /* MOBILE */
//           fixed inset-y-0 left-0
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         {/* Brand */}
//         <div className="px-6 h-16 flex items-center gap-2 border-b border-border">
//           <Image src="/teclogo.png" alt="Tecsaro Logo" width={36} height={36} />
//           <Link
//             href="/dashboard"
//             className="text-xl font-semibold text-foreground"
//             onClick={onClose}
//           >
//             Tecsaro
//           </Link>

//           <button
//             onClick={onClose}
//             className="ml-auto md:hidden text-muted hover:text-foreground"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-3 py-6 space-y-1">
//           {primaryNav.map((item) => {
//             const active = isActive(item.href)

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={onClose}
//                 className={`
//                   relative flex items-center gap-3 px-3 py-2 rounded-md
//                   text-sm font-medium transition
//                   ${
//                     active
//                       ? "text-foreground bg-accent"
//                       : "text-muted hover:text-foreground hover:bg-accent"
//                   }
//                 `}
//               >
//                 {active && (
//                   <span className="absolute left-0 w-1 h-5 bg-primary rounded-r" />
//                 )}

//                 <item.icon
//                   className={`w-5 h-5 ${
//                     active ? "text-primary" : "text-muted"
//                   }`}
//                 />

//                 {item.label}
//               </Link>
//             )
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="px-3 py-4 border-t border-border space-y-1">
//           <Link
//             href="/profile"
//             onClick={onClose}
//             className="flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md"
//           >
//             <Users className="w-5 h-5" />
//             Profile
//           </Link>

//           <Link
//             href="/settings"
//             onClick={onClose}
//             className="flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md"
//           >
//             <Settings className="w-5 h-5" />
//             Settings
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   )
// }









// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { usePathname, useRouter } from "next/navigation"
// import {
//   LayoutDashboard,
//   BookOpen,
//   Wrench,
//   Lightbulb,
//   Newspaper,
//   Users,
//   Bookmark,
//   Settings,
//   LogOut,
//   MessageSquare,
// } from "lucide-react"
// import { supabase } from "@/lib/supabaseClient"

// type SidebarProps = {
//   isOpen: boolean
//   onClose: () => void
// }

// const primaryNav = [
//   { label: "Home", href: "/dashboard", icon: LayoutDashboard },
//   { label: "Playbooks", href: "/playbooks", icon: MessageSquare },
//   { label: "Case Studies", href: "/cases", icon: BookOpen },
//   { label: "Business Tools", href: "/businesstools", icon: Wrench },
//   { label: "Insights", href: "/learning", icon: Lightbulb },
//   { label: "News", href: "/news", icon: Newspaper },
//   { label: "Saved", href: "/saved", icon: Bookmark },
// ]

// export default function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const pathname = usePathname()
//   const router = useRouter()

//   const isActive = (href: string) => pathname === href

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//     router.push("/login")
//   }

//   return (
//     <>
//       {/* Mobile dark overlay */}
//       {isOpen && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 bg-black/40 z-30 md:hidden"
//         />
//       )}

//       <aside
//         className={`
//           z-40 w-64 bg-card border-r border-border flex flex-col
//           transition-transform duration-300

//           /* DESKTOP */
//           hidden md:flex md:translate-x-0 md:static

//           /* MOBILE */
//           fixed inset-y-0 left-0
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         {/* Logo + Close */}
//         <div className="px-6 h-16 flex items-center gap-2 border-b border-border">
//           <Image src="/teclogo.png" alt="Tecsaro Logo" width={36} height={36} />

//           <Link
//             href="/dashboard"
//             className="text-xl font-semibold text-foreground"
//             onClick={onClose}
//           >
//             Tecsaro
//           </Link>

//           {/* Close button (only mobile) */}
//           <button
//             onClick={onClose}
//             className="ml-auto md:hidden text-muted hover:text-foreground"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-3 py-6 space-y-1">
//           {primaryNav.map((item) => {
//             const active = isActive(item.href)

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={onClose}
//                 className={`
//                   relative flex items-center gap-3 px-3 py-2 rounded-md
//                   text-sm font-medium transition
//                   ${
//                     active
//                       ? "bg-accent text-foreground"
//                       : "text-muted hover:text-foreground hover:bg-accent"
//                   }
//                 `}
//               >
//                 {active && (
//                   <span className="absolute left-0 w-1 h-5 bg-primary rounded-r" />
//                 )}

//                 <item.icon
//                   className={`w-5 h-5 ${
//                     active ? "text-primary" : "text-muted"
//                   }`}
//                 />

//                 {item.label}
//               </Link>
//             )
//           })}
//         </nav>

//         {/* Footer Links */}
//         <div className="px-3 py-4 border-t border-border space-y-1">
//           <Link
//             href="/profile"
//             onClick={onClose}
//             className="flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md"
//           >
//             <Users className="w-5 h-5" />
//             Profile
//           </Link>

//           <Link
//             href="/settings"
//             onClick={onClose}
//             className="flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md"
//           >
//             <Settings className="w-5 h-5" />
//             Settings
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   )
// }




"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Wrench,
  Lightbulb,
  Newspaper,
  Users,
  Bookmark,
  Settings,
  LogOut,
  MessageSquare,
} from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

const primaryNav = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Playbooks", href: "/playbooks", icon: MessageSquare },
  { label: "Case Studies", href: "/cases", icon: BookOpen },
  { label: "Business Tools", href: "/businesstools", icon: Wrench },
  { label: "Insights", href: "/learning", icon: Lightbulb },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Saved", href: "/saved", icon: Bookmark },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => pathname === href

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
        />
      )}

      <aside
        className={`
          z-40 w-64 bg-card border-r border-border flex flex-col
          transition-transform duration-300

          /* Desktop fixed */
          md:translate-x-0 md:static md:flex

          /* Mobile */
          fixed inset-y-0 left-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo + Close */}
        <div className="px-6 h-16 flex items-center gap-2 border-b border-border">
          <Image src="/teclogo.png" alt="Tecsaro Logo" width={36} height={36} />

          <Link
            href="/dashboard"
            onClick={onClose}
            className="text-xl font-semibold text-foreground"
          >
            Tecsaro
          </Link>

          <button
            onClick={onClose}
            className="ml-auto md:hidden text-muted hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {primaryNav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  relative flex items-center gap-3 px-3 py-2 rounded-md
                  text-sm font-medium transition
                  ${
                    active
                      ? "bg-accent text-foreground"
                      : "text-muted hover:text-foreground hover:bg-accent"
                  }
                `}
              >
                {active && (
                  <span className="absolute left-0 w-1 h-5 bg-primary rounded-r" />
                )}

                <item.icon
                  className={`w-5 h-5 ${
                    active ? "text-primary" : "text-muted"
                  }`}
                />

                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-border space-y-1">
          <Link
            href="/profile"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 text-sm
            text-muted hover:text-foreground hover:bg-accent rounded-md"
          >
            <Users className="w-5 h-5" />
            Profile
          </Link>

          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 text-sm
            text-muted hover:text-foreground hover:bg-accent rounded-md"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm
            text-muted hover:text-foreground hover:bg-accent rounded-md"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}





// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { usePathname, useRouter } from "next/navigation"
// import {
//   LayoutDashboard,
//   BookOpen,
//   Wrench,
//   Lightbulb,
//   Newspaper,
//   Users,
//   Bookmark,
//   Settings,
//   LogOut,
//   MessageSquare,
// } from "lucide-react"
// import { supabase } from "@/lib/supabaseClient"

// type SidebarProps = {
//   isOpen: boolean
//   onClose: () => void
// }

// const primaryNav = [
//   { label: "Home", href: "/dashboard", icon: LayoutDashboard },
//   { label: "Playbooks", href: "/playbooks", icon: MessageSquare },
//   { label: "Case Studies", href: "/cases", icon: BookOpen },
//   { label: "Business Tools", href: "/businesstools", icon: Wrench },
//   { label: "Insights", href: "/learning", icon: Lightbulb },
//   { label: "News", href: "/news", icon: Newspaper },
//   { label: "Saved", href: "/saved", icon: Bookmark },
// ]

// export default function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const pathname = usePathname()
//   const router = useRouter()

//   const isActive = (href: string) => pathname === href

//   const closeIfMobile = () => {
//     if (window.innerWidth < 768) onClose()
//   }

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//     router.push("/login")
//   }

//   return (
//     <>
//       {isOpen && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 bg-black/40 z-20 md:hidden"
//         />
//       )}

//       <aside
//         className={`
//           z-40 w-64 bg-card border-r border-border flex flex-col
//           transition-transform duration-300
//           md:translate-x-0 md:static md:flex
//           fixed inset-y-0 left-0
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         <div className="px-6 h-16 flex items-center gap-2 border-b border-border">
//           <Image src="/teclogo.png" alt="Tecsaro Logo" width={36} height={36} />
//           <Link href="/dashboard" onClick={closeIfMobile} className="text-xl font-semibold text-foreground">
//             Tecsaro
//           </Link>

//           <button
//             onClick={onClose}
//             className="ml-auto md:hidden text-muted hover:text-foreground"
//           >
//             ✕
//           </button>
//         </div>

//         <nav className="flex-1 px-3 py-6 space-y-1">
//           {primaryNav.map((item) => {
//             const active = isActive(item.href)
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={closeIfMobile}
//                 className={`
//                   relative flex items-center gap-3 px-3 py-2 rounded-md
//                   text-sm font-medium transition
//                   ${
//                     active
//                       ? "bg-accent text-foreground"
//                       : "text-muted hover:text-foreground hover:bg-accent"
//                   }
//                 `}
//               >
//                 {active && (
//                   <span className="absolute left-0 w-1 h-5 bg-primary rounded-r" />
//                 )}

//                 <item.icon
//                   className={`w-5 h-5 ${active ? "text-primary" : "text-muted"}`}
//                 />

//                 {item.label}
//               </Link>
//             )
//           })}
//         </nav>

//         <div className="px-3 py-4 border-t border-border space-y-1">
//           <Link href="/profile" onClick={closeIfMobile} className="flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md">
//             <Users className="w-5 h-5" />
//             Profile
//           </Link>

//           <Link href="/settings" onClick={closeIfMobile} className="flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md">
//             <Settings className="w-5 h-5" />
//             Settings
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-2 text-sm
//             text-muted hover:text-foreground hover:bg-accent rounded-md"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   )
// }
