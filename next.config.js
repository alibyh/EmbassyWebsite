/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/EmbassyWebsite',
  trailingSlash: true,
  assetPrefix: '/EmbassyWebsite',
}

module.exports = nextConfig
