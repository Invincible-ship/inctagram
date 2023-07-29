import '@/shared/styles/index.scss'
import '@/shared/styles/variables/common.scss'
import { StoryFn } from '@storybook/react'
import { StoreProvider } from '@/providers/StoreProvider'
import { createReduxStore } from '@/providers/StoreProvider/config/store'

export const StoreDecorator = (StoryComponent: StoryFn) => {
	const store = createReduxStore()
	return (
		<div className="app">
			<StoreProvider store={store}>
				<StoryComponent />
			</StoreProvider>
		</div>
	)
}