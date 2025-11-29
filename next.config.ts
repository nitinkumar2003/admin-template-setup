import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  configBaseUrl:process.env.NEXT_PUBLIC_API_BASE_URL,
  // configLocalUrl:process.env.NEXT_PUBLIC_LOCAL_BASE_URL
  distDir: 'build',
  output: 'export',
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    unoptimized: true,
  },
  // i18n: {
  //   locales: ["en", "fr", "de"],
  //   defaultLocale: "en",
  // },
};

export default nextConfig;
