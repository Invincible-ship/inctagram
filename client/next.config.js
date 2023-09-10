/** @type {import('next').NextConfig} */

// const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  webpack(config, { webpack, dev }) {
    const plugins = [
      new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(dev)
      })
    ]
    config.plugins.push(...plugins)
    

    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )
    
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
  headers: async () => {
    return [
      {
        source: '/:lng*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, content-type, Authorization'
          }
        ]
      }
    ]
  }
};

module.exports = nextConfig;
