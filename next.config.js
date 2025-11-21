/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deploying to a subdirectory, uncomment and set your repo name:
  // basePath: '/your-repo-name',
  // trailingSlash: true,
}

module.exports = nextConfig
