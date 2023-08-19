import i18n from '@/shared/config/i18n/i18n'
import React, { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import type { Preview, StoryFn } from '@storybook/react'
import { StyleDecorator } from '@/shared/config/storybook/StyleDecorator/StyleDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'ru', right: 'ru', title: 'Russian' },
      ],
      showName: true,
    },
  },
}

// When The language changes, set the document direction
i18n.on('languageChanged', locale => {
  const direction = i18n.dir(locale)
  document.dir = direction
})

// Wrap your stories in the I18nextProvider component
//! Story, context needs types ================
const i18nextStoryDecorator = (Story: any, context: any) => {
  const { locale } = context.globals

  // When the locale global changes
  // Set the new locale in i18n
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    // here catches the suspense from components not yet ready (still loading translations)
    // alternative set useSuspense false on i18next.options.react when initializing i18next
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  )
}

// export decorators for storybook to wrap your stories in
export const decorators = [i18nextStoryDecorator]

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
    decorators: [
      (Story: StoryFn) => StyleDecorator(Story),
      (Story: StoryFn) => StoreDecorator(Story),
    ],
  },
}

export default preview
