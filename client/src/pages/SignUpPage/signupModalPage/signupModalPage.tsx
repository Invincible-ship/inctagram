import { SignUpModalWindow } from '@/features/auth/signup/ui/signupModalWindow'
import { FC } from 'react'

type SignUpProps = {
	lng: string
}

export const SignUpModalPage: FC<SignUpProps> = ({ lng }) => {
	return (
  <div className={'content'}>
    <SignUpModalWindow lng={lng} />
  </div>
	)
}