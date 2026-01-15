


"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [error, setError] = useState("")

  const [q, setQ] = useState({
    mainGoal: "",
    contentTypes: [] as string[],
    contentFormats: [] as string[],
    topicsInterested: [] as string[],
    buildingStartup: "",
    blockingProgress: [] as string[],
    blockingProgressOther: "",
    debateTopics: [] as string[],
    platformValue: "",
    otherPlatforms: [] as string[],
    heardFrom: "",
    heardFromOther: "",
    finalInsight: "",
  })

  const toggleMulti = (name: keyof typeof q, value: string) => {
    setQ((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? (prev[name] as string[]).filter((v) => v !== value)
        : [...(prev[name] as string[]), value],
    }))
  }

  const handleText = (name: keyof typeof q, value: string) =>
    setQ((prev) => ({ ...prev, [name]: value }))

  const validateStep = () => {
    setError("")

    if (step === 1) {
      if (!q.mainGoal) return "Please select your main goal."
      if (q.contentTypes.length === 0) return "Select at least one content type."
    }
    if (step === 2) {
      if (q.contentFormats.length === 0) return "Choose content formats."
      if (q.topicsInterested.length === 0) return "Choose at least one topic."
      if (!q.buildingStartup) return "Please select your startup status."
      if (q.blockingProgress.length === 0) return "Select what blocks your progress."
    }
    if (step === 3) {
      if (q.debateTopics.length === 0) return "Choose debate topics."
      if (!q.platformValue.trim()) return "Tell what would make the platform valuable."
      if (q.otherPlatforms.length === 0) return "Select platforms you use."
    }
    if (step === 4) {
      if (!q.heardFrom) return "Where did you hear about us?"
      if (!q.finalInsight.trim()) return "Why is this platform needed?"
    }

    return ""
  }

  const handleNext = () => {
    const err = validateStep()
    if (err) return setError(err)

    if (step < 4) {
      setAnimate(false)
      setTimeout(() => {
        setStep(step + 1)
        setAnimate(true)
      }, 200)
    } else finalize()
  }

  const finalize = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError("Session expired. Please login again.")
      return router.push("/login")
    }

    try {
      const { error: insertError } = await supabase.from("onboarding_answers").insert({
        id: user.id,
        main_goal: q.mainGoal,
        content_types: q.contentTypes,
        content_formats: q.contentFormats,
        topics_interested: q.topicsInterested,
        building_startup: q.buildingStartup,
        blocking_progress: q.blockingProgress,
        blocking_progress_other: q.blockingProgressOther,
        debate_topics: q.debateTopics,
        platform_value: q.platformValue,
        other_platforms: q.otherPlatforms,
        heard_from: q.heardFrom,
        heard_from_other: q.heardFromOther,
        final_insight: q.finalInsight,
      })

      if (insertError) return setError("Failed to save onboarding.")

      await supabase.from("profiles").update({ onboarded: true }).eq("id", user.id)
      router.push("/dashboard")
    } catch {
      setError("Something went wrong.")
    }
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      const user = data?.user
      if (!user) return

      const { data: p } = await supabase.from("profiles").select("onboarded").eq("id", user.id).single()
      if (p?.onboarded) router.push("/dashboard")
    })()
  }, [])

  const Section = ({ title, children }: any) => (
    <div className={`space-y-4 ${animate ? "fade-enter-active" : "fade-enter"}`}>
      <h3 className="text-xl font-semibold">{title}</h3>
      {children}
    </div>
  )

  const Checkbox = ({ label, checked, onChange }: any) => (
    <label className="flex items-center gap-3 cursor-pointer bg-gray-100 px-4 py-3 rounded-xl border hover:bg-gray-200 transition">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-indigo-600"
      />
      <span className="text-sm">{label}</span>
    </label>
  )

  const Radio = ({ label, checked, onChange }: any) => (
    <label className="flex items-center gap-3 cursor-pointer bg-gray-100 px-4 py-3 rounded-xl border hover:bg-gray-200 transition">
      <input type="radio" checked={checked} onChange={onChange} className="w-5 h-5 accent-indigo-600" />
      <span className="text-sm">{label}</span>
    </label>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-3xl p-10 rounded-2xl shadow-2xl bg-white border">
        
        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-200 h-3 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-4">Help Us Personalize Your Feed</h1>
        <p className="text-center text-gray-500 mb-6">Step {step} of 4</p>

        {error && (
          <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        {/* STEP CONTENT */}
        <div>
          {step === 1 && (
            <Section title="Your Goals">
              <label className="text-sm">Main thing you want to achieve:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Learn business",
                  "Explore case studies",
                  "Get feedback",
                  "Join debates",
                  "Improve business skills",
                  "Find tools",
                  "Just exploring",
                ].map((opt) => (
                  <Radio key={opt} label={opt} checked={q.mainGoal === opt} onChange={() => handleText("mainGoal", opt)} />
                ))}
              </div>

              <label className="text-sm">Most helpful content types:</label>
              <div className="grid grid-cols-2 gap-2">
                {["Case Studies", "Startup Ideas", "Founder Lessons", "Business News", "Tools", "Debates"].map((opt) => (
                  <Checkbox key={opt} label={opt} checked={q.contentTypes.includes(opt)} onChange={() => toggleMulti("contentTypes", opt)} />
                ))}
              </div>
            </Section>
          )}

          {step === 2 && (
            <Section title="Your Interests">
              <label className="text-sm">Preferred content formats:</label>
              <div className="grid grid-cols-2 gap-2">
                {["Short Posts", "Videos", "Guides", "Debates", "Templates"].map((opt) => (
                  <Checkbox key={opt} label={opt} checked={q.contentFormats.includes(opt)} onChange={() => toggleMulti("contentFormats", opt)} />
                ))}
              </div>

              <label className="text-sm">Business topics you like:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Startup Strategy",
                  "Marketing",
                  "Finance",
                  "Founder Mistakes",
                  "Growth",
                  "Product",
                  "Operations",
                  "Investing",
                  "Business Tools",
                ].map((opt) => (
                  <Checkbox key={opt} label={opt} checked={q.topicsInterested.includes(opt)} onChange={() => toggleMulti("topicsInterested", opt)} />
                ))}
              </div>

              <label className="text-sm">Are you building a startup?</label>
              <div className="grid grid-cols-2 gap-2">
                {["Yes", "Planning", "Exploring", "Just learning"].map((opt) => (
                  <Radio key={opt} label={opt} checked={q.buildingStartup === opt} onChange={() => handleText("buildingStartup", opt)} />
                ))}
              </div>

              <label className="text-sm">What blocks your progress?</label>
              <div className="grid grid-cols-2 gap-2">
                {["Need guidance", "Competitive analysis", "Feedback", "Lack of tools", "Clarity issues", "Need community", "Other"].map((opt) => (
                  <Checkbox key={opt} label={opt} checked={q.blockingProgress.includes(opt)} onChange={() => toggleMulti("blockingProgress", opt)} />
                ))}
              </div>

              {q.blockingProgress.includes("Other") && (
                <input
                  className="input h-14"
                  placeholder="Please specify"
                  value={q.blockingProgressOther}
                  onChange={(e) => handleText("blockingProgressOther", e.target.value)}
                />
              )}
            </Section>
          )}

          {step === 3 && (
            <Section title="Platform Preferences">
              <label className="text-sm">Debate topics you enjoy:</label>
              <div className="grid grid-cols-2 gap-2">
                {["Case Studies", "Startup Ideas", "Business News", "Founders", "Finance", "Technology"].map((opt) => (
                  <Checkbox key={opt} label={opt} checked={q.debateTopics.includes(opt)} onChange={() => toggleMulti("debateTopics", opt)} />
                ))}
              </div>

              <label className="text-sm">What would make this platform valuable?</label>
              <input
                className="input h-14"
                value={q.platformValue}
                onChange={(e) => handleText("platformValue", e.target.value)}
                placeholder="Your answer"
              />

              <label className="text-sm">Which platforms do you use?</label>
              <div className="grid grid-cols-2 gap-2">
                {["YouTube", "LinkedIn", "Google", "Instagram", "Reddit", "Quora", "Medium", "None"].map((opt) => (
                  <Checkbox key={opt} label={opt} checked={q.otherPlatforms.includes(opt)} onChange={() => toggleMulti("otherPlatforms", opt)} />
                ))}
              </div>
            </Section>
          )}

          {step === 4 && (
            <Section title="Final Insight">
              <label className="text-sm">Where did you hear about us?</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Google",
                  "WhatsApp",
                  "Instagram",
                  "LinkedIn",
                  "Reddit",
                  "Telegram",
                  "YouTube",
                  "Twitter / X",
                  "Online Blogs",
                  "AI Tools",
                  "Friends/Referral",
                  "Other",
                ].map((opt) => (
                  <Radio key={opt} label={opt} checked={q.heardFrom === opt} onChange={() => handleText("heardFrom", opt)} />
                ))}
              </div>

              {q.heardFrom === "Other" && (
                <input
                  className="input h-14"
                  placeholder="Please specify"
                  value={q.heardFromOther}
                  onChange={(e) => handleText("heardFromOther", e.target.value)}
                />
              )}

              <label className="text-sm">Why is this platform needed?</label>
              <textarea
                className="input h-36"
                value={q.finalInsight}
                onChange={(e) => handleText("finalInsight", e.target.value)}
                placeholder="Your thoughts..."
              />
            </Section>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-10">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button onClick={handleNext} className="flex items-center gap-2">
            {step < 4 ? "Next" : "Finish"} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
