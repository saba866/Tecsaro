// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },

//   // Fixes workspace root detection for Turbopack
//   turbopack: {
//     root: __dirname,
//   },
// };


// export default nextConfig;





import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // Fixes workspace root detection for Turbopack
  turbopack: {
    root: __dirname,
  },

  // ⬇️ ADD THESE REDIRECTS
  async redirects() {
    return [
      {
        source: "/signup",
        destination: "/auth/signup",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/forgot-password",
        destination: "/auth/forgot-password",
        permanent: true,
      },
      {
        source: "/reset-password",
        destination: "/auth/reset-password",
        permanent: true,
      },
      {
        source: "/onboarding",
        destination: "/auth/onboarding",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
