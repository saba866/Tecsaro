




"use client"

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"

export default function AboutPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          {/* Back to Home */}
          <BackToHome />

          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center gap-0 mb-4">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-4xl font-semibold text-foreground leading-tight">
                About Tecsaro
              </span>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Intro */}
            <section className="bg-card p-8 border border-border rounded-md">
              <p className="text-text leading-relaxed mb-4">
                Tecsaro is a platform built for thoughtful exploration and clearer
                business decision-making.
              </p>

              <p className="text-text leading-relaxed">
                In a world full of opinions, speed, and noise, important business
                decisions are often made without enough structured thinking.
                Tecsaro exists to slow that process down — to create space for
                reasoning, context, and understanding.
              </p>
            </section>

            {/* Why Tecsaro Exists */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Why Tecsaro Exists
              </h2>

              <div className="space-y-4 text-text leading-relaxed">
                <p>Most platforms focus on:</p>

                <ul className="list-disc pl-5 space-y-1">
                  <li>quick reactions</li>
                  <li>popularity</li>
                  <li>engagement metrics</li>
                </ul>

                <p>Tecsaro focuses on:</p>

                <ul className="list-disc pl-5 space-y-1">
                  <li>reasoning</li>
                  <li>structure</li>
                  <li>decision context</li>
                </ul>

                <p>
                  Business decisions are rarely simple. They involve trade-offs,
                  uncertainty, and multiple viewpoints. Tecsaro is designed to
                  clarify thinking, not accelerate noise.
                </p>
              </div>
            </section>

            {/* What Tecsaro Offers */}
            <section className="bg-card p-8 border border-border rounded-md">
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                What Tecsaro Offers
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Decision Playbooks
                  </h3>
                  <p className="text-text leading-relaxed">
                    Short, structured guides that break down business decisions
                    into timing, trade-offs, risk, and next steps — helping you think clearly and choose wisely.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Decision Case Studies
                  </h3>
                  <p className="text-text leading-relaxed">
                    Analysis focused on why decisions were made — not just what
                    happened. Each case explores context, options, risks, and outcomes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Business Insights
                  </h3>
                  <p className="text-text leading-relaxed">
                    Clear explanations of business patterns, strategy, and mental
                    models — without hype or headlines.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Business Tools
                  </h3>
                  <p className="text-text leading-relaxed">
                    Curated tools and frameworks explained in terms of when and
                    why they are useful.
                  </p>
                </div>
              </div>
            </section>

            {/* How Tecsaro Is Different */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                How Tecsaro Is Different
              </h2>

              <ul className="list-disc pl-5 space-y-2 text-text">
                <li>No viral feeds</li>
                <li>No popularity contests</li>
                <li>No personal attacks</li>
                <li>No noise</li>
              </ul>

              <p className="mt-4 text-text leading-relaxed">
                Tecsaro values clarity over speed and understanding over
                convenience.
              </p>
            </section>

            {/* Philosophy */}
            <section className="bg-card p-8 border border-border rounded-md">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Our Philosophy
              </h2>

              <p className="text-text leading-relaxed mb-4">
                Tecsaro does not tell people what decisions to make.  
                It helps them think through decisions more clearly.
              </p>

              <p className="text-text leading-relaxed">
                The platform is built on the belief that better thinking leads to
                better outcomes.
              </p>
            </section>

            {/* Early Stage */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Early-Stage Platform
              </h2>

              <p className="text-text leading-relaxed">
                Tecsaro is early-stage and evolving.  
                Features, content, and structure change as we learn from the
                community and improve the experience.
              </p>
            </section>

            {/* Contact */}
            <section className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Contact
              </h2>

              <p className="text-text">
                If you have feedback, questions, or topic requests, reach us at{" "}
                <a
                  href="mailto:saba@tecsaro.com"
                  className="text-primary hover:underline"
                >
                  saba@tecsaro.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
