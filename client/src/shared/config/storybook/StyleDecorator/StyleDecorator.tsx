import '@/shared/styles/index.scss'
import '@/shared/styles/variables/common.scss'
import { StoryFn } from '@storybook/react'

export const StyleDecorator = (StoryComponent: StoryFn) => {
  return (
    <div className="app">
      <StoryComponent />
    </div>
  )
}

