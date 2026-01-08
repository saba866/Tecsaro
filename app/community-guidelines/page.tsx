



"use client"

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"

export default function CommunityGuidelinesPage() {
  return (
    <>
      {/* ===== Header ===== */}
      <Header />

      {/* ===== Page Content ===== */}
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-16">

          {/* Back navigation */}
          <BackToHome />

          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-accent" />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Guidelines
              </span>
            </div>

            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "var(--primary-dark)",
                letterSpacing: "-0.01em",
                lineHeight: "1.2",
              }}
            >
              Community Guidelines
            </h1>

            <p className="mt-4 text-muted max-w-2xl leading-relaxed">
              Tecsaro is a platform for learning, clarity, and better business
              decision-making. These Community Guidelines ensure the experience
              remains respectful, constructive, and valuable for everyone.
            </p>

            <p className="mt-2 text-sm text-muted">
              Last updated: 25 December 2025
            </p>
          </div>

          {/* 1. Purpose */}
          <section className="bg-card p-8 border border-border mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              1. Purpose of the Community
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-text">
              <li>Support smarter decision-making</li>
              <li>Explore structured thinking frameworks</li>
              <li>Learn from playbooks, cases, and insights</li>
            </ul>

            <p className="mt-4 text-text leading-relaxed">
              This is not a platform for arguments, personal conflicts, or
              ideological battles.
            </p>

            <p className="mt-2 text-text font-medium">
              Curiosity is welcome. Hostility is not.
            </p>
          </section>

          {/* 2. What Is Encouraged */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              2. What Is Encouraged
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-text">
              <li>Share thoughtful takeaways from playbooks</li>
              <li>Reflect on frameworks and decisions rationally</li>
              <li>Ask meaningful, relevant questions</li>
              <li>Save, react, or participate respectfully</li>
            </ul>

            <p className="mt-4 text-text">
              Focus on decisions and reasoning — not personalities or opinions.
            </p>
          </section>

          {/* 3. What Is Not Allowed */}
          <section className="bg-card p-8 border border-border mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              3. What Is Not Allowed
            </h2>

            <ul className="space-y-3 text-text">
              <li>Personal attacks, insults, or harassment</li>
              <li>Hate speech or abusive language of any kind</li>
              <li>Discrimination based on identity, belief, or background</li>
              <li>Political or ideological arguments unrelated to business topics</li>
              <li>Spam, self-promotion, or irrelevant links</li>
              <li>False or misleading claims presented as truth</li>
              <li>Repeated disruption or trolling</li>
            </ul>

            <p className="mt-4 text-text font-medium">
              Discuss ideas. Not people.
            </p>
          </section>

          {/* 4. User Content */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              4. User Content and Responsibility
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-text">
              <li>Users may share short reflections or responses where enabled</li>
              <li>Uploads of files, images, or media are not supported</li>
              <li>Do not share personal, confidential, or sensitive data</li>
            </ul>

            <p className="mt-4 text-text">
              All content posted by users represents their personal views,
              not Tecsaro’s.
            </p>
          </section>

          {/* 5. Interaction Expectations */}
          <section className="bg-card p-8 border border-border mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              5. Interaction Expectations
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-text">
              <li>Stay relevant to the topic or playbook</li>
              <li>Support conclusions with reasoning or examples</li>
              <li>Respect differences in experience or viewpoint</li>
              <li>Avoid repetitive or argumentative replies</li>
            </ul>

            <p className="mt-4 text-text font-medium">
              The goal is clarity and learning — not proving someone wrong.
            </p>
          </section>

          {/* 6. Moderation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              6. Moderation and Enforcement
            </h2>

            <p className="text-text leading-relaxed">
              To maintain a healthy environment, Tecsaro may review or remove
              content, restrict features, or suspend accounts when necessary.
            </p>

            <p className="mt-3 text-text">
              Moderation decisions support a positive learning environment.
            </p>
          </section>

          {/* 7. Reporting */}
          <section className="bg-card p-8 border border-border mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              7. Reporting Issues
            </h2>

            <p className="text-text leading-relaxed">
              If you encounter inappropriate behavior or content, you may report
              it via available platform tools or contact us directly.
            </p>
          </section>

          {/* 8. Updates */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              8. Updates to These Guidelines
            </h2>

            <p className="text-text leading-relaxed">
              These Guidelines will evolve as Tecsaro grows. Updates will be
              reflected here.
            </p>
          </section>

          {/* 9. Contact */}
          <section className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              9. Contact
            </h2>

            <p className="text-text">
              If you have questions or concerns about these Community Guidelines,
              contact{" "}
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

      {/* ===== Footer ===== */}
      <Footer />
    </>
  )
}
