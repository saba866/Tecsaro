// lib/ga.ts

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Tell TypeScript that window.gtag exists
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const gtag = (action: string, params: Record<string, any>) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
};
