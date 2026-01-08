


"use client"

import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"

export default function DebateLayout({
  sidebarOpen,
  setSidebarOpen,
  children,
}: any) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
