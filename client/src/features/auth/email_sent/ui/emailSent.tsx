import s from './emailSent.module.scss'
import Close from '@/shared/assets/icons/close.svg'
import { Button } from '@/shared/ui/Button/Button'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import Link from 'next/link'

export const EmailSent = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.body}>
				<div className={s.title}>
					<h3>Email sent</h3>
					<Link href={'#'}>
						<span><Close /></span>
					</Link>
				</div>
				<div className={s.content}>
					<p className={s.text}>We have sent a link to confirm your email to epam@epam.com</p>
					<Link href={'#'} className={s.link}>
						<	Button type='button' className={s.button}>OK</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}