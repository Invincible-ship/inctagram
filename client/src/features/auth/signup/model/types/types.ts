import { ModalWindowPropsType } from '@/features/auth/emailConfiramtion/ui/ModalWindow/ModalWindow'

export type RegisterParamsType = {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
}
export type RegisterResponseType = {
  id: string
  userName: string
  email: string
  createdAt: string
}

// ResendLink API types
export type ResendLinkResponseType = {}
export type ResendLinkParamsType = {
  email: string
}

// congratResendMergeTypes
export type congratResendMergePropsType = {
  lng: string
}

export type CongratResendUIPropsType = {
  title: string
  text: string
  buttonText: string
  action: () => void
}

export type ModalPropsType = Omit<ModalWindowPropsType, 'title' | 'text'> & { lng: string }
