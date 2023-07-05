//'use client'
import { FC } from "react"
import x from 'public/svg/close.svg'
import Close from 'public/svg/close.svg'
import { Button } from "@/shared/ui/Button/Button"
import { useClientTranslation } from "@/shared/config/i18n/client";
import s from './modalWindow.module.scss';
import Image from "next/image";
import testPngImg from '@/shared/assets/img/testPng.png'


//const testPngImg = '@/shared/assets/img/testPng.png'


export type ModalWindowProps = {
	lng: string;
	onClose?: () => void;
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
						<Close />
						<span> <Image src={x} alt="pic" width={50} height={50} /> </span>
						<span> <Image src={'https://www.svgrepo.com/show/513953/alt-battery-0.svg'} alt="picture" width={50} height={50} /> </span>
						<span> <Image src={testPngImg} alt="pic" width={50} height={50} /> </span>
						<img src="./../../../../assets/icons/close.svg" alt="close" />
						<img src={'./../../../../assets/img/testPng.png'} alt="close" />
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