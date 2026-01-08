




"use client"

import { useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import ContentFeed from "@/components/dashboard/content-feed"

type Playbook = {
  id: string
  title: string
  subtitle: string
  icon: string
  level: string
}

type CaseStudy = {
  id: number
  title: string
  description: string
}

type BusinessTool = {
  id: string
  name: string
  short_description: string
}

export default function DashboardClient({
  playbooks,
  caseStudies,
  tools,
}: {
  playbooks: Playbook[]
  caseStudies: CaseStudy[]
  tools: BusinessTool[]
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#111827]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-hidden flex">
          <ContentFeed
            playbooks={playbooks}
            caseStudies={caseStudies}
            tools={tools}
          />
        </div>
      </div>
    </div>
  )
}



