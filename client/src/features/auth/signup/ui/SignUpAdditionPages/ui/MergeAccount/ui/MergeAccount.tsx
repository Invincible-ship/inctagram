'use client'

import { FC } from "react"
import { CommonBlock, SignUpAdditionPagespProps } from "../../CommonBlock/ui/CommonBlock"
import { useClientTranslation } from "@/shared/config/i18n/client"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import PictureQuestion from '@/shared/assets/icons/merge-image.svg'
import s from './../../SignUpAdditionPagesStyles/SignUpAdditionPages.module.scss'


export const MergeAccount: FC<SignUpAdditionPagespProps> = ({ lng }) => {
	const { t } = useClientTranslation(lng, 'SignUpAdditionPages')
	const emailExample = ' Email for example: Epam@epam.com '
	return <>
		<CommonBlock
			email={emailExample}
			textSecondPart={t('merge.text.textSecondPart')}
			text={t('merge.text.textFirstPart')}
			title={t('merge.title')} >
			<div className={s.changinBox}>
				<div className={s.buttons}>
					<Button className={s.btn} theme={ButtonTheme.OUTLINED}>{t('merge.buttonText.yesMerge')}</Button>
					<Button className={s.btn} theme={ButtonTheme.OUTLINED}>{t('merge.buttonText.no')}</Button>
				</div>
				<div className={s.image}>
					<PictureQuestion
						viewBox="0 0 432 300" width="100%" //*! из-за этого я потратил целый день. так SVG адаптируется
						className={s.picture}
					/>
				</div>
			</div>
		</CommonBlock>
	</>
}