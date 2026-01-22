/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'recharts'],
  },
  turbopack: {
    root: '.',
  },
}

module.exports = nextConfig
