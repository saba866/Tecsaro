


// app/debates/page.tsx
"use client"

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"

export default function DebatesPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto max-w-4xl px-8 lg:px-16">

          {/* Back navigation */}
          <BackToHome />

          {/* ================= PAGE HEADER ================= */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                Debates
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-foreground leading-tight">
              Debates
            </h1>

            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              Tecsaro debates are designed to help people think through business
              decisions in a structured and respectful way.
            </p>
          </div>

          {/* ================= INTRO ================= */}
          <section className="bg-card p-8 border border-border mb-10">
            <p className="leading-relaxed mb-4 text-text">
              Each debate focuses on a single, clear business question and brings
              together multiple viewpoints to explore trade-offs, risks, and
              reasoning.
            </p>

            <p className="leading-relaxed text-text">
              This page explains how debates on Tecsaro work.
            </p>
          </section>

          {/* ================= WHAT IS A DEBATE ================= */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              What Is a Tecsaro Debate?
            </h2>

            <p className="leading-relaxed mb-4 text-text">
              A Tecsaro debate is a time-bound discussion centered around a real
              business or strategic question.
            </p>

            <p className="leading-relaxed mb-3 text-text">
              The goal is not to win an argument, but to understand:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-text">
              <li>Different perspectives</li>
              <li>Reasoning behind each viewpoint</li>
              <li>Strengths and weaknesses of each position</li>
            </ul>
          </section>

          {/* ================= HOW DEBATES WORK ================= */}
          <section className="bg-card p-8 border border-border mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              How Debates Work
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  1. Topic Selection
                </h3>
                <p className="leading-relaxed text-text">
                  Debate topics are created and curated by the Tecsaro team.
                  Each topic is framed clearly to encourage focused discussion.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  2. Time-Bound Discussion
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-text">
                  <li>Debates are open for a limited period (for example, 24 hours)</li>
                  <li>This encourages thoughtful participation rather than endless arguments</li>
                  <li>Once a debate is closed, it remains available for reading</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  3. Participation
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-text">
                  <li>Posting short text comments</li>
                  <li>Engaging with arguments through likes or saves</li>
                </ul>
                <p className="mt-2 text-text">
                  Discussions are expected to remain respectful and focused on ideas.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  4. Evaluation
                </h3>
                <p className="leading-relaxed mb-2 text-text">
                  Debate outcomes are based on:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-text">
                  <li>Quality of reasoning</li>
                  <li>Engagement with arguments</li>
                  <li>Overall discussion depth</li>
                </ul>
                <p className="mt-2 text-text">
                  Outcomes are intended to summarize discussion, not declare absolute truth.
                </p>
              </div>
            </div>
          </section>

          {/* ================= WHY STRUCTURE ================= */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Why Structured Debates Matter
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-text">
              <div>
                <p className="mb-2 font-medium">Most discussions online are:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Reactive</li>
                  <li>Unstructured</li>
                  <li>Driven by popularity</li>
                </ul>
              </div>

              <div>
                <p className="mb-2 font-medium">Tecsaro debates are:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Focused</li>
                  <li>Time-bound</li>
                  <li>Idea-driven</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 leading-relaxed text-text">
              This structure helps surface better thinking and clearer understanding.
            </p>
          </section>

          {/* ================= AFTER DEBATE ================= */}
          <section className="bg-card p-8 border border-border mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              After a Debate Ends
            </h2>

            <p className="leading-relaxed mb-3 text-text">
              Closed debates remain accessible so users can:
            </p>

            <ul className="list-disc pl-5 space-y-1 text-text">
              <li>Read past arguments</li>
              <li>Understand how conclusions were formed</li>
              <li>Learn from different perspectives</li>
            </ul>

            <p className="mt-3 leading-relaxed text-text">
              Debates become part of Tecsaro’s growing knowledge base.
            </p>
          </section>

          {/* ================= IMPORTANT NOTE ================= */}
          <section className="border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Important Note
            </h2>

            <p className="leading-relaxed mb-2 text-text">
              Debates on Tecsaro are for informational and educational purposes only.
              They do not represent professional, legal, or financial advice.
            </p>

            <p className="leading-relaxed text-text">
              Users are responsible for their own decisions.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </>
  )
}
