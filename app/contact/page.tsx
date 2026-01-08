



// app/contact/page.tsx
"use client"

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"

export default function ContactPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto max-w-3xl px-8 lg:px-16">

          {/* Back navigation */}
          <BackToHome />

          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                {/* intentionally empty – reserved for future label */}
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-foreground leading-tight">
              Contact Us
            </h1>
          </div>

          {/* Content */}
          <section className="bg-card p-8 border border-border">
            <p className="mb-6 text-lg leading-relaxed text-text">
              For questions, feedback, partnership opportunities, or any other
              inquiries related to Tecsaro, please contact us at:
            </p>

            <p className="mb-6 text-lg font-medium">
              📧{" "}
              <a
                href="mailto:saba@tecsaro.com"
                className="text-primary hover:underline"
              >
                saba@tecsaro.com
              </a>
            </p>

            <p className="text-sm leading-relaxed text-muted">
              We review messages regularly and respond where appropriate.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </>
  )
}
