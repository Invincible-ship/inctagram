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
export type ResendLinkParamsType = {
  email: string
}

export type CongratResendUIPropsType = {
  title: string
  text: string
  buttonText: string
  action: () => void
}
