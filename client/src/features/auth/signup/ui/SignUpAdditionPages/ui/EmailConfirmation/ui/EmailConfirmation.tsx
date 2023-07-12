'use client'

import { FC, useEffect } from "react"
import { SignUpAdditionPagespProps } from "../../CommonBlock/ui/CommonBlock"
import { useRouter, useSearchParams } from "next/navigation"
import { useRegistrationConfirmationMutation } from "@/features/auth/signup/model/slice/rtkQslice"
import { Congratulation } from "../../Congratulation/ui/Congratulation"
import { Verification } from "../../Verification/ui/Verification"


export const EmailConfirmation: FC<SignUpAdditionPagespProps> = ({ lng }) => {

    const router = useRouter();
    const search = useSearchParams()
    const [sendConfirmCode, response] = useRegistrationConfirmationMutation()

    useEffect(() => {
        if (search) {
            const confirmationCode = search.get('confirmationCode')
            {
                confirmationCode && sendConfirmCode(`confirmationCode=${confirmationCode}`).unwrap()
            }
        }
    }, [search])

    const goToLogin = () => {
        router.push('/login')
    }

    console.log(response);


    if (response.isLoading) {
        return <div> <h2>Loading...</h2></div>
    }

    if (response.isSuccess) {
        return <Congratulation lng={lng} goToLogin={goToLogin} />
    }
    if (response.isError) {
        return <Verification lng={lng} />
    }

}