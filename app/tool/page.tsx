





"use client"

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"

export default function BusinessToolsPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-16">

          {/* Back navigation */}
          <BackToHome />

          {/* ================= PAGE HEADER ================= */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                Business Tools
              </span>
            </div>

            <h1 className="text-4xl font-semibold text-foreground leading-tight">
              Curated Business Tools
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
              Carefully selected tools commonly used by founders and professionals.
            </p>
          </div>

          {/* ================= INTRO ================= */}
          <section className="bg-card p-8 border border-border mb-10">
            <p className="text-text leading-relaxed mb-4">
              Tecsaro lists carefully selected business tools that founders and
              professionals commonly use but may not always discover easily.
            </p>

            <p className="text-text leading-relaxed mb-4">
              Each tool entry typically includes:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-text">
              <li>A short description</li>
              <li>Key features</li>
              <li>Practical use cases</li>
              <li>External links to official websites</li>
            </ul>
          </section>

          {/* ================= SELECTION CRITERIA ================= */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              How Tools Are Selected
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
              <li>Based on relevance to real business workflows</li>
              <li>Preference for clarity, simplicity, and usefulness</li>
              <li>Not all tools are endorsed or sponsored</li>
            </ul>
          </section>

          {/* ================= IMPORTANT NOTE ================= */}
          <section className="bg-card p-8 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Important Note
            </h2>

            <p className="text-text leading-relaxed">
              Tecsaro does not sell or resell these tools. Any interaction with
              third-party tools happens outside the platform, under the
              respective provider’s terms.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </>
  )
}
