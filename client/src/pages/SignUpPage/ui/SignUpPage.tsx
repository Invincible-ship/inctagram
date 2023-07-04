import { SignUpModal, SignUp } from '@/features/auth/signup'
import { LanguageParams } from '@/shared/config/i18n/types'
import { FC } from 'react'

export const SignUpPage: FC<{ params: LanguageParams }> = (
	{ params: { lng } }
) => {
	return (
		<div style={{ marginTop: '100px', padding: '0 20px' }}>
			<SignUp lng={lng} />
			<SignUpModal lng={lng} />
		</div>
	)
}