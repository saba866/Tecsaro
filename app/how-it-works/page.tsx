



"use client"

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"

export default function HowItWorksPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-8 lg:px-16 max-w-5xl">

          {/* Back navigation */}
          <BackToHome />

          {/* ================= PAGE HEADER ================= */}
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                How It Works
              </span>
              <div className="w-8 h-0.5 bg-primary" />
            </div>

            <h1 className="text-4xl font-semibold text-foreground tracking-tight">
              How It Works
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted leading-relaxed">
              Tecsaro helps people think clearly about business
              decisions using structured playbooks, case studies, and insights.
            </p>

            <p className="mt-3 text-muted">
              The platform follows a simple, focused flow.
            </p>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="space-y-16">

            {/* 1. Read */}
            <section className="bg-card p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Read
              </h2>

              <ul className="list-disc pl-5 space-y-2 text-text">
                <li>Decision Playbooks</li>
                <li>Decision-focused case studies</li>
                <li>Business insights and explanations</li>
                <li>Curated business tools</li>
              </ul>

              <p className="mt-4 text-text leading-relaxed">
                Content is designed to provide clarity, not noise.
              </p>
            </section>

            {/* 2. Explore Playbooks */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Explore Playbooks
              </h2>

              <ul className="list-disc pl-5 space-y-2 text-text">
                <li>Choose a topic relevant to your decision</li>
                <li>Understand timing and when the choice makes sense</li>
                <li>See trade-offs and risks laid out clearly</li>
                <li>Follow structured steps to evaluate options</li>
              </ul>

              <p className="mt-4 text-text leading-relaxed">
                Playbooks don’t tell you what to do — they sharpen how you think.
              </p>
            </section>

            {/* 3. Reflect */}
            <section className="bg-card p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Reflect
              </h2>

              <ul className="list-disc pl-5 space-y-2 text-text">
                <li>Consider how each option applies to your situation</li>
                <li>Use questions and checkpoints inside playbooks</li>
                <li>Identify assumptions and blind spots</li>
                <li>Get clarity before acting</li>
              </ul>
            </section>

            {/* 4. Learn From Case Studies */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Learn From Case Studies
              </h2>

              <ul className="list-disc pl-5 space-y-2 text-text">
                <li>Decision context</li>
                <li>Options considered</li>
                <li>Risks and trade-offs</li>
                <li>Outcomes and learnings</li>
              </ul>

              <p className="mt-4 text-text leading-relaxed">
                These are not success stories — they are decision breakdowns.
              </p>
            </section>

            {/* 5. Use Insights and Tools */}
            <section className="bg-card p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Use Insights and Tools
              </h2>

              <ul className="list-disc pl-5 space-y-2 text-text">
                <li>Business insights that explain why things happen</li>
                <li>Tools that are practical and worth knowing</li>
              </ul>

              <p className="mt-4 text-text leading-relaxed">
                Everything is explained simply and practically.
              </p>
            </section>

            {/* 6. Decide Independently */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Decide Independently
              </h2>

              <p className="text-text leading-relaxed mb-3">
                Tecsaro does not give advice or recommendations.
              </p>

              <p className="text-text leading-relaxed">
                All content is provided to support independent thinking.
                You are responsible for your own decisions and actions.
              </p>
            </section>

            {/* What Tecsaro Is / Is Not */}
            <section className="bg-card p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                What Tecsaro Is — and Is Not
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Tecsaro is:
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-text">
                    <li>A platform for structured thinking</li>
                    <li>A library of decision playbooks</li>
                    <li>A resource for decision clarity</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Tecsaro is not:
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-text">
                    <li>A social media platform</li>
                    <li>A news feed</li>
                    <li>A consulting service</li>
                  </ul>
                </div>
              </div>
            </section>

          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}
