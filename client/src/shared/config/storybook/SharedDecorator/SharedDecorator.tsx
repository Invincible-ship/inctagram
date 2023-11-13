import { StoryFn } from '@storybook/react'

export const SharedDecorator = (StoryComponent: StoryFn) => (
  <div style={{ padding: '30px 30px' }}>
    <StoryComponent />
  </div>
)
