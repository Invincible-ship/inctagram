export type TConfirmationEmailViaCodeRequest = {
  confirmationCode: string
}
export type TConfirmationEmailViaCodeResponse = {
  email?: string
  status: string
}

export type TResendLinkBody = {
  email: string
  baseUrl: string
}
