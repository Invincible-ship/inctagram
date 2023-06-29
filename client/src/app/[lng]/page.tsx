import { SignUpPage } from "@/pages/SignUpPage"
import { LanguageParams } from "@/shared/config/i18n/types"
import { FC } from "react"

const Page: FC<{ params: LanguageParams }> = ({ params: { lng } }) => (
  <SignUpPage lng={lng}/>
)

export default Page