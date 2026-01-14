"use client";

import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      {children}
    </>
  );
}
