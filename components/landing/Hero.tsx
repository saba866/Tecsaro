



"use client"

import Link from "next/link"
import { useState } from "react"
import DecisionVisualization from "./DecisionVisualization"

export default function Hero() {
  const [ctaHovered, setCtaHovered] = useState(false)

  return (
    <section className="relative bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 grid lg:grid-cols-12 gap-16 items-center">

        {/* LEFT */}
        <div className="lg:col-span-5 space-y-8">

          {/* Overline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted">
              Decision Intelligence Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-foreground">
            Think Clearly. Decide Confidently.
          </h1>

          {/* Subtext */}
          <p className="text-lg text-muted max-w-xl leading-relaxed">
            Structured playbooks, decision-focused case studies, and curated tools designed to
            improve judgment and reduce noise in business decisions.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 pt-2">
            <Link href="/signup">
              <button
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                className="
                  px-8 py-3
                  btn-primary
                  text-sm font-medium
                  transition
                "
              >
                Enter the Platform
              </button>
            </Link>

            {/*
            <Link
              href="/case-studies"
              className="px-8 py-3 border border-border text-foreground text-sm font-medium hover:border-foreground transition"
            >
              Explore Case Studies
            </Link>
            */}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block lg:col-span-7">
          <div className="h-[480px] border border-border bg-background">
            <DecisionVisualization ctaHovered={ctaHovered} />
          </div>
        </div>

      </div>
    </section>
  )
}
