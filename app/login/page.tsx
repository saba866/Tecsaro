






"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import BackToHome from "@/components/BackToHome"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [serverError, setServerError] = useState("")

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError("")

    if (!validateForm()) return

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        setServerError("Your email is not verified. Please check your inbox.")
      } else {
        setServerError("Invalid email or password.")
      }
      setLoading(false)
      return
    }

    // Redirect after success
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-sm p-8 border border-border">

          <BackToHome />

          <div className="flex justify-center mb-8">
            <Image
              src="/downtecsarologo.png"
              alt="Tecsaro Logo"
              width={140}
              height={40}
              priority
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl mb-2 font-semibold text-foreground">
              Sign in to Tecsaro
            </h1>
            <p className="text-sm text-muted">
              Access your account to continue thoughtful discussion.
            </p>
          </div>

          {serverError && (
            <p className="mb-4 text-sm text-center debate-text-status-error">
              {serverError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled={loading}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors({ ...errors, email: undefined })
                }}
                className={`w-full px-3 py-2 rounded-md border outline-none transition
                  ${errors.email ? "debate-text-status-error" : "border-border"}
                  focus:ring-1 focus:ring-primary`}
              />
              {errors.email && (
                <p className="mt-1 text-sm debate-text-status-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  disabled={loading}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password)
                      setErrors({ ...errors, password: undefined })
                  }}
                  className={`w-full px-3 py-2 pr-10 rounded-md border outline-none transition
                    ${errors.password ? "debate-text-status-error" : "border-border"}
                    focus:ring-1 focus:ring-primary`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm debate-text-status-error">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md font-medium transition btn-primary disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <Link href="/forgot-password" className="block text-sm text-primary hover:underline">
              Forgot password?
            </Link>
            <Link href="/signup" className="block text-sm text-primary hover:underline">
              Create an account
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
