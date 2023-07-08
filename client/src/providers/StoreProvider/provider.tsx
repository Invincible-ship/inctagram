"use client"

import { Provider } from "react-redux";
import store from "@/providers/StoreProvider/config/store";
import {GlobalError} from "@/shared/ui/GlobalError/GlobalError";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <GlobalError/>
    {children}
  </Provider>;
}
