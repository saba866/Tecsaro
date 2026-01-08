




// "use client"

// import Link from "next/link"

// /* ================= TYPES ================= */

// type TopicDebate = {
//   id: number
//   title: string
//   description: string
//   end_date: string
// }

// type CaseStudy = {
//   id: number
//   title: string
//   description: string
// }

// type BusinessTool = {
//   id: string
//   name: string
//   short_description: string
// }

// /* ================= COMPONENT ================= */

// export default function ContentFeed({
//   activeDebate = null,
//   caseStudies = [],
//   tools = [],
// }: {
//   activeDebate: TopicDebate | null
//   caseStudies: CaseStudy[]
//   tools: BusinessTool[]
// }) {
//   const shortText = (text: string, max = 120) =>
//     text.length > max ? text.slice(0, max) + "…" : text

//   /* ================= DEBATE STATUS LOGIC ================= */

//   const hoursLeft = activeDebate
//     ? Math.ceil(
//         (new Date(activeDebate.end_date).getTime() - Date.now()) /
//           (1000 * 60 * 60)
//       )
//     : 0

//   // ❗ IMPORTANT: ONLY ONE text color class is returned
//   const debateStatusClass =
//     hoursLeft <= 0
//       ? "debate-text-status-error"
//       : "text-muted"

//   /* ================= RENDER ================= */

//   return (
//     <main className="flex-1 overflow-y-auto px-6 py-10 space-y-16 bg-background">
//       {/* ================= TODAY ================= */}
//       <section>
//         <h1 className="text-3xl font-semibold text-foreground mb-8">
//           Today on Tecsaro
//         </h1>

//         <div className="grid md:grid-cols-3 gap-6">
//           {/* ================= ACTIVE DEBATE ================= */}
//           <div className="bg-card border border-border rounded-xl p-6">
//             <p className="text-sm text-muted mb-2">Structured Debate</p>

//             {activeDebate ? (
//               <>
//                 <h2 className="text-lg font-medium text-text mb-1">
//                   {activeDebate.title}
//                 </h2>

//                 {/* 🔴 THIS WILL NOW BE RED WHEN CLOSED */}
//                 <p
//                   className={`text-sm mb-3 ${
//                     hoursLeft <= 0 ? "font-medium" : ""
//                   } ${debateStatusClass}`}
//                 >
//                   {hoursLeft <= 0
//                     ? "● Closed Debate"
//                     : `● Open · Ends in ${hoursLeft} hrs`}
//                 </p>

//                 <p className="text-sm text-muted mb-4">
//                   {shortText(activeDebate.description)}
//                 </p>

//                 <Link
//                   href={`/debates/${activeDebate.id}`}
//                   className="text-sm font-medium text-primary hover:text-primary-hover"
//                 >
//                   View Debate →
//                 </Link>
//               </>
//             ) : (
//               <p className="text-sm text-muted">No active debate</p>
//             )}
//           </div>

//           {/* ================= CASE STUDY ================= */}
//           <div className="bg-card border border-border rounded-xl p-6">
//             <p className="text-sm text-muted mb-2">Case Study</p>

//             {caseStudies[0] ? (
//               <>
//                 <h2 className="text-lg font-medium text-text mb-3">
//                   {caseStudies[0].title}
//                 </h2>

//                 <p className="text-sm text-muted mb-4">
//                   {shortText(caseStudies[0].description)}
//                 </p>

//                 <Link
//                   href="/cases"
//                   className="text-sm font-medium text-primary hover:text-primary-hover"
//                 >
//                   Read Case →
//                 </Link>
//               </>
//             ) : (
//               <p className="text-sm text-muted">No case studies yet</p>
//             )}
//           </div>

//           {/* ================= TOOL ================= */}
//           <div className="bg-card border border-border rounded-xl p-6">
//             <p className="text-sm text-muted mb-2">Explained Tool</p>

//             {tools[0] ? (
//               <>
//                 <h2 className="text-lg font-medium text-text mb-3">
//                   {tools[0].name}
//                 </h2>

//                 <p className="text-sm text-muted mb-4">
//                   {tools[0].short_description}
//                 </p>

//                 <Link
//                   href="/businesstools"
//                   className="text-sm font-medium text-primary hover:text-primary-hover"
//                 >
//                   Explore Tool →
//                 </Link>
//               </>
//             ) : (
//               <p className="text-sm text-muted">No tools yet</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* ================= CASE STUDIES ================= */}
//       {caseStudies.length > 0 && (
//         <section>
//           <h2 className="text-xl font-semibold text-foreground mb-6">
//             Decision Case Studies
//           </h2>

//           <div className="grid md:grid-cols-3 gap-6">
//             {caseStudies.map((c) => (
//               <div
//                 key={c.id}
//                 className="bg-card border border-border rounded-xl p-6"
//               >
//                 <h3 className="font-medium text-text mb-2">{c.title}</h3>

//                 <p className="text-sm text-muted mb-4">
//                   {shortText(c.description)}
//                 </p>

//                 <Link
//                   href="/cases"
//                   className="text-sm font-medium text-primary hover:text-primary-hover"
//                 >
//                   Read →
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* ================= BUSINESS TOOLS ================= */}
//       {tools.length > 0 && (
//         <section>
//           <h2 className="text-xl font-semibold text-foreground mb-6">
//             Business Tools
//           </h2>

//           <div className="grid md:grid-cols-3 gap-6">
//             {tools.map((t) => (
//               <div
//                 key={t.id}
//                 className="bg-card border border-border rounded-xl p-6"
//               >
//                 <h3 className="font-medium text-text mb-2">{t.name}</h3>

//                 <p className="text-sm text-muted mb-4">
//                   {t.short_description}
//                 </p>

//                 <Link
//                   href="/businesstools"
//                   className="text-sm font-medium text-primary hover:text-primary-hover"
//                 >
//                   Explore →
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//     </main>
//   )
// }




"use client"

import Link from "next/link"

/* ================= TYPES ================= */

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

/* ================= COMPONENT ================= */

export default function ContentFeed({
  playbooks = [],
  caseStudies = [],
  tools = [],
}: {
  playbooks: Playbook[]
  caseStudies: CaseStudy[]
  tools: BusinessTool[]
}) {
  const shortText = (text: string, max = 120) =>
    text.length > max ? text.slice(0, max) + "…" : text

  return (
    <main className="flex-1 overflow-y-auto px-6 py-10 space-y-16 bg-background">
      {/* ================= TODAY ================= */}
      <section>
        <h1 className="text-3xl font-semibold text-foreground mb-8">
          Today on Tecsaro
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* ================= FEATURED PLAYBOOK ================= */}
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted mb-2">Featured Playbook</p>

            {playbooks[0] ? (
              <>
                <div className="text-3xl mb-2">{playbooks[0].icon}</div>

                <h2 className="text-lg font-medium text-text mb-1">
                  {playbooks[0].title}
                </h2>

                <p className="text-sm text-muted mb-4">
                  {playbooks[0].subtitle}
                </p>

                <Link
                  href="/playbooks"
                  className="text-sm font-medium text-primary hover:text-primary-hover"
                >
                  View Playbook →
                </Link>
              </>
            ) : (
              <p className="text-sm text-muted">No playbooks yet</p>
            )}
          </div>

          {/* ================= CASE STUDY ================= */}
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted mb-2">Case Study</p>

            {caseStudies[0] ? (
              <>
                <h2 className="text-lg font-medium text-text mb-3">
                  {caseStudies[0].title}
                </h2>

                <p className="text-sm text-muted mb-4">
                  {shortText(caseStudies[0].description)}
                </p>

                <Link
                  href="/cases"
                  className="text-sm font-medium text-primary hover:text-primary-hover"
                >
                  Read Case →
                </Link>
              </>
            ) : (
              <p className="text-sm text-muted">No case studies yet</p>
            )}
          </div>

          {/* ================= TOOL ================= */}
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted mb-2">Explained Tool</p>

            {tools[0] ? (
              <>
                <h2 className="text-lg font-medium text-text mb-3">
                  {tools[0].name}
                </h2>

                <p className="text-sm text-muted mb-4">
                  {tools[0].short_description}
                </p>

                <Link
                  href="/businesstools"
                  className="text-sm font-medium text-primary hover:text-primary-hover"
                >
                  Explore Tool →
                </Link>
              </>
            ) : (
              <p className="text-sm text-muted">No tools yet</p>
            )}
          </div>
        </div>
      </section>

      {/* ================= CASE STUDIES ================= */}
      {caseStudies.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Decision Case Studies
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((c) => (
              <div
                key={c.id}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="font-medium text-text mb-2">{c.title}</h3>

                <p className="text-sm text-muted mb-4">
                  {shortText(c.description)}
                </p>

                <Link
                  href="/cases"
                  className="text-sm font-medium text-primary hover:text-primary-hover"
                >
                  Read →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= BUSINESS TOOLS ================= */}
      {tools.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Business Tools
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((t) => (
              <div
                key={t.id}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="font-medium text-text mb-2">{t.name}</h3>

                <p className="text-sm text-muted mb-4">
                  {t.short_description}
                </p>

                <Link
                  href="/businesstools"
                  className="text-sm font-medium text-primary hover:text-primary-hover"
                >
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
