"use client"

import React, { FC } from 'react'
import s from './emailSent.module.scss'
import Close from '@/shared/assets/icons/close.svg'
import { Button } from '@/shared/ui/Button/Button'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import Link from 'next/link'
import { useClientTranslation } from '@/shared/config/i18n/client'

type SignUpProps = {
	lng: string
}

export const ModalWindow: FC<SignUpProps> = ({ lng }) => {

	const { t } = useClientTranslation(lng, 'signUpModal')
	const exampleEmail = 'Email from SignUp : epam@epam.com'
	const closeModal = () => alert('closeModal')

	return (
		<div className={s.wrapper}>
			<div className={s.body}>
				<div className={s.title}>
					<h3>{t('SignUpModal.title')}</h3>
					<Link href={'#'}>
						<span><Close /></span>
					</Link>
				</div>
				<div className={s.content}>
					<p className={s.text}>{t('SignUpModal.text')} {exampleEmail}</p>
					<Link href={'#'} className={s.link}>
						<	Button onClick={closeModal} type='button' className={s.button}>OK</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}