import { FC } from 'react'
import { Congratulation, MergeAccount } from '@/features/auth/signup'
import { Verification } from '@/features/auth/signup/ui/SignUpAdditionPages/ui/Verification/ui/Verification'

export const MergeAccountPage: FC<{ lng: string }> = (
	{ lng }
) => {
	return <MergeAccount lng={lng} />
}
export const CongratulationPage: FC<{ lng: string }> = (
	{ lng }
) => {
	return <Congratulation lng={lng} />
}
export const VerificationPage: FC<{ lng: string }> = (
	{ lng }
) => {
	return <Verification lng={lng} />
}