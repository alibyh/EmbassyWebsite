/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only use static export for production builds, not dev mode
  // This allows API routes to work in dev mode
  ...(process.env.NODE_ENV === 'production' && process.env.SKIP_STATIC_EXPORT !== 'true' 
    ? { output: 'export' } 
    : {}),
  images: {
    unoptimized: true,
  },
  basePath: '/EmbassyWebsite',
  trailingSlash: true,
  assetPrefix: '/EmbassyWebsite',
}

module.exports = nextConfig
