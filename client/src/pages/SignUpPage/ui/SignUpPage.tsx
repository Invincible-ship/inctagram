import { SignUp } from "@/features/auth/signup"
import { LanguageParams } from "@/shared/config/i18n/types"
import { FC } from "react"

export const SignUpPage = () => {
  return (
    <div className={"content"}>
      <SignUp />
    </div>
  )
}
