import { AppDispatch } from "@/providers/StoreProvider/config/store"
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from "react-redux"

export const useAppDispatch = () => useDispatch<AppDispatch>()