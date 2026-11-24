import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static, so it is exported to plain HTML/CSS/JS in `out/`
  // and served from Firebase Hosting (see firebase.json).
  output: "export",
  // Firebase Hosting serves `about/index.html` for `/about/`; trailing slashes
  // keep nested routes working without rewrites.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
