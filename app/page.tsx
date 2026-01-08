




// app/page.tsx
import type { Metadata } from "next"

import Header from "@/components/landing/Header"
import Hero from "@/components/landing/Hero"
import Capabilities from "@/components/landing/Capabilities"
import DecisionFlow from "@/components/landing/DecisionFlow"
import ContentPreview from "@/components/landing/ContentPreview"
import FinalCTA from "@/components/landing/FinalCTA"
import Footer from "@/components/landing/Footer"
import TodayOnTecsaro from "@/components/landing/TodayOnTecsaro"
import PlaybooksPreview from "@/components/landing/PlaybooksPreview"

import CaseStudiesPreview from "@/components/landing/CaseStudiesPreview"
import InsightsPreview from "@/components/landing/InsightsPreview"
import ExplainedNewsPreview from "@/components/landing/ExplainedNewsPreview"
import ToolsPreview from "@/components/landing/ToolsPreview"


export const metadata: Metadata = {
  title: "Tecsaro | Business Decisions, Not Noise",
  description:
    "Structured debates, decision-focused case studies, and practical tools designed to reduce noise and improve business judgment.",
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-inter">

      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero />
       {/* Today on tecsaro */}
      <TodayOnTecsaro />
       {/* Case studies */}
      <CaseStudiesPreview />
       {/* debate */}
      <PlaybooksPreview />
       {/* insights */}
      <InsightsPreview />
       {/* news */}
      <ExplainedNewsPreview />
      <ToolsPreview />
      {/* Core Capabilities */}
      <Capabilities />

      {/* Decision Flow */}
      <DecisionFlow />

      {/* Platform Preview */}
      <ContentPreview />

      {/* Final CTA (Quiet confidence) */}
      <FinalCTA />

      {/* Footer */}
      <Footer />

    </main>
  )
}
