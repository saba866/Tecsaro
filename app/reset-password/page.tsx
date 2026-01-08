




// "use client"

// import { useEffect, useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import Image from "next/image"
// import Link from "next/link"
// import { supabase } from "@/lib/supabaseClient"

// export default function ResetPasswordPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState("")

//   /* ================= SET SESSION FROM URL ================= */
//   useEffect(() => {
//     const accessToken = searchParams.get("access_token")
//     const refreshToken = searchParams.get("refresh_token")

//     if (accessToken && refreshToken) {
//       supabase.auth.setSession({
//         access_token: accessToken,
//         refresh_token: refreshToken,
//       })
//     }
//   }, [searchParams])

//   /* ================= RESET HANDLER ================= */
//   const handleReset = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setMessage("")

//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match.")
//       return
//     }

//     setLoading(true)
//     const { error } = await supabase.auth.updateUser({ password })

//     if (error) {
//       setMessage(error.message)
//     } else {
//       setMessage("Password updated successfully. Redirecting to login…")
//       setTimeout(() => router.push("/login"), 2000)
//     }

//     setLoading(false)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-background">
//       <div className="w-full max-w-md">
//         <div className="bg-card rounded-lg shadow-sm p-8 border border-border">

//           {/* Logo */}
//           <div className="flex justify-center mb-8">
//             <Image
//               src="/downtecsarologo.png"
//               alt="Tecsaro Logo"
//               width={140}
//               height={40}
//               priority
//             />
//           </div>

//           {/* Title */}
//           <div className="text-center mb-8">
//             <h1 className="text-2xl mb-2 font-semibold text-text">
//               Reset your password
//             </h1>
//             <p className="text-sm text-muted">
//               Enter a new password to regain access to your account.
//             </p>
//           </div>

//           {/* Message */}
//           {message && (
//             <p
//               className={`mb-4 text-sm text-center ${
//                 message.includes("successfully")
//                   ? "debate-text-status-success"
//                   : "debate-text-status-error"
//               }`}
//             >
//               {message}
//             </p>
//           )}

//           {/* Form */}
//           <form onSubmit={handleReset} className="space-y-5">

//             {/* New Password */}
//             <div>
//               <label className="block text-sm mb-2 font-medium text-text">
//                 New password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   disabled={loading}
//                   className="
//                     w-full px-3 py-2 pr-10 rounded-md
//                     border border-border
//                     outline-none transition
//                     focus:border-primary
//                   "
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
//                 >
//                   {showPassword ? "🙈" : "👁️"}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-sm mb-2 font-medium text-text">
//                 Confirm password
//               </label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 disabled={loading}
//                 className="
//                   w-full px-3 py-2 rounded-md
//                   border border-border
//                   outline-none transition
//                   focus:border-primary
//                 "
//               />
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="
//                 w-full py-2.5 rounded-md font-medium transition
//                 btn-primary
//                 disabled:opacity-60
//               "
//             >
//               {loading ? "Updating..." : "Update Password"}
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="mt-6 text-center text-sm text-muted">
//             Back to{" "}
//             <Link href="/login" className="text-primary hover:underline">
//               Sign in
//             </Link>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }




"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPasswordPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (accessToken && refreshToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  }, [searchParams]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully. Redirecting to login…");
      setTimeout(() => router.push("/login"), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-sm p-8 border border-border">

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
            <h1 className="text-2xl mb-2 font-semibold text-text">
              Reset your password
            </h1>
            <p className="text-sm text-muted">
              Enter a new password to regain access to your account.
            </p>
          </div>

          {message && (
            <p
              className={`mb-4 text-sm text-center ${
                message.includes("successfully")
                  ? "debate-text-status-success"
                  : "debate-text-status-error"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 font-medium text-text">New password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="
                    w-full px-3 py-2 pr-10 rounded-md
                    border border-border
                    outline-none transition
                    focus:border-primary
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium text-text">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="
                  w-full px-3 py-2 rounded-md
                  border border-border
                  outline-none transition
                  focus:border-primary
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-2.5 rounded-md font-medium transition
                btn-primary
                disabled:opacity-60
              "
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted">
            Back to{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
