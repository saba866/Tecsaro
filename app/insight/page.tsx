




// app/insights/page.tsx
"use client"

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"

export default function InsightsPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-8 lg:px-16 max-w-4xl">

          {/* Back navigation */}
          <BackToHome />

          {/* ================= PAGE HEADER ================= */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                Insights
              </span>
            </div>

            <h1 className="text-4xl font-semibold text-foreground tracking-tight">
              Business Insights
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
              Clear explanations of what matters — and why.
            </p>
          </div>

          {/* ================= INTRO ================= */}
          <section className="bg-card p-8 border border-border mb-8">
            <p className="text-text leading-relaxed">
              Business Insights on Tecsaro explain:
            </p>

            <ul className="list-disc pl-5 mt-4 space-y-2 text-text">
              <li>Market movements</li>
              <li>Business trends</li>
              <li>Strategic shifts</li>
              <li>Industry signals</li>
            </ul>
          </section>

          {/* ================= WHAT TO EXPECT ================= */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              What to Expect
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
              <li>Context behind headlines</li>
              <li>Implications for decision-makers</li>
              <li>Practical interpretation, not speculation</li>
            </ul>
          </section>

          {/* ================= WHAT THIS IS NOT ================= */}
          <section className="bg-card p-8 border border-border mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              What This Is Not
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
              <li>Breaking news</li>
              <li>Investment recommendations</li>
              <li>Financial or legal advice</li>
            </ul>
          </section>

          {/* ================= CLOSING ================= */}
          <section className="border-t pt-6">
            <p className="text-text leading-relaxed">
              Insights are written to support better thinking, not faster
              reactions.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </>
  )
}
