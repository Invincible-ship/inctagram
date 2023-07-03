'use client'

import { Button } from '@/shared/ui/Button/Button'
import s from './SignUpAdditionPages.module.scss'
import PictureQuestion from '@/shared/assets/icons/merge-image.svg'
import PictureDone from '@/shared/assets/icons/mergeDone-image.svg'
import { ButtonTheme } from '@/shared/ui/Button/Button'

export const SignUpAdditionPages = () => {
	const changePageContent = {
		merge: false,
		//merge: true,
		done: true,
		//done: false
	}
	return (
		<div className={s.accountMerging}>
			<div className={s.wrapper}>
				<div className={s.body}>
					<Title titleText='Merger of Accounts' />
					<div className={s.content}>
						<p>The user with email Epam@epam.com is already in the system. Could we merge this accounts?</p>
					</div>
					{changePageContent.merge &&
						<div className={s.changinBox}>
							<div className={s.buttons}>
								<Button className={s.btn} theme={ButtonTheme.OUTLINED}>Yes, merge</Button>
								<Button className={s.btn} theme={ButtonTheme.OUTLINED}>No</Button>
							</div>
							<div className={s.image}>
								<PictureQuestion
									viewBox="0 0 432 300" width="100%" //*! из-за этого я потратил целый день. так SVG адаптируется
									className={s.picture}
								/>
								{/*<PictureDone
									viewBox="0 0 432 300" width="100%"
									className={s.picture}
								/>*/}
							</div>
						</div>}
					{changePageContent.done &&
						<div className={s.changinBox}>
							<div className={s.buttons}>
								<Button className={s.btn} theme={ButtonTheme.DEFAULT}>Sing In</Button>
							</div>
							<div className={s.image}>
								{/*<PictureQuestion
									viewBox="0 0 432 300" width="100%" //*! из-за этого я потратил целый день. так SVG адаптируется
									className={s.picture}
								/>*/}
								<PictureDone
									viewBox="0 0 432 300" width="100%"
									className={s.picture}
								/>
							</div>
						</div>}
				</div>
			</div>
		</div>
	)
}

type TitleProps = {
	titleText: string;
}

const Title = ({ titleText }: TitleProps) => {
	return <div className={s.title}>
		<h3>{titleText}</h3>
		{/*<h3>Merger of Accounts lorem</h3>*/}
	</div>
}