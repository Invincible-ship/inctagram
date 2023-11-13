import { StoryFn } from '@storybook/react'
import { createReduxStore } from '@/providers/StoreProvider/config/store'
import { Provider } from 'react-redux'
import { StateSchema } from '@/providers/StoreProvider'

export const StoreDecorator = (
  StoryComponent: StoryFn,
  initialState?: DeepPartial<StateSchema>,
) => {
  const store = createReduxStore(initialState as StateSchema)

  return (
    <Provider store={store}>
      <StoryComponent />
    </Provider>
  )
}
