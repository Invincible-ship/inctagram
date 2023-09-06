import type { StorybookConfig } from '@storybook/nextjs'
import { DefinePlugin, RuleSetRule, Configuration } from 'webpack'

const config: StorybookConfig = {
  stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: (config: Configuration) => {
    // @ts-ignore
    const fileLoaderRule = config.module.rules.find(rule => rule!.test.test('.svg')) as RuleSetRule

    config!.module!.rules!.push(
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

    fileLoaderRule!.exclude = /\.svg$/i

    config!.plugins!.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
      }),
    )

    return config
  },
}
export default config
