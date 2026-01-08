


// // components/landing/ContentPreview.tsx

// function PreviewCard({
//   type,
//   title,
//   description,
//   meta,
// }: {
//   type: string
//   title: string
//   description: string
//   meta: string
// }) {
//   return (
//     <div className="card card-hover p-6 space-y-4 transition">
//       <span className="text-xs font-semibold uppercase tracking-widest text-primary">
//         {type}
//       </span>

//       <h3 className="text-lg font-semibold text-text leading-snug">
//         {title}
//       </h3>

//       <p className="text-sm leading-relaxed text-muted">
//         {description}
//       </p>

//       <p className="text-xs text-muted">
//         {meta}
//       </p>
//     </div>
//   )
// }

// export default function ContentPreview() {
//   return (
//     <section className="py-24 border-t border-border bg-background">
//       <div className="max-w-7xl mx-auto px-8 lg:px-16">

//         {/* Header */}
//         <div className="mb-16">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-8 h-[2px] bg-primary" />
//             <span className="text-xs font-semibold tracking-widest uppercase text-muted">
//               Platform Preview
//             </span>
//           </div>

//           <h2 className="text-4xl font-semibold text-text tracking-tight">
//             Inside the Platform
//           </h2>
//         </div>

//         {/* Cards */}
//         <div className="grid md:grid-cols-3 gap-8">

//           <PreviewCard
//             type="Debate"
//             title="Platform Strategy: Build vs. Buy"
//             description="A structured examination of technology platform decisions, analyzing cost structures, capability gaps, and strategic control."
//             meta="12 perspectives · Framework-based"
//           />

//           <PreviewCard
//             type="Case Study"
//             title="Market Entry: Southeast Asia Expansion"
//             description="Decision analysis of a B2B SaaS company's regional expansion strategy, including timing, localization, and competitive positioning."
//             meta="Strategy · Expansion · 2024"
//           />

//           <PreviewCard
//             type="Tool"
//             title="Decision Quality Framework"
//             description="A systematic tool for evaluating decision quality across six dimensions: framing, alternatives, information, values, logic, and commitment."
//             meta="Framework · Analysis Tool"
//           />

//         </div>
//       </div>
//     </section>
//   )
// }






// components/landing/ContentPreview.tsx

function PreviewCard({
  type,
  title,
  description,
  meta,
}: {
  type: string
  title: string
  description: string
  meta: string
}) {
  return (
    <div className="card card-hover p-6 space-y-4 transition">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">
        {type}
      </span>

      <h3 className="text-lg font-semibold text-text leading-snug">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-muted">
        {description}
      </p>

      <p className="text-xs text-muted">
        {meta}
      </p>
    </div>
  )
}

export default function ContentPreview() {
  return (
    <section className="py-24 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted">
              Platform Preview
            </span>
          </div>

          <h2 className="text-4xl font-semibold text-text tracking-tight">
            Inside the Platform
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Playbook card replaces Debate */}
          <PreviewCard
            type="Playbook"
            title="Should You Build or Buy?"
            description="Short, structured decision guide on choosing between building internal capability or leveraging external software."
            meta="Timing · Trade-offs · Risks"
          />

          <PreviewCard
            type="Case Study"
            title="Market Entry: Southeast Asia Expansion"
            description="Decision analysis of a B2B SaaS company's regional expansion strategy, including timing, localization, and competitive positioning."
            meta="Strategy · Expansion · 2024"
          />

          <PreviewCard
            type="Tool"
            title="Decision Quality Framework"
            description="A systematic tool for evaluating decision quality across six dimensions: framing, alternatives, information, values, logic, and commitment."
            meta="Framework · Analysis Tool"
          />

        </div>
      </div>
    </section>
  )
}
