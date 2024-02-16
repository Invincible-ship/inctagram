import { LanguageIds } from '@/shared/config/i18n/types'
import { AppLayout } from '@/shared/ui/Layouts/AppLayout'
import { StoryFn } from '@storybook/react'

export const PageDecorator = (StoryComponent: StoryFn) => {
  return (
    <AppLayout lngId={LanguageIds.EN}>
      <StoryComponent />
    </AppLayout>
  )
}
