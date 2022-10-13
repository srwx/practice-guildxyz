/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DISCORD_URL: process.env.DISCORD_URL,
    DOMAIN_URL: process.env.DOMAIN_URL,
  },
}

module.exports = nextConfig
