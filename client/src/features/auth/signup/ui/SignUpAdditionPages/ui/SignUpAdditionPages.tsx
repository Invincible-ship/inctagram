'use client'

import { Button } from '@/shared/ui/Button/Button'
import s from './SignUpAdditionPages.module.scss'
import PictureQuestion from '@/shared/assets/icons/merge-image.svg'
import PictureDone from '@/shared/assets/icons/mergeDone-image.svg'
import { ButtonTheme } from '@/shared/ui/Button/Button'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { FC, ReactNode } from 'react'

type SignUpAdditionPagespProps = {
	lng: string
}


export const SignUpAdditionPages: FC<SignUpAdditionPagespProps> = ({ lng }) => {

	const changePageContent = {
		//merge: false,
		merge: true,
		//done: true,
		done: false
	}

	const { t } = useClientTranslation(lng, 'SignUpAdditionPages')


	return (
		<div className={s.accountMerging}>
			<div className={s.wrapper}>
				<div className={s.body}>
					{changePageContent.merge && <Title titleText={t('title.merge')} />}
					{changePageContent.done && <Title titleText={t('title.done')} />}
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
	</div>
}

type Props = {
	title: string
	text: string | any
	children?: ReactNode
}

const InfiBlock: FC<Props> = ({ title, text, children }) => {

	return <>
		<div className='title'>
			{title}
		</div>
		<div className='text'>{text}</div>
		<img></img>
		{children}
	</>
}

//button block

const MergAccount: FC<{}> = () => {

	return <>
		<InfiBlock text="The user.." title='merg accounts' >
			<button>X</button>
			<button>Y</button>
		</InfiBlock>
	</>

}