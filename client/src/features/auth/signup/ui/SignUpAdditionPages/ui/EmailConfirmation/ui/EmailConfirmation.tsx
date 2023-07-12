'use client'

import { FC, useEffect } from "react"
import { SignUpAdditionPagespProps } from "../../CommonBlock/ui/CommonBlock"
import { useRouter, useSearchParams } from "next/navigation"
import { useEmailResendingMutation, useRegistrationConfirmationMutation } from "@/features/auth/signup/model/slice/rtkQslice"
import { Congratulation } from "../../Congratulation/ui/Congratulation"
import { Verification } from "../../Verification/ui/Verification"


export const EmailConfirmation: FC<SignUpAdditionPagespProps> = ({ lng }) => {

    const router = useRouter();
    const search = useSearchParams()
    const [sendConfirmCode, response] = useRegistrationConfirmationMutation()
    const [resendLinkToEmail] = useEmailResendingMutation()

    useEffect(() => {
        if (search) {
            const code = search.get('confirmationCode')
            { code && sendConfirmCode(`confirmationCode=${code}`).unwrap() }
        }
    }, [search])

    console.log(response);


    if (response.isLoading) {
        return <div> <h2>Loading...</h2></div>
    }
    if (response.isSuccess) {
        const goToLogin = () => {
            router.push('/login')
        }
        return <Congratulation lng={lng} buttonAction={goToLogin} />
    }
    if (response.isError) {
        const resendLink = () => {
            resendLinkToEmail({ email: '84300krm@gmail.com' })
            alert('resent link')
        }
        return <Verification lng={lng} buttonAction={resendLink} />
    }

}