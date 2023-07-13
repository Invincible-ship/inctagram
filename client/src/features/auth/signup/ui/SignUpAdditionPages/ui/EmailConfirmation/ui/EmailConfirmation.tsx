'use client'

import { FC, useEffect, useState } from "react"
import { SignUpAdditionPagespProps } from "../../CommonBlock/ui/CommonBlock"
import { useRouter, useSearchParams } from "next/navigation"
import { Congratulation } from "../../Congratulation/ui/Congratulation"
import { EmailConfirmationModal } from "./EmailConfirmationModal/ui/EmailConfirmationModal"

const emailIsConfirmed = 'success'
const emailWasUsed = 'confirm'

export const EmailConfirmation: FC<SignUpAdditionPagespProps> = ({ lng }) => {

    const router = useRouter();
    const search = useSearchParams()
    const [status, setStatus] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (search) {
            const queryStatus = search.get('status')
            {
                queryStatus === emailWasUsed
                    ? setIsOpen(true)
                    : null
            }
            { queryStatus && setStatus(queryStatus) }
        }
    }, [search])

    const goToLogin = () => {
        router.push('/login')
    }
    const onClose = () => {
        setIsOpen(!isOpen)
    }

    if (status === emailIsConfirmed) {
        return <Congratulation buttonAction={goToLogin} lng={lng} />
    }
    else if (status === emailWasUsed) {
        return <>
            <Congratulation buttonAction={goToLogin} lng={lng} />
            <EmailConfirmationModal lng={lng} onClose={onClose} isOpen={isOpen} />
        </>
    }
}