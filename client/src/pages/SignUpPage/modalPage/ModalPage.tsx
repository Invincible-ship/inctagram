import { SignUpModalWindow } from '@/features/auth/signup'
import { FC } from 'react'

type SignUpProps = {
	lng: string
}

export const SignUpModalPage: FC<SignUpProps> = ({ lng }) => {
	return (
		<>
			<SignUpModalWindow lng={lng} />
		</>
	)
}