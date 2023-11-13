import { AppLayout } from '@/shared/ui/Layouts/AppLayout'
import { StoryFn } from '@storybook/react'

export const PageDecorator = (StoryComponent: StoryFn) => {
  return (
    <AppLayout Fallback={() => <>Loading...</>}>
      <StoryComponent />
    </AppLayout>
  )
}
