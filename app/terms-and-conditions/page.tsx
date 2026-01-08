


// "use client"

// import Header from "@/components/landing/Header"
// import Footer from "@/components/landing/Footer"
// import BackToHome from "@/components/BackToHome"

// export default function TermsPage() {
//   return (
//     <>
//       <Header />

//       <div className="min-h-screen bg-background pt-24 pb-20">
//         <div className="container mx-auto px-8 lg:px-16 max-w-4xl">

//           {/* Back navigation */}
//           <BackToHome />

//           {/* ================= HEADER ================= */}
//           <div className="mb-12">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-8 h-0.5 bg-primary" />
//               <span className="text-xs font-semibold tracking-widest uppercase text-muted">
//                 Legal
//               </span>
//             </div>

//             <h1 className="text-4xl font-semibold text-foreground leading-tight">
//               Terms &amp; Conditions
//             </h1>

//             <p className="mt-4 text-sm text-muted">
//               Last updated: 25 December 2025
//             </p>
//           </div>

//           {/* ================= CONTENT ================= */}
//           <div className="space-y-10">

//             {/* Introduction */}
//             <section className="bg-card p-8 border border-border">
//               <p className="text-text leading-relaxed">
//                 Welcome to Tecsaro (“we”, “our”, “us”). Tecsaro is a business
//                 decision intelligence platform that provides structured debates,
//                 decision-focused case studies, business insights, and curated tools.
//               </p>

//               <p className="mt-4 text-text leading-relaxed">
//                 By accessing or using Tecsaro, you agree to be bound by these
//                 Terms & Conditions. If you do not agree, please do not use the platform.
//               </p>
//             </section>

//             {/* 1. Use of the Platform */}
//             <section>
//               <h2 className="text-xl font-semibold text-foreground mb-4">
//                 1. Use of the Platform
//               </h2>

//               <p className="text-text leading-relaxed mb-3">
//                 Tecsaro is intended to support thoughtful discussion and understanding
//                 of business decisions.
//               </p>

//               <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
//                 <li>Read debates, case studies, insights, and tools</li>
//                 <li>Participate in debates by posting text comments</li>
//                 <li>Interact with content using features such as likes, saves, or shares</li>
//               </ul>

//               <p className="mt-4 text-text">
//                 You agree to use the platform responsibly and in accordance with these terms.
//               </p>
//             </section>

//             {/* 2. User Accounts */}
//             <section className="bg-card p-8 border border-border">
//               <h2 className="text-xl font-semibold text-foreground mb-4">
//                 2. User Accounts
//               </h2>

//               <p className="text-text leading-relaxed mb-3">
//                 To access certain features, you may be required to create an account.
//               </p>

//               <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
//                 <li>Maintaining the confidentiality of your login credentials</li>
//                 <li>All activities that occur under your account</li>
//               </ul>

//               <p className="mt-4 text-text">
//                 Tecsaro is not responsible for unauthorized access resulting from your
//                 failure to protect your account information.
//               </p>
//             </section>

//             {/* 3. User Conduct */}
//             <section>
//               <h2 className="text-xl font-semibold text-foreground mb-4">
//                 3. User Conduct
//               </h2>

//               <p className="text-text leading-relaxed mb-3">
//                 When using Tecsaro, you agree that you will not:
//               </p>

//               <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
//                 <li>Post abusive, hateful, or offensive comments</li>
//                 <li>Share false, misleading, or unlawful information</li>
//                 <li>Harass, threaten, or harm other users</li>
//                 <li>Attempt to disrupt or misuse the platform</li>
//               </ul>

//               <p className="mt-4 text-text">
//                 Tecsaro encourages respectful and thoughtful participation.
//                 Discussions should focus on ideas and reasoning, not personal attacks.
//               </p>
//             </section>

//             {/* 4. User Content */}
//             <section className="bg-card p-8 border border-border">
//               <h2 className="text-xl font-semibold text-foreground mb-4">
//                 4. User Content and Interactions
//               </h2>

//               <p className="text-text leading-relaxed mb-3">
//                 Users may post short text comments in debates and interact with content
//                 through likes, saves, or shares.
//               </p>

//               <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
//                 <li>Tecsaro does not allow file uploads, images, or documents</li>
//                 <li>Users should not share personal or sensitive information in comments</li>
//               </ul>

//               <p className="mt-4 text-text">
//                 Content posted by users represents the views of the individual user and not Tecsaro.
//               </p>
//             </section>

//             {/* 5–11 sections unchanged structurally, styled semantically */}
//             {/* (Same pattern continues for all remaining sections) */}

//             {/* Contact */}
//             <section className="border-t pt-6">
//               <h2 className="text-xl font-semibold text-foreground mb-2">
//                 12. Contact Information
//               </h2>

//               <p className="text-text">
//                 If you have questions about these Terms & Conditions, contact us at{" "}
//                 <a href="mailto:saba@tecsaro.com" className="text-primary hover:underline">
//                   saba@tecsaro.com
//                 </a>
//                 .
//               </p>
//             </section>

//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   )
// }







"use client"

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import BackToHome from "@/components/BackToHome"

export default function TermsPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-8 lg:px-16 max-w-4xl">

          {/* Back navigation */}
          <BackToHome />

          {/* ================= HEADER ================= */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                Legal
              </span>
            </div>

            <h1 className="text-4xl font-semibold text-foreground leading-tight">
              Terms &amp; Conditions
            </h1>

            <p className="mt-4 text-sm text-muted">
              Last updated: 25 December 2025
            </p>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="space-y-10">

            {/* Introduction */}
            <section className="bg-card p-8 border border-border">
              <p className="text-text leading-relaxed">
                Welcome to Tecsaro (“we”, “our”, “us”). Tecsaro is a business
                decision intelligence platform that provides structured decision
                playbooks, decision-focused case studies, business insights,
                and curated tools.
              </p>

              <p className="mt-4 text-text leading-relaxed">
                By accessing or using Tecsaro, you agree to be bound by these
                Terms & Conditions. If you do not agree, please do not use the platform.
              </p>
            </section>

            {/* 1. Use of the Platform */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                1. Use of the Platform
              </h2>

              <p className="text-text leading-relaxed mb-3">
                Tecsaro is intended to support thoughtful learning and clearer
                business decision-making.
              </p>

              <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
                <li>Read decision playbooks, case studies, insights, and tools</li>
                <li>Save and interact with content you find useful</li>
                <li>Optional: contribute written reflections or responses where permitted</li>
              </ul>

              <p className="mt-4 text-text">
                You agree to use the platform responsibly and in accordance with these terms.
              </p>
            </section>

            {/* 2. User Accounts */}
            <section className="bg-card p-8 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. User Accounts
              </h2>

              <p className="text-text leading-relaxed mb-3">
                To access certain features, you may be required to create an account.
              </p>

              <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
                <li>Maintaining the confidentiality of your login credentials</li>
                <li>All activities that occur under your account</li>
              </ul>

              <p className="mt-4 text-text">
                Tecsaro is not responsible for unauthorized access from failure
                to protect account information.
              </p>
            </section>

            {/* 3. User Conduct */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. User Conduct
              </h2>

              <p className="text-text leading-relaxed mb-3">
                When using Tecsaro, you agree that you will not:
              </p>

              <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
                <li>Post abusive, hateful, or offensive comments</li>
                <li>Share false, misleading, or unlawful information</li>
                <li>Harass, threaten, or harm other users</li>
                <li>Attempt to disrupt or misuse the platform</li>
              </ul>

              <p className="mt-4 text-text">
                Interactions should remain respectful and focused on ideas,
                reasoning, and learning.
              </p>
            </section>

            {/* 4. User Content and Interactions */}
            <section className="bg-card p-8 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                4. User Content and Interactions
              </h2>

              <p className="text-text leading-relaxed mb-3">
                Users may interact with playbooks and other content by saving,
                reacting, or providing short written reflections when permitted.
              </p>

              <ul className="list-disc pl-5 space-y-2 text-text leading-relaxed">
                <li>Tecsaro does not allow file uploads, images, or documents</li>
                <li>Users should not submit confidential or sensitive information</li>
              </ul>

              <p className="mt-4 text-text">
                Any content shared by users reflects individual opinions, not the views of Tecsaro.
              </p>
            </section>

            {/* 5–11 sections unchanged structurally */}
            {/* You can paste existing text below without debate changes */}

            {/* Contact */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                12. Contact Information
              </h2>

              <p className="text-text">
                If you have questions about these Terms & Conditions, contact us at{" "}
                <a href="mailto:saba@tecsaro.com" className="text-primary hover:underline">
                  saba@tecsaro.com
                </a>
                .
              </p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
