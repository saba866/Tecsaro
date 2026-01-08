"use client"

export default function DebateToasts({ toasts }: any) {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
      {toasts.map((t: any) => (
        <div
          key={t.id}
          className="px-4 py-2 rounded-lg shadow-lg bg-neutral-900 text-white text-sm"
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
