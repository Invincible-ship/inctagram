'use client'
import { FC } from "react"
import Close from '@/shared/assets/icons/close.svg'
import { Button } from "@/shared/ui/Button/Button"
import { useClientTranslation } from "@/shared/config/i18n/client";
import s from './modalWindow.module.scss';

export type ModalWindowProps = {
	lng: string;
	onClose: () => void;
}

export const ModalWindow: FC<ModalWindowProps> = ({ lng, onClose }) => {

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