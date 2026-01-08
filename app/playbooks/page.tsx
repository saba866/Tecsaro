





"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"
import { supabase } from "@/lib/supabaseClient"
import PlaybooksClient from "./playbooks-client"

export default function PlaybooksPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [playbooks, setPlaybooks] = useState<any[]>([])

  // Load playbooks once
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("playbooks")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(20)

      setPlaybooks(data || [])
    }

    load()
  }, [])

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar behaves same as Dashboard */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toggle works same way */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full">
          <header>
            <h1 className="text-3xl font-semibold">Decision Playbooks</h1>
            <p className="text-muted">Make Better Business Decisions — Fast</p>
            <p className="text-muted">Short, structured guides.</p>
          </header>

          <PlaybooksClient playbooks={playbooks} />
        </div>
      </div>
    </div>
  )
}
