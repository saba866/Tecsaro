


// components/landing/DecisionFlow.tsx

function FlowStep({
  step,
  title,
  isLast,
}: {
  step: string
  title: string
  isLast?: boolean
}) {
  return (
    <div className="flex items-center">
      <div className="px-6 py-4 border border-border bg-card text-center min-w-[140px]">
        <p className="text-xs font-semibold text-muted mb-1">
          {step}
        </p>
        <p className="text-sm font-medium text-text">
          {title}
        </p>
      </div>

      {!isLast && (
        <div className="hidden md:block w-12 h-px bg-border" />
      )}
    </div>
  )
}

export default function DecisionFlow() {
  return (
    <section id="process" className="py-24 bg-card">
      <div className="max-w-5xl mx-auto px-8 lg:px-16">

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted">
              Decision Process
            </span>
            <div className="w-8 h-[2px] bg-primary" />
          </div>

          <h2 className="text-4xl font-semibold text-foreground tracking-tight">
            Structured Thinking Model
          </h2>
        </div>

        {/* Flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <FlowStep step="Step 1" title="Observe" />
          <FlowStep step="Step 2" title="Evaluate" />
          <FlowStep step="Step 3" title="Decide" isLast />
        </div>

        {/* Description */}
        <p className="mt-12 text-center max-w-2xl mx-auto text-sm leading-relaxed text-muted">
          A systematic approach to business decision-making. Each phase builds
          analytical depth, reduces cognitive bias, and improves judgment quality.
        </p>

      </div>
    </section>
  )
}
