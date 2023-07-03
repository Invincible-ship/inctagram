//import { SignUpAdditionPages } from '@/features/auth/signup/ui/SignUpAdditionPages/ui/SignUpAdditionPages'
import { FC } from 'react'
import { LanguageParams } from '@/shared/config/i18n/types'
import { MergeAccount } from '@/features/auth/signup'

export const MergeAccountPage: FC<{ params: LanguageParams }> = (
	{ params: { lng } }
) => {
	return <MergeAccount lng={lng} />
}