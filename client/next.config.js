/** @type {import("next").NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  webpack(config, { webpack, dev }) {
    const plugins = [
      new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(dev),
        __PROJECT__: JSON.stringify('frontend'),
      }),
    ]
    config.plugins.push(...plugins)

    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/trainee-instagram-api/Image/**',
      },
    ],
  },
  transpilePackages: ['swiper']
};

module.exports = withBundleAnalyzer(nextConfig)
