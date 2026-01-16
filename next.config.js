/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'recharts'],
  },
  transpilePackages: ['@rally/ai-clients', '@rally/blocks-ai', '@rally/telemetry'],
  turbopack: {
    root: '.',
  },
}

module.exports = nextConfig
