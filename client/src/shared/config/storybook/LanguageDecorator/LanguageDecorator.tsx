import { LanguageProvider } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { StoryFn } from '@storybook/react'

export const LanguageDecorator = (StoryComponent: StoryFn) => (
  <LanguageProvider lngId={LanguageIds.EN}>
    <StoryComponent />
  </LanguageProvider>
)
