'use client'

import { FC, ReactNode } from 'react'
import { StateSchema } from '../config/StateSchema'
import { Provider } from 'react-redux'
import { createReduxStore } from '../config/store'

type StoreProviderProps = {
  initialState?: DeepPartial<StateSchema>
  children?: ReactNode
  initialStore?: ReturnType<typeof createReduxStore>
}

export const StoreProvider: FC<StoreProviderProps> = ({ initialState, children, initialStore }) => {
  const store = initialStore || createReduxStore(initialState as StateSchema)

  return <Provider store={store}>{children}</Provider>
}
