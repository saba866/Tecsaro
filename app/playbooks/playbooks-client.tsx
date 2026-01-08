"use client"

import { useState, useRef } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function PlaybooksClient({ playbooks }: { playbooks: any[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [pages, setPages] = useState<any[]>([])
  const [pageIndex, setPageIndex] = useState(0)

  const touchStartX = useRef(0)

  const handleTouchStart = (e: any) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: any) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(diff) > 40) {
      if (diff < 0 && pageIndex < pages.length - 1) setPageIndex((n) => n + 1)
      if (diff > 0 && pageIndex > 0) setPageIndex((n) => n - 1)
    }
  }

  const openBook = async (id: string) => {
    setOpenId(id)
    setPageIndex(0)

    const { data } = await supabase
      .from("playbook_pages")
      .select("*")
      .eq("playbook_id", id)
      .order("page_number", { ascending: true })
      .limit(50)

    setPages(data || [])
  }

  const closeBook = () => {
    setOpenId(null)
    setPages([])
    setPageIndex(0)
  }

  return (
    <>
      {/* Covers — instant render */}
      <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
        {playbooks.map((pb) => (
          <div
            key={pb.id}
            onClick={() => openBook(pb.id)}
            className="min-w-[200px] sm:min-w-[220px] card card-hover p-4 cursor-pointer"
          >
            <div className="text-3xl">{pb.icon}</div>
            <h3 className="font-medium text-lg">{pb.title}</h3>
            <p className="text-muted text-sm">{pb.subtitle}</p>
          </div>
        ))}

        {playbooks.length === 0 && (
          <div className="text-muted text-sm px-2 py-1">No playbooks yet</div>
        )}
      </div>

      {/* Reader */}
      {openId && pages.length > 0 && (
        <div
          className="card p-4 sm:p-6 space-y-6 w-full mx-auto max-w-xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <h2 className="text-xl font-semibold">
            {playbooks.find((p) => p.id === openId)?.title}
          </h2>

          <h3 className="font-semibold">{pages[pageIndex].title}</h3>

          {!pages[pageIndex].grid ? (
            <ul className="list-disc pl-6 space-y-1 text-muted">
              {pages[pageIndex].bullets?.map((b: string, i: number) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-md text-sm">
              <div><p className="font-medium">Option A</p></div>
              <div><p className="font-medium">Option B</p></div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              disabled={pageIndex === 0}
              onClick={() => setPageIndex((p) => p - 1)}
              className="btn-secondary disabled:opacity-50"
            >
              ◀ Back
            </button>

            {pageIndex < pages.length - 1 ? (
              <button
                onClick={() => setPageIndex((p) => p + 1)}
                className="btn-primary"
              >
                Next ▶
              </button>
            ) : (
              <button onClick={closeBook} className="btn-secondary">
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
