'use client'

import { FC, useEffect } from "react"
import { CommonBlock, SignUpAdditionPagespProps } from "../../CommonBlock/ui/CommonBlock"
import { useClientTranslation } from "@/shared/config/i18n/client"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import PictureCongratulation from '@/shared/assets/icons/mergeDone-image.svg'
import s from './../../SignUpAdditionPagesStyles/SignUpAdditionPages.module.scss'
import { useRouter, useSearchParams } from "next/navigation"
import { useRegistrationConfirmationMutation } from "@/features/auth/signup/model/slice/rtkQslice"


export const Congratulation: FC<SignUpAdditionPagespProps> = ({ lng }) => {

    const router = useRouter();
    const search = useSearchParams()
    const [sendConfirmCode, response] = useRegistrationConfirmationMutation()

    useEffect(() => {
        if (search) {
            const confirmationCode = search.get('confirmationCode')
            {
                confirmationCode && sendConfirmCode({ confirmationCode: confirmationCode }).unwrap()
            }
        }
    }, [search])

    const goToLogin = () => {
        router.push('/login')
    }


    const { t } = useClientTranslation(lng, 'SignUpAdditionPages')
    return <>
        <CommonBlock
            text={t('congratulation.text')}
            title={t('congratulation.title')} >
            <div className={s.changinBox}>
                <div className={s.buttons}>
                    <Button onClick={goToLogin} className={s.btn} theme={ButtonTheme.DEFAULT}>{t('congratulation.buttonText')}</Button>
                </div>
                <div className={s.image}>
                    <PictureCongratulation
                        //! viewBox размеры по макету - hardcode
                        viewBox="0 0 432 300" width="100%"
                        className={s.picture}
                    />
                </div>
            </div>
        </CommonBlock>
    </>
}