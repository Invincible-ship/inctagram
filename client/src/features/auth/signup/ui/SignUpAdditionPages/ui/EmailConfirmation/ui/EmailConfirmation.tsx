'use client'

import { FC, useEffect, useState } from "react"
import { SignUpAdditionPagespProps } from "../../CommonBlock/ui/CommonBlock"
import { useRouter, useSearchParams } from "next/navigation"
import { useEmailResendingMutation, useRegistrationConfirmationMutation } from "@/features/auth/signup/model/slice/rtkQslice"
import { Congratulation } from "../../Congratulation/ui/Congratulation"
import { Verification } from "../../Verification/ui/Verification"
import { SignUpModal } from "../../../../modalWindow/ui/SignUpModal"


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

    const goToLogin = () => {
        router.push('/login')
    }
    //========================================================================================================================================================
    //for SignUpModal & Congratulations
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(!isOpen)
        goToLogin()
    }

    useEffect(() => {
        if (response.isError && response.error.status === 400) {
            setIsOpen(true);
        }
    }, [response.isError]);

    if (response.isLoading) {
        return <div><h2>Loading....</h2></div>
    }

    //========================================================================================================================================================



    //if (response.isLoading) {
    //    return <div> <h2>Loading...</h2></div>
    //}
    //if (response.isSuccess) {
    //    return <>
    //        <Congratulation lng={lng} buttonAction={goToLogin} />
    //    </>
    //}
    //if (response.isError && response.error.status === 400) {
    //    console.log(response.error.status);
    //    return <>
    //        <h1>hello</h1>
    //        <Congratulation lng={lng} buttonAction={goToLogin} />
    //        <SignUpModal isOpen={isOpen} lng={lng} onClose={onClose} userEmail={'84300krm@gmail.com'} />
    //    </>

    //}
    //if (response.isError) {
    //    const resendLink = () => {
    //        resendLinkToEmail({ email: '84300krm@gmail.com' }).unwrap()
    //        alert('resent link')
    //    }
    //    return <Verification lng={lng} buttonAction={resendLink} />
    //}
    return <h1>hello</h1>
}