'use client'

import { Button } from '@/shared/ui/Button/Button'
import s from './accountMerging.module.scss'
import Pic from '@/shared/assets/icons/merge-image.svg'

export const AccountMerging = () => {
	return (
		<div className={s.accountMerging}>
			<div className={s.wrapper}>
				<div className={s.body}>
					<div className={s.title}>
						<h3>Merger of Accounts</h3>
					</div>
					<div className={s.content}>
						<p>The user with email Epam@epam.com is already in the system. Could we merge this accounts?</p>
					</div>
					<div className={s.buttons}>
						<Button>Yes, merge</Button>
						<Button>No</Button>
					</div>
					<div className={s.image}>
						<div className={s.imageBox}>
							<Pic
							//viewBox="0 0 432 300" width="100%" className={s.picture}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}