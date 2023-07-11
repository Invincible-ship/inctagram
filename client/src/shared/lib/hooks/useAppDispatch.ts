import { AppDispatch } from "@/providers/StoreProvider/config/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();