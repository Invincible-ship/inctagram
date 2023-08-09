import { SignUp } from "@/features/auth/signup"
import { useServerTranslation } from "@/shared/config/i18n/server"
import { LanguageParams, Namespaces } from "@/shared/config/i18n/types"
import { FC } from "react"

export const SignUpPage: FC<{ params: LanguageParams }> = 
  async ({ params: { lng: lngId } }) => {
  
  // const tResponse = useServerTranslation(lngId, Namespaces.SIGNUP)
  //   .then(res => res.t)

  return (
    <div className={"content"}>
      <SignUp lngId={lngId} />
    </div>
  )
}
