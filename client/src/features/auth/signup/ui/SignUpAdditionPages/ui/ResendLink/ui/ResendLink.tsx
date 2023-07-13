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

export const ResendLink: FC<SignUpAdditionPagespProps> = ({ lng }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [email, setEmail] = useState<string>()
    const search = useSearchParams()
    const [sendLinkAgain] = useEmailResendingMutation()

    useEffect(() => {
        if (search) {
            const queryEmail = search.get('email')
            { queryEmail && setEmail(queryEmail) }
        }
    })

    const resendLink = () => {
        { email && sendLinkAgain({ email: email }) }
    }


    const { t } = useClientTranslation(lng, 'SignUpAdditionPages')
    return <>
        <CommonBlock
            title={t('verification.title')}
            text={t('verification.text')}
        >
            <div className={s.changinBox}>
                <div className={s.buttons}>
                    <Button onClick={resendLink} className={s.btn} theme={ButtonTheme.DEFAULT}>{t('verification.buttonText')}</Button>
                </div>
                <div className={s.image}>
                    <PictureVerification
                        viewBox="0 0 330 246" width="100%"
                        className={s.picture}
                    />
                </div>
            </div>
        </CommonBlock>
        <ResendLinkModal lng={lng} isOpen={true} onClose={() => { }} />
    </>
}