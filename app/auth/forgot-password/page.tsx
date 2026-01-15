




"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-sm p-8 border border-border">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/downtecsarologo.png"
              alt="Tecsaro Logo"
              width={140}
              height={40}
              priority
            />
          </div>

          {!submitted ? (
            <>
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-2xl mb-2 font-semibold text-text">
                  Reset your password
                </h1>
                <p className="text-sm text-muted">
                  Enter your email and we’ll send you a reset link.
                </p>
              </div>

              {/* Error */}
              {error && (
                <p className="mb-4 text-sm text-center debate-text-status-error">
                  {error}
                </p>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm mb-2 font-medium text-text">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="
                      w-full px-3 py-2 rounded-md
                      border border-border
                      bg-card
                      text-text
                      outline-none
                      transition
                      focus:ring-2 focus:ring-primary
                    "
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full py-2.5 rounded-md font-medium
                    btn-primary
                    transition
                    disabled:opacity-60
                  "
                >
                  {loading ? "Sending..." : "Send reset link"}
                </button>
              </form>

              {/* Footer link */}
              <div className="mt-6 text-center text-sm text-muted">
                Back to{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success */}
              <div className="text-center space-y-6">
                <div className="text-4xl debate-text-status-success">✓</div>

                <div>
                  <h2 className="text-xl font-semibold text-text">
                    Check your email
                  </h2>
                  <p className="text-sm text-muted mt-2">
                    We’ve sent a password reset link to{" "}
                    <strong>{email}</strong>
                  </p>
                </div>

                <p className="text-sm text-muted">
                  If you don’t see the email, check your spam folder.
                </p>

                <Link
                  href="/login"
                  className="inline-block text-sm text-primary hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
