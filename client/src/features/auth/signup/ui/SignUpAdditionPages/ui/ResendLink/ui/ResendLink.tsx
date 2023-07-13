'use client'

import { FC, useEffect, useState } from "react"
import { CommonBlock, SignUpAdditionPagespProps } from "../../CommonBlock/ui/CommonBlock"
import { useClientTranslation } from "@/shared/config/i18n/client"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import PictureVerification from '@/shared/assets/icons/mergeLinkVerification-image.svg'
import s from './../../SignUpAdditionPagesStyles/SignUpAdditionPages.module.scss'
import { ResendLinkModal } from "./ResendLinkModal/ui/ResendLinkModal"
import { useSearchParams } from "next/navigation"
import { useEmailResendingMutation } from "@/features/auth/signup/model/slice/rtkQslice"

const title = 'verification.title'
const text = 'verification.text'
const buttonText = 'verification.buttonText'
const languageDatabase = 'signUpAdditionPages'

export const ResendLink: FC<SignUpAdditionPagespProps> = ({ lng }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [email, setEmail] = useState<string>()
    const search = useSearchParams()
    const [sendLinkAgain, { isSuccess, isLoading }] = useEmailResendingMutation()

    useEffect(() => {
        if (search) {
            const queryEmail = search.get('email')
            { queryEmail && setEmail(queryEmail) }
        }
        { isSuccess && setIsOpen(true) }
    }, [search, isSuccess])

    const resendLink = () => {
        { email && sendLinkAgain({ email: email }) }
    }

    const onClose = () => {
        setIsOpen(false);
    }

    const { t } = useClientTranslation(lng, languageDatabase)

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <>
        <CommonBlock
            title={t(title)}
            text={t(text)}
        >
            <div className={s.changinBox}>
                <div className={s.buttons}>
                    <Button onClick={resendLink} className={s.btn} theme={ButtonTheme.DEFAULT}>{t(buttonText)}</Button>
                </div>
                <div className={s.image}>
                    <PictureVerification
                        viewBox="0 0 330 246" width="100%"
                        className={s.picture}
                    />
                </div>
            </div>
        </CommonBlock>
        <ResendLinkModal lng={lng} isOpen={isOpen} onClose={onClose} userEmail={email} />
    </>
}