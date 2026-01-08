

// app/case-studies/page.tsx
"use client"

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"

export default function CaseStudiesPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-16">

          {/* Back navigation */}
          <BackToHome />

          {/* ================= PAGE HEADER ================= */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              {/* DASH */}
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-xs font-semibold tracking-widest text-muted uppercase">
                Decision Case Studies
              </span>
            </div>

            <h1 className="text-4xl font-semibold text-foreground leading-tight">
              Decision-Focused Case Studies
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
              Business decisions analyzed — not company biographies.
            </p>
          </div>

          {/* ================= INTRO ================= */}
          <section className="bg-card p-8 border border-border mb-10">
            <p className="text-text leading-relaxed mb-4">
              Tecsaro case studies are built around business decisions, not
              company stories or success narratives.
            </p>

            <p className="text-text leading-relaxed mb-4">
              Each case study examines:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-text">
              <li>The situation</li>
              <li>The decision taken (or available options)</li>
              <li>The reasoning behind each option</li>
              <li>Trade-offs and consequences</li>
              <li>Lessons that can be applied elsewhere</li>
            </ul>
          </section>

          {/* ================= DIFFERENTIATION ================= */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              What Makes Tecsaro Case Studies Different
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
              <li>Focus on why decisions were made</li>
              <li>Highlight constraints, risks, and alternatives</li>
              <li>Avoid motivational storytelling or hype</li>
              <li>Written for practical understanding, not promotion</li>
            </ul>
          </section>

          {/* ================= HOW TO USE ================= */}
          <section className="bg-card p-8 border border-border mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              How to Use Case Studies
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
              <li>Read them to understand real decision patterns</li>
              <li>Compare approaches across industries</li>
              <li>Apply the thinking framework to your own situations</li>
            </ul>
          </section>

          {/* ================= DISCLAIMER ================= */}
          <section className="border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Disclaimer
            </h2>

            <p className="text-text leading-relaxed">
              Case studies on Tecsaro are for educational purposes only.
              They do not constitute legal, financial, or professional advice.
              Users are responsible for their own decisions.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </>
  )
}
