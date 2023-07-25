"use client"

import { Provider } from "react-redux"
import {store} from "@/providers/Provider/config/store"



export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>
    {/*<GlobalError/> //перенести в layout*/}
    {children}
  </Provider>
}
