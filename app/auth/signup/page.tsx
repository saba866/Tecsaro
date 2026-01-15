




"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import BackToHome from "@/components/BackToHome"
import { supabase } from "@/lib/supabaseClient"

const TERMS_VERSION = "v1.0"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [emailExists, setEmailExists] = useState(false)

  /* ---------------- EMAIL DUPLICATE CHECK ---------------- */
  const checkEmailExists = async (email: string) => {
    if (!email) return

    const { data } = await supabase.rpc("check_email_exists", {
      email_input: email,
    })

    setEmailExists(data === true)
  }

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (name === "email") checkEmailExists(value)
  }

  /* ---------------- SUBMIT ---------------- */
  const handleSignup = async (e: any) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!formData.agreeTerms) {
      setError("You must accept the terms to continue")
      return
    }

    if (emailExists) {
      setError("An account with this email already exists")
      return
    }

    setLoading(true)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data.user) {
        await supabase.from("user_terms_acceptance").insert({
          user_id: data.user.id,
          terms_version: TERMS_VERSION,
        })
      }

      setSuccess(
        `Verification email sent to ${formData.email}. Please check your inbox.`
      )

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      })
    } catch {
      setError("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="card p-8 shadow-sm">

          {/* Back navigation */}
          <BackToHome />

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

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-text">
              Create your Tecsaro account
            </h1>
            <p className="text-sm text-muted">
              Join a platform built for structured business thinking.
            </p>
          </div>

          {/* Messages */}
          {error && (
            <p className="mb-4 text-sm debate-text-status-error">{error}</p>
          )}
          {success && (
            <p className="mb-4 text-sm debate-text-status-success">{success}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">

            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-text"
              />
              <input
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-text"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-text"
            />
            {emailExists && (
              <p className="text-sm debate-text-status-error">
                This email is already registered
              </p>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-text"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-text"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm text-text">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms-and-conditions" className="text-primary">
                  Terms
                </Link>
                ,{" "}
                <Link href="/privacy-policy" className="text-primary">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/community-guidelines" className="text-primary">
                  Community Guidelines
                </Link>
                .
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 rounded-md disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
