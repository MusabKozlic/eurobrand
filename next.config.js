/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { theme: "DEFAULT", currency: "USD" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "USD" },
  images: {
    domains: ['firebasestorage.googleapis.com'],
    remotePatterns: [{ protocol: "https", hostname: "ui-lib.com" }]
  }
};

module.exports = nextConfig;
