


// import LandingSection from "./LandingSection"

// export default function TodayOnTecsaro() {
//   return (
//     <LandingSection
//       title="Today on Tecsaro"
//       subtitle="Live discussions and recent thinking across debates, case studies, and insights."
//     >
//       <div className="grid md:grid-cols-3 gap-6">
//         {[
//           {
//             label: "Case Study",
//             title: "Why Nokia Missed Smartphones",
//             context: "A decision breakdown, not a hindsight story.",
//           },
//           {
//             label: "Debate",
//             title: "AI vs Human Judgment in Hiring",
//             context: "Exploring where automation helps — and where it fails.",
//           },
//           {
//             label: "Insight",
//             title: "Why Speed Hurts Decision Quality",
//             context: "Fast decisions feel efficient — until they fail.",
//           },
//         ].map((item, i) => (
//           <div
//             key={i}
//             tabIndex={0}
//             className="
//               bg-card
//               border border-border
//               p-6
//               transition
//               cursor-pointer
//               card-hover
//               hover:shadow-sm
//               focus:outline-none
//               focus:shadow-sm
//             "
//           >
//             <p className="text-xs uppercase text-primary font-medium">
//               {item.label}
//             </p>

//             <h3 className="mt-2 text-lg font-medium text-foreground">
//               {item.title}
//             </h3>

//             <p className="mt-2 text-sm text-muted">
//               {item.context}
//             </p>

//             <a
//               href="/login"
//               className="mt-4 inline-block text-sm text-primary hover:text-primary-hover"
//             >
//               Read →
//             </a>
//           </div>
//         ))}
//       </div>
//     </LandingSection>
//   )
// }






import LandingSection from "./LandingSection"

export default function TodayOnTecsaro() {
  return (
    <LandingSection
      title="Today on Tecsaro"
      subtitle="Fresh playbooks, real case studies, and decision-making insights."
    >
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            label: "Case Study",
            title: "Why Nokia Missed Smartphones",
            context: "A decision breakdown, not a hindsight story.",
            href: "/login",
          },
          {
            label: "Playbook",
            title: "Should You Raise Money Now?",
            context:
              "A quick framework to evaluate whether funding actually accelerates your business.",
            href: "/login",
          },
          {
            label: "Insight",
            title: "Why Speed Hurts Decision Quality",
            context:
              "Fast decisions feel efficient — until the consequences surface.",
            href: "/login",
          },
        ].map((item, i) => (
          <div
            key={i}
            tabIndex={0}
            className="
              bg-card
              border border-border
              p-6
              transition
              cursor-pointer
              card-hover
              hover:shadow-sm
              focus:outline-none
              focus:shadow-sm
            "
          >
            <p className="text-xs uppercase text-primary font-medium">
              {item.label}
            </p>

            <h3 className="mt-2 text-lg font-medium text-foreground">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-muted">
              {item.context}
            </p>

            <a
              href={item.href}
              className="mt-4 inline-block text-sm text-primary hover:text-primary-hover"
            >
              Read →
            </a>
          </div>
        ))}
      </div>
    </LandingSection>
  )
}
