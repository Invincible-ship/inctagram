'use client'

import { FC, ReactNode } from 'react'
import { StateSchema } from '../config/StateSchema'
import { Provider } from 'react-redux'
import { createReduxStore } from '../config/store'
import { DeepPartial } from '@reduxjs/toolkit'

type StoreProviderProps = {
  initialState?: DeepPartial<StateSchema>
  children?: ReactNode
}

export const StoreProvider: FC<StoreProviderProps> = ({ initialState, children }) => {
  const store = createReduxStore(initialState as StateSchema)

  return <Provider store={store}>{children}</Provider>
}
