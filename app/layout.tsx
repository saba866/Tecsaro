// import type React from "react"
// import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import "./globals.css"

// const _geist = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Tecsaro - Premium Business Learning & Debates",
//   description: "Master business strategy through engaging debates, case studies, and expert insights",
//   generator: "v0.app",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`font-sans antialiased`}>
//         {children}
//         <Analytics />
//       </body>
//     </html>
//   )
// }





// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import "./globals.css"

// /* ================= FONT ================= */
// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// })

// /* ================= METADATA ================= */
// export const metadata: Metadata = {
//   title: 'Tecsaro',
//   description:
//     'Tecsaro is a decision intelligence platform offering business case studies, insights, news explanations, tools, and playbooks — helping you think better and make smarter business decisions.',
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },
// }

// /* ================= ROOT LAYOUT ================= */
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} antialiased`}>
//         {children}
//         <Analytics />
//       </body>
//     </html>
//   )
// }






// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import { DefaultSeo } from "next-seo"
// import SEO from "../next-seo.config"
// import "./globals.css"

// /* ================= FONT ================= */
// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// })

// /* ================= METADATA ================= */
// export const metadata: Metadata = {
//   title: 'Tecsaro',
//   description:
//     'Tecsaro is a decision intelligence platform offering business case studies, insights, news explanations, tools, and playbooks — helping you think better and make smarter business decisions.',
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },
// }

// /* ================= ROOT LAYOUT ================= */
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} antialiased`}>
//         <DefaultSeo {...SEO} />
//         {children}
//         <Analytics />
//       </body>
//     </html>
//   )
// }





// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { Analytics } from "@vercel/analytics/next";
// import "./globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: {
//     default: "Tecsaro",
//     template: "%s | Tecsaro",
//   },
//   description:
//     "Tecsaro is a decision intelligence platform offering business case studies, insights, news explanations, tools, and playbooks — helping you think better and make smarter business decisions.",
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: "https://tecsaro.com",
//     siteName: "Tecsaro — Decision Intelligence for Business Thinkers",
//     images: [
//       {
//         url: "/og-image.png",
//         width: 1200,
//         height: 630,
//         alt: "Tecsaro — Business Case Studies and Insights",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@tecsarohq",
//     creator: "@tecsarohq",
//     images: ["/og-image.png"],
//   },
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },
// };





// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { Analytics } from "@vercel/analytics/next";
// import "./globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: {
//     default: "Tecsaro",
//     template: "%s | Tecsaro",
//   },
//   description:
//     "Tecsaro is a decision intelligence platform offering business case studies, insights, news explanations, tools, and playbooks — helping you think better and make smarter business decisions.",
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: "https://tecsaro.com",
//     siteName: "Tecsaro — Decision Intelligence for Business Thinkers",
//     images: [
//       {
//         url: "/og-image.png",
//         width: 1200,
//         height: 630,
//         alt: "Tecsaro — Business Case Studies and Insights",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@tecsarohq",
//     creator: "@tecsarohq",
//     images: ["/og-image.png"],
//   },
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} antialiased`}>
//         {children}
//         <Analytics />
//       </body>
//     </html>
//   );
// }





// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { Analytics } from "@vercel/analytics/next";
// import GoogleAnalytics from "./analytics";  // ⬅️ Add this
// import "./globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: {
//     default: "Tecsaro",
//     template: "%s | Tecsaro",
//   },
//   description:
//     "Tecsaro is a decision intelligence platform offering business case studies, insights, news explanations, tools, and playbooks — helping you think better and make smarter business decisions.",
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: "https://tecsaro.com",
//     siteName: "Tecsaro — Decision Intelligence for Business Thinkers",
//     images: [
//       {
//         url: "/og-image.png",
//         width: 1200,
//         height: 630,
//         alt: "Tecsaro — Business Case Studies and Insights",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@tecsarohq",
//     creator: "@tecsarohq",
//     images: ["/og-image.png"],
//   },
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} antialiased`}>
//         {/* GA4 tracking script */}
//         <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID!} />

//         {/* Your App */}
//         {children}

//         {/* Vercel analytics (optional but helpful) */}
//         <Analytics />
//       </body>
//     </html>
//   );
// }




import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tecsaro",
    template: "%s | Tecsaro",
  },
  description:
    "Tecsaro is a decision intelligence platform offering business case studies, insights, news explanations, tools, and playbooks — helping you think better and make smarter business decisions.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id=GTM-PH9SRXJR'+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer');
        `}</Script>
        {/* End GTM */}
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PH9SRXJR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End GTM Noscript */}

        {children}
        <Analytics />
      </body>
    </html>
  );
}
