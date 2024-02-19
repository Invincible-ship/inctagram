import { AppRouterContext } from 'next/dist/shared/lib/app-router-context'
import type { Preview, StoryFn } from '@storybook/react'
import { StyleDecorator } from '@/shared/config/storybook/StyleDecorator/StyleDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { LanguageDecorator } from '@/shared/config/storybook/LanguageDecorator/LanguageDecorator'
import { mockedReduxData } from '@/providers/StoreProvider'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    nextRouter: {
      Provider: AppRouterContext.Provider,
    },
  },
  decorators: [
    (Story: StoryFn) => StyleDecorator(Story),
    (Story: StoryFn) => StoreDecorator(Story, { user: mockedReduxData.user }),
    (Story: StoryFn) => LanguageDecorator(Story),
  ],
}

export default preview
