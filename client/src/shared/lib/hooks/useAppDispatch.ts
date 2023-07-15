import { AppDispatch } from "@/providers/Provider/config/store"
import { useDispatch } from "react-redux"

export const useAppDispatch = () => useDispatch<AppDispatch>()
