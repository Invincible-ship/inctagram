'use client'

import { FC } from "react"
import { CommonBlock, SignUpAdditionPagespProps } from "../../CommonBlock/ui/CommonBlock"
import { useClientTranslation } from "@/shared/config/i18n/client"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import PictureVerification from '@/shared/assets/icons/mergeLinkVerification-image.svg'
import s from './../../SignUpAdditionPagesStyles/SignUpAdditionPages.module.scss'

export const Verification: FC<SignUpAdditionPagespProps> = ({ lng }) => {
	const { t } = useClientTranslation(lng, 'SignUpAdditionPages')
	return <>
		<CommonBlock
			title={t('verification.title')}
			text={t('verification.text')}
		>
			<div className={s.changinBox}>
				<div className={s.buttons}>
					<Button className={s.btn} theme={ButtonTheme.DEFAULT}>{t('verification.buttonText')}</Button>
				</div>
				<div className={s.image}>
					<PictureVerification
						viewBox="0 0 330 246" width="100%"
						className={s.picture}
					/>
				</div>
			</div>
		</CommonBlock>
	</>
}