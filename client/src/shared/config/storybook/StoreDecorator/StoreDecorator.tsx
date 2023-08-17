import { StoryFn } from '@storybook/react'
import { createReduxStore } from '@/providers/StoreProvider/config/store'
import { Provider } from 'react-redux'

export const StoreDecorator = (StoryComponent: StoryFn) => {
  const store = createReduxStore()

  return (
    <Provider store={store}>
      <StoryComponent />
    </Provider>
  )
}
