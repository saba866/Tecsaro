





"use client"

import { useState } from "react"
import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"
import { ChevronDown } from "lucide-react"

type FAQItem = {
  question: string
  answer: React.ReactNode
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs: { section: string; items: FAQItem[] }[] = [
    {
      section: "About Tecsaro",
      items: [
        {
          question: "What is Tecsaro?",
          answer: (
            <p>
              Tecsaro is a decision intelligence platform focused on structured
              business case studies, decision tools, insights, and decision
              playbooks designed to improve judgment and reduce noise in business decision-making.
            </p>
          ),
        },
        {
          question: "Who is Tecsaro for?",
          answer: (
            <ul className="list-disc pl-6 space-y-1">
              <li>Founders and startup teams</li>
              <li>Business professionals and managers</li>
              <li>Students and learners interested in business thinking</li>
              <li>Anyone who wants to understand how decisions are made</li>
            </ul>
          ),
        },
        {
          question: "Is Tecsaro a news platform?",
          answer: (
            <p>
              No. Tecsaro does not report news. We explain and analyze the
              decisions behind news, events, and business outcomes.
            </p>
          ),
        },
      ],
    },

    /* ⭐ NEW SECTION ADDED HERE */
    {
      section: "Decision Playbooks",
      items: [
        {
          question: "What is a Decision Playbook?",
          answer: (
            <p>
              A Decision Playbook is a short, structured guide that helps you
              think clearly about business choices.  
              Each playbook shows:
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>When a decision makes sense</li>
                <li>Options and trade-offs</li>
                <li>Risks and red flags</li>
                <li>Steps and mental models</li>
              </ul>
            </p>
          ),
        },
        {
          question: "Do I need a login to read playbooks?",
          answer: (
            <p>
              Yes — reading full playbooks requires a free account.  
              This enables saving content and personalization later.
            </p>
          ),
        },
        {
          question: "Who are playbooks designed for?",
          answer: (
            <ul className="list-disc pl-6 space-y-1">
              <li>Startup founders & operators</li>
              <li>Students and early career professionals</li>
              <li>Solo builders and freelancers</li>
              <li>Anyone making business or career decisions</li>
            </ul>
          ),
        },
        {
          question: "Do playbooks give advice or tell me what to do?",
          answer: (
            <p>
              No — playbooks don’t prescribe answers.  
              They help you see **both sides**, clarify risks, and make your own informed choice.
            </p>
          ),
        },
        {
          question: "How often are new playbooks added?",
          answer: (
            <p>
              Tecsaro launches with 5–8 playbooks.  
              New playbooks are added weekly or bi-weekly, often based on user requests.
            </p>
          ),
        },
        {
          question: "Can I request a playbook topic?",
          answer: (
            <p>
              Yes! Send your toughest decision to{" "}
              <span className="text-primary font-medium">saba@tecsaro.com</span>.
            </p>
          ),
        },
        {
          question: "Do playbooks replace professional advice?",
          answer: (
            <p>
              No — playbooks sharpen your thinking first.  
              You can still get legal, financial, or expert guidance if needed.
            </p>
          ),
        },
        {
          question: "Will playbooks include AI features?",
          answer: (
            <p>
              Yes — future versions will let you input scenarios and get
              personalized comparisons and help track decisions.  
              For now, everything is human-curated.
            </p>
          ),
        },
      ],
    },

    /* All existing sections below remain unchanged */

    {
      section: "Case Studies",
      items: [
        {
          question: "What makes Tecsaro case studies different?",
          answer: (
            <ul className="list-disc pl-6 space-y-1">
              <li>Options available at the time</li>
              <li>Trade-offs involved</li>
              <li>Reasoning behind choices</li>
              <li>Consequences of those decisions</li>
            </ul>
          ),
        },
        {
          question: "Are these case studies publicly available elsewhere?",
          answer: (
            <p>
              Many are original analyses or decision-focused reinterpretations of
              known events, written specifically for learning purposes.
            </p>
          ),
        },
        {
          question: "Do case studies guarantee correct decision outcomes?",
          answer: (
            <p>
              No. Case studies help improve thinking, not predict outcomes.
            </p>
          ),
        },
      ],
    },

    {
      section: "Business Insights",
      items: [
        {
          question: "What are Business Insights on Tecsaro?",
          answer: (
            <p>
              Business Insights are concise explanations of patterns, principles,
              and mistakes commonly seen in business decision-making.
            </p>
          ),
        },
        {
          question: "Are insights based on opinions?",
          answer: (
            <p>
              No. Insights are based on analysis and reasoning, not personal
              opinions or hype.
            </p>
          ),
        },
      ],
    },

    {
      section: "Business Tools",
      items: [
        {
          question: "What kind of tools are listed on Tecsaro?",
          answer: (
            <p>
              Tecsaro curates useful business tools, platforms, and resources
              that support thinking, analysis, productivity, or decision-making.
            </p>
          ),
        },
        {
          question: "Does Tecsaro own these tools?",
          answer: (
            <p>
              No. Tecsaro does not own most listed tools and does not guarantee
              their performance.
            </p>
          ),
        },
      ],
    },

    {
      section: "Accounts & Access",
      items: [
        {
          question: "Is Tecsaro free to use?",
          answer: (
            <p>
              Yes. Access to core content is currently free during the MVP stage.
            </p>
          ),
        },
        {
          question: "Why do I need to log in?",
          answer: (
            <ul className="list-disc pl-6 space-y-1">
              <li>View full content</li>
              <li>Save or interact with content</li>
              <li>Personalize experience later</li>
            </ul>
          ),
        },
        {
          question: "Can I browse without creating an account?",
          answer: (
            <p>
              Yes. Public information and previews are accessible without
              logging in.
            </p>
          ),
        },
      ],
    },

    {
      section: "Data & Privacy",
      items: [
        {
          question: "What data does Tecsaro collect?",
          answer: (
            <ul className="list-disc pl-6 space-y-1">
              <li>Basic account credentials</li>
              <li>Interaction data (likes, comments, saves)</li>
            </ul>
          ),
        },
        {
          question: "Does Tecsaro sell user data?",
          answer: <p>No. Tecsaro does not sell or trade user data.</p>,
        },
        {
          question: "Are user comments public?",
          answer: (
            <p>
              Comments may be visible to other users within the platform but are
              not sold or shared externally.
            </p>
          ),
        },
      ],
    },

    {
      section: "Content & Responsibility",
      items: [
        {
          question: "Is all content verified or guaranteed to be correct?",
          answer: (
            <p>
              No. While content is curated and moderated, Tecsaro does not
              guarantee accuracy, completeness, or outcomes.
            </p>
          ),
        },
        {
          question: "Can I reuse Tecsaro content?",
          answer: (
            <p>
              Content is provided for personal, non-commercial use only unless
              otherwise stated.
            </p>
          ),
        },
      ],
    },

    {
      section: "Community & Conduct",
      items: [
        {
          question: "Are there community guidelines?",
          answer: (
            <p>
              Yes. Users are expected to engage respectfully and avoid personal
              attacks, harassment, hate speech, or discrimination.
            </p>
          ),
        },
        {
          question: "What happens if someone violates guidelines?",
          answer: (
            <p>
              Tecsaro may remove content or restrict access if guidelines are
              violated.
            </p>
          ),
        },
      ],
    },

    {
      section: "Contact & Support",
      items: [
        {
          question: "How can I contact Tecsaro?",
          answer: (
            <p>
              For general inquiries, feedback, or partnership opportunities:  
              <br />
              <span className="text-primary font-medium">
                saba@tecsaro.com
              </span>
            </p>
          ),
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <BackToHome />

          <h1 className="text-4xl font-semibold text-foreground mb-10">
            Frequently Asked Questions
          </h1>

          {faqs.map((group, groupIndex) => (
            <section key={groupIndex} className="mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {group.section}
              </h2>

              <div className="bg-card border border-border">
                {group.items.map((faq, index) => {
                  const key = groupIndex * 100 + index
                  const open = openIndex === key

                  return (
                    <button
                      key={key}
                      onClick={() => toggle(key)}
                      className="w-full text-left p-5 border-b last:border-b-0 border-border focus:outline-none"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium text-text">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-muted transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {open && (
                        <div className="mt-4 text-sm leading-relaxed text-muted">
                          {faq.answer}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
