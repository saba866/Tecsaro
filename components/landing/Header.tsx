



// "use client"

// import { useState, useRef, useEffect } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { ChevronDown } from "lucide-react"

// type MenuKey = "debates" | "cases" | "tools" | "insights" | null

// export default function Header() {
//   const [openMenu, setOpenMenu] = useState<MenuKey>(null)
//   const [isSticky, setIsSticky] = useState(false)
//   const headerRef = useRef<HTMLDivElement>(null)

//   /* Sticky on scroll */
//   useEffect(() => {
//     const onScroll = () => {
//       setIsSticky(window.scrollY > 40)
//     }
//     window.addEventListener("scroll", onScroll)
//     return () => window.removeEventListener("scroll", onScroll)
//   }, [])

//   /* Close dropdown on outside click / ESC */
//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
//         setOpenMenu(null)
//       }
//     }
//     function handleKey(e: KeyboardEvent) {
//       if (e.key === "Escape") setOpenMenu(null)
//     }

//     document.addEventListener("mousedown", handleClick)
//     document.addEventListener("keydown", handleKey)
//     return () => {
//       document.removeEventListener("mousedown", handleClick)
//       document.removeEventListener("keydown", handleKey)
//     }
//   }, [])

//   return (
//     <>
//       {/* Spacer to prevent layout jump */}
//       {isSticky && <div className="h-[80px]" />}

//       <header
//         ref={headerRef}
//         className={`
//           w-full z-50
//           transition-all duration-300
//           border-b border-border
//           bg-card
//           ${isSticky ? "fixed top-0 shadow-sm" : "relative"}
//         `}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <img
//               src="/downtecsarologo.png"
//               alt="Tecsaro"
//               className="h-14 w-auto"
//             />
//           </Link>

//           {/* Navigation */}
//           <nav className="hidden md:flex items-center gap-10 text-sm">
//             {menuItem({
//               label: "Debates",
//               keyName: "debates",
//               openMenu,
//               setOpenMenu,
//               description: "Structured discussions on real business questions.",
//               items: [
//                 "Live Debates",
//                 "Closed Debates",
//                 "Debate Outcomes",
//                 "How Debates Work",
//               ],
//             })}

//             {menuItem({
//               label: "Case Studies",
//               keyName: "cases",
//               openMenu,
//               setOpenMenu,
//               description:
//                 "Decision-focused analysis of real business situations.",
//               items: [
//                 "Decision Case Studies",
//                 "Strategy & Failure Cases",
//                 "Leadership Decisions",
//                 "Case Study Archive",
//               ],
//             })}

//             {menuItem({
//               label: "Tools",
//               keyName: "tools",
//               openMenu,
//               setOpenMenu,
//               description:
//                 "Practical tools, platforms, and resources worth knowing.",
//               items: [
//                 "Recommended Tools",
//                 "Hidden / Underrated Tools",
//                 "AI & Automation Tools",
//                 "Tool Insights",
//               ],
//             })}

//             {menuItem({
//               label: "Insights",
//               keyName: "insights",
//               openMenu,
//               setOpenMenu,
//               description:
//                 "Clear explanations of business trends and decisions.",
//               items: [
//                 "Business Insights",
//                 "News Explained",
//                 "Frameworks & Mental Models",
//                 "Editor’s Picks",
//               ],
//             })}
//           </nav>

//           {/* CTA */}
//           <Link href="/signup">
//             <Button className="btn-primary transition">
//               Get Started
//             </Button>
//           </Link>
//         </div>
//       </header>
//     </>
//   )
// }

// /* ================= MENU ITEM ================= */

// function menuItem({
//   label,
//   keyName,
//   description,
//   items,
//   openMenu,
//   setOpenMenu,
// }: {
//   label: string
//   keyName: MenuKey
//   description: string
//   items: string[]
//   openMenu: MenuKey
//   setOpenMenu: (v: MenuKey) => void
// }) {
//   const open = openMenu === keyName

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setOpenMenu(keyName)}
//       onMouseLeave={() => setOpenMenu(null)}
//     >
//       <button
//         onClick={() => setOpenMenu(open ? null : keyName)}
//         className="
//           flex items-center gap-1
//           text-muted
//           hover:text-primary
//         "
//       >
//         {label}
//         <ChevronDown size={14} />
//       </button>

//       <span
//         className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all ${
//           open ? "w-full" : "w-0"
//         }`}
//       />

//       {open && (
//         <div className="absolute left-0 top-full pt-3 z-50">
//           <div className="w-72 rounded-md border border-border bg-card shadow-sm">
//             <div className="px-4 py-3 text-xs text-muted border-b border-border">
//               {description}
//             </div>

//             {items.map((item) => (
//               <Link
//                 key={item}
//                 href="#"
//                 className="block px-4 py-2 text-sm hover:bg-accent"
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }






"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

type MenuKey = "playbooks" | "cases" | "tools" | "insights" | null

export default function Header() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null)
  const [isSticky, setIsSticky] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  /* Sticky on scroll */
  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Close dropdown on outside click / ESC */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null)
    }

    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [])

  return (
    <>
      {/* Spacer to prevent layout jump */}
      {isSticky && <div className="h-[80px]" />}

      <header
        ref={headerRef}
        className={`w-full z-50 transition-all duration-300 border-b border-border bg-card ${
          isSticky ? "fixed top-0 shadow-sm" : "relative"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/downtecsarologo.png" alt="Tecsaro" className="h-14 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-sm">
            {menuItem({
              label: "Playbooks",
              keyName: "playbooks",
              openMenu,
              setOpenMenu,
              description: "Short, structured guides for better decision-making.",
              items: [
                "All Playbooks",
                "Startup Decisions",
                "Growth & Scaling",
                "Leadership & Ops",
              ],
            })}

            {menuItem({
              label: "Case Studies",
              keyName: "cases",
              openMenu,
              setOpenMenu,
              description:
                "Decision-focused analysis of real business situations.",
              items: [
                "Decision Case Studies",
                "Strategy & Failure Cases",
                "Leadership Decisions",
                "Case Study Archive",
              ],
            })}

            {menuItem({
              label: "Tools",
              keyName: "tools",
              openMenu,
              setOpenMenu,
              description:
                "Practical tools, platforms, and resources worth knowing.",
              items: [
                "Recommended Tools",
                "Hidden / Underrated Tools",
                "AI & Automation Tools",
                "Tool Insights",
              ],
            })}

            {menuItem({
              label: "Insights",
              keyName: "insights",
              openMenu,
              setOpenMenu,
              description:
                "Clear explanations of business trends and decisions.",
              items: [
                "Business Insights",
                "News Explained",
                "Frameworks & Mental Models",
                "Editor’s Picks",
              ],
            })}
          </nav>

          {/* CTA */}
          <Link href="/signup">
            <Button className="btn-primary transition">Get Started</Button>
          </Link>
        </div>
      </header>
    </>
  )
}

/* ================= MENU ITEM ================= */

function menuItem({
  label,
  keyName,
  description,
  items,
  openMenu,
  setOpenMenu,
}: {
  label: string
  keyName: MenuKey
  description: string
  items: string[]
  openMenu: MenuKey
  setOpenMenu: (v: MenuKey) => void
}) {
  const open = openMenu === keyName

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(keyName)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button
        onClick={() => setOpenMenu(open ? null : keyName)}
        className="flex items-center gap-1 text-muted hover:text-primary"
      >
        {label}
        <ChevronDown size={14} />
      </button>

      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all ${
          open ? "w-full" : "w-0"
        }`}
      />

      {open && (
        <div className="absolute left-0 top-full pt-3 z-50">
          <div className="w-72 rounded-md border border-border bg-card shadow-sm">
            <div className="px-4 py-3 text-xs text-muted border-b border-border">
              {description}
            </div>

            {items.map((item) => (
              <Link
                key={item}
                href="#"
                className="block px-4 py-2 text-sm hover:bg-accent"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
