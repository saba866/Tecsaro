


import Link from "next/link"

export default function FinalCTA() {
  return (
    <section className="py-32 bg-card border-t border-border">
      <div className="max-w-3xl mx-auto px-6 text-center">

        <h2 className="mb-8 text-3xl md:text-4xl font-semibold text-foreground leading-snug">
          Access a structured way to think about business decisions
        </h2>

        <Link href="/signup">
          <button className="px-10 py-3.5 text-sm font-medium transition btn-primary">
            Create Account
          </button>
        </Link>

      </div>
    </section>
  )
}
