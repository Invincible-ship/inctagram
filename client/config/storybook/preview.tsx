import type { Preview, StoryFn } from '@storybook/react'
import { StyleDecorator } from '@/shared/config/storybook/StyleDecorator/StyleDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

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
  },
  decorators: [
    (Story: StoryFn) => StyleDecorator(Story),
    (Story: StoryFn) => StoreDecorator(Story),
  ],
}

export default preview
