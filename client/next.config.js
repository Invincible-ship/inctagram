/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    IS_DEV: process.env.NODE_ENV === 'development'
  }
}

module.exports = nextConfig
