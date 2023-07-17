import { SignUp } from "@/features/auth/signup"
import { LanguageParams } from "@/shared/config/i18n/types"
import { FC } from "react"

export const SignUpPage: FC<{ params: LanguageParams }> = ({ params: { lng } }) => {
    return (
        <div className={"content"}>
            <SignUp lng={lng} />
        </div>
    )
}
