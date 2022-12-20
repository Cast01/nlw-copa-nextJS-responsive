/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'github.com',
    ],
  },
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
  },
}

module.exports = nextConfig
