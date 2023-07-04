"use client"

import React, { FC, useState } from 'react'
import s from './emailSent.module.scss'
import Close from '@/shared/assets/icons/close.svg'
import { Button } from '@/shared/ui/Button/Button'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

type SignUpProps = {
	lng: string
}

export const ModalWindow: FC<SignUpProps> = ({ lng }) => {
	const [isOpen, setIsOpen] = useState(true)

	const onClose = () => {
		setIsOpen(false);
	}
	const animationDelay = 1;

	const exampleEmail = 'Email from SignUp : epam@epam.com'

	const { t } = useClientTranslation(lng, 'signUpModal')
	const { isClosing, close } = useModal({ onClose, isOpen, animationDelay })

	return (

		<div className={isClosing ? s.dislpayNone : s.wrapper}>
			<div className={s.body}>
				<div className={s.title}>
					<h3>{t('SignUpModal.title')}</h3>
					<div onClick={close} className={s.xButton}>
						<span><Close /></span>
					</div>
				</div>
				<div className={s.content}>
					<p className={s.text}>{t('SignUpModal.text')} {exampleEmail}</p>
					<div className={s.buttonContainer}>
						<	Button onClick={close} type='button' className={s.button}>OK</Button>
					</div>
				</div>
			</div>
		</div >
	)
}