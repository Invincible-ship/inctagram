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

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  // headers: async () => {
  //   return [
  //     {
  //       source: '/:lng*',
  //       headers: [
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: '*'
  //         },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value: 'X-Requested-With, content-type, Authorization'
  //         }
  //       ]
  //     }
  //   ]
  // }
};

module.exports = nextConfig;
