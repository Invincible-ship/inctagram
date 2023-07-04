"use client"

import React, { FC, useState } from 'react'
import s from './emailSent.module.scss'
import Close from '@/shared/assets/icons/close.svg'
import { Button } from '@/shared/ui/Button/Button'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Modal } from '@/shared/ui/Modal/Modal'

type SignUpProps = {
	lng: string;
	onClose?: () => void;
}
export const ModalWindow: FC<SignUpProps> = ({ lng }) => {

	const onClose = () => {
		setIsOpen(!isOpen)
	}

	const [isOpen, setIsOpen] = useState(true);
	return <>
		<Modal onClose={onClose} isOpen={isOpen}  >
			<SignUpModalWindow lng={lng} onClose={onClose} />
		</Modal>
	</>
}

const SignUpModalWindow: FC<SignUpProps> = ({ lng, onClose }) => {

	const exampleEmail = 'Email from SignUp : epam@epam.com'

	const { t } = useClientTranslation(lng, 'signUpModal')

	return (

		<div className={s.wrapper}>
			<div className={s.body}>
				<div className={s.title}>
					<h3>{t('SignUpModal.title')}</h3>
					<div onClick={onClose} className={s.xButton}>
						<span><Close /></span>
					</div>
				</div>
				<div className={s.content}>
					<p className={s.text}>{t('SignUpModal.text')} {exampleEmail}</p>
					<div className={s.buttonContainer}>
						<	Button onClick={onClose} type='button' className={s.button}>OK</Button>
					</div>
				</div>
			</div>
		</div >
	)
}