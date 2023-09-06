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
    config!.module!.rules = config!.module!.rules!.map(
      // @ts-ignore
      (rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
          return { ...rule, exclude: /\.svg$/i }
        }

        return rule
      },
    )

    config!.module!.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config!.plugins!.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
      }),
    )

    return config
  },
}
export default config

//import type { StorybookConfig } from '@storybook/nextjs'

//const config: StorybookConfig = {
//  stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|ts|tsx)'],
//  addons: [
//    '@storybook/addon-links',
//    '@storybook/addon-essentials',
//    '@storybook/addon-interactions',
//  ],
//  framework: {
//    name: '@storybook/nextjs',
//    options: {},
//  },
//  docs: {
//    autodocs: 'tag',
//  },
//  core: {
//    builder: '@storybook/builder-webpack5',
//  },
//  webpackFinal: async config => {
//    const imageRule = config.module?.rules?.find(rule => {
//      const test = (rule as { test: RegExp }).test

//      if (!test) {
//        return false
//      }

//      return test.test('.svg')
//    }) as { [key: string]: any }

//    imageRule.exclude = /\.svg$/

//    config.module?.rules?.push({
//      test: /\.svg$/,
//      use: ['@svgr/webpack'],
//    })

//    return config
//  },
//}
//export default config
