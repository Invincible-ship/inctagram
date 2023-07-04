import { ModalWindow } from '@/features/auth/signup'
import { FC } from 'react'

type SignUpProps = {
	lng: string
}

export const SignUpModalPage: FC<SignUpProps> = ({ lng }) => {
	return (
		<>
			<ModalWindow lng={lng} />
		</>
	)
}