/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'recharts'],
  },
  transpilePackages: ['@rally/ai-clients', '@rally/blocks-ai', '@rally/telemetry'],
}

module.exports = nextConfig
