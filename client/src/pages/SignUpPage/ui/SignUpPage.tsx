import { ModalWindow, SignUp } from '@/features/auth/signup'
import { LanguageParams } from '@/shared/config/i18n/types'
import { FC } from 'react'
import s from '@/features/auth/signup/ui/modalWindow/ui/emailSent.module.scss'

export const SignUpPage: FC<{ params: LanguageParams }> = (
	{ params: { lng } }
) => {
	return (
		<div className={s.pageContainer}>
			<SignUp lng={lng} />
			<ModalWindow lng={lng} />
		</div>
	)
}