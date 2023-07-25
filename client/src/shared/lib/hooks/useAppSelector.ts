import { TypedUseSelectorHook, useSelector } from "react-redux"
import { RootState } from "@/providers/Provider/config/store"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
