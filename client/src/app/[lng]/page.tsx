//import { SignUpPage } from "@/pages/SignUpPage"
//export default SignUpPage

//import { SignUpModalPage } from '@/pages/SignUpPage/signupModalPage/signupModalPage'
//export default SignUpModalPage

import { MergeAccountPage, VerificationPage, CongratulationPage } from '@/pages/SignUpPage'
import { LanguageParams } from '@/shared/config/i18n/types'
import { FC } from 'react'
import s from '@/features/auth/signup/ui/SignUpAdditionPages/ui/SignUpAdditionPagesStyles/SignUpAdditionPages.module.scss'

const SignUpAdditionPages: FC<{ params: LanguageParams }> =
	({ params: { lng } }) => {

		return <>
			<div className={s.box}>
				<MergeAccountPage lng={lng} />
				<CongratulationPage lng={lng} />
				<VerificationPage lng={lng} />
			</div >
		</>
	}


export default SignUpAdditionPages