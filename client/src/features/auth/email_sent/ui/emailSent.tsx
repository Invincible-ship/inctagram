import s from './emailSent.module.scss'
import Close from '@/shared/assets/icons/close.svg'
import '@/shared/styles/reset.scss'

export const EmailSent = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.body}>
				<div className={s.title}>
					<h3>Email sent</h3>
					<span><Close /></span>
				</div>
				<div className={s.content}>
					<p className={s.text}>We have sent a link to confirm your email to epam@epam.com</p>
					<button className={s.button}>OK</button>
				</div>
			</div>
		</div>
	)
}