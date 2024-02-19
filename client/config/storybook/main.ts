import type { StorybookConfig } from '@storybook/nextjs'
import { DefinePlugin, RuleSetRule, Configuration } from 'webpack'

const config: StorybookConfig = {
  stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next-router',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../../public'],
  webpackFinal: (config: Configuration) => {
    // add svg loader
    // @ts-ignore
    const fileLoaderRule = config.module.rules.find(
      // @ts-ignore
      (rule: RuleSetRule) => /svg/.test(rule.test as string),
    ) as RuleSetRule

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

    // define global variables
    config!.plugins!.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __PROJECT__: JSON.stringify('storybook'),
      }),
    )

    // define alias for next modules
    config.resolve = {
      ...(config.resolve ?? {}),
      alias: {
        ...(config.resolve?.alias ?? {}),
        '@opentelemetry/api': 'next/dist/compiled/@opentelemetry/api',
      },
    }

    return config
  },
}
export default config
