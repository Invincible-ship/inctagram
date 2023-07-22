import { ModalWindowPropsType } from "@/shared/ui/Modal/children/ui/ModalWindow"

export type congratResendMergePropsType = {
  lng: string,
}

export type CongratResendUIPropsType = {
  title: string
  text: string
  buttonText: string
  action: () => void
}

export type ModalPropsType = Omit<ModalWindowPropsType, 'title' | 'text'> & { lng: string }