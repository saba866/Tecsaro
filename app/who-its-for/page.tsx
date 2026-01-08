



"use client"

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"

export default function WhoItsForPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">

          {/* Back */}
          <BackToHome />

          {/* ================= PAGE HEADER ================= */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                Platform Fit
              </span>
            </div>

            <h1 className="text-4xl font-semibold text-foreground leading-tight mb-4">
              Who Tecsaro Is For
            </h1>

            <p className="text-base text-muted leading-relaxed max-w-3xl">
              Tecsaro is built for people who care about how decisions are made,
              not just what the outcomes are.
            </p>
          </div>

          {/* ================= INTRO ================= */}
          <section className="mb-16">
            <p className="text-text leading-relaxed mb-4">
              It is not for chasing trends, quick opinions, or surface-level advice.
            </p>
            <p className="text-text leading-relaxed">
              It is for thoughtful individuals who want to understand reasoning,
              trade-offs, and judgment in business.
            </p>
          </section>

          {/* ================= FOUNDERS ================= */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Founders & Startup Builders
            </h2>

            <p className="text-text mb-4">
              Tecsaro is for founders who:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-muted mb-6">
              <li>face complex decisions with incomplete information</li>
              <li>want to learn from real decision scenarios, not motivational stories</li>
              <li>care more about decision quality than short-term validation</li>
            </ul>

            <p className="text-text mb-3">You’ll find:</p>

            <ul className="list-disc pl-6 space-y-2 text-muted">
              <li>debates on strategic trade-offs</li>
              <li>case studies focused on choices, not just success or failure</li>
              <li>insights that help you think through uncertainty</li>
            </ul>
          </section>

          {/* ================= PROFESSIONALS ================= */}
          <section className="mb-16 bg-card border border-border p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Business Professionals & Managers
            </h2>

            <p className="text-text mb-4">
              Tecsaro is for professionals who:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-muted mb-6">
              <li>make decisions that affect teams, products, or outcomes</li>
              <li>want structured thinking instead of scattered opinions</li>
              <li>value reasoning over authority</li>
            </ul>

            <p className="text-text mb-3">You’ll find:</p>

            <ul className="list-disc pl-6 space-y-2 text-muted">
              <li>discussions on real-world business dilemmas</li>
              <li>frameworks to analyze decisions</li>
              <li>perspectives that reduce noise and bias</li>
            </ul>
          </section>

          {/* ================= STUDENTS ================= */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Students & Learners of Business
            </h2>

            <p className="text-text mb-4">
              Tecsaro is for learners who:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-muted mb-6">
              <li>want to understand why companies act the way they do</li>
              <li>are curious about real decision-making beyond textbooks</li>
              <li>want exposure to multiple viewpoints</li>
            </ul>

            <p className="text-text mb-3">You’ll find:</p>

            <ul className="list-disc pl-6 space-y-2 text-muted">
              <li>accessible explanations of business decisions</li>
              <li>debates showing opposing reasoning clearly</li>
              <li>case studies focused on context and constraints</li>
            </ul>
          </section>

          {/* ================= INDEPENDENT THINKERS ================= */}
          <section className="mb-16 bg-card border border-border p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Independent Thinkers
            </h2>

            <p className="text-text mb-4">
              Tecsaro is for anyone who:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-muted mb-6">
              <li>enjoys thoughtful discussion</li>
              <li>prefers clarity over certainty</li>
              <li>believes better decisions come from better questions</li>
            </ul>

            <p className="text-muted">
              You don’t need to be a founder or executive.
              You just need curiosity and openness to reasoned discussion.
            </p>
          </section>

          {/* ================= NOT FOR ================= */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Who Tecsaro Is Not For
            </h2>

            <p className="text-text mb-4">
              Tecsaro may not be the right fit if you are looking for:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-muted">
              <li>quick tips or shortcuts</li>
              <li>guaranteed outcomes or advice</li>
              <li>hype-driven content</li>
              <li>personal promotion or arguments</li>
            </ul>

            <p className="mt-4 text-muted">
              The platform prioritizes thinking over noise.
            </p>
          </section>

          {/* ================= SUMMARY ================= */}
          <section className="border-t border-border pt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              A Simple Summary
            </h2>

            <p className="text-text mb-4">
              Tecsaro is for people who want to:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-muted">
              <li>think clearly</li>
              <li>explore multiple perspectives</li>
              <li>learn from real decisions</li>
              <li>improve judgment over time.</li>
            </ul>
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
