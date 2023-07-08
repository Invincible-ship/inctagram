import { FC } from 'react'
import { Congratulation, MergeAccount, Verification } from '@/features/auth/signup'
import { LanguageParams } from '@/shared/config/i18n/types'

export const MergeAccountPage: FC<{ params: LanguageParams }> = (
    { params: { lng } }
) => {
    return <MergeAccount lng={lng} />
}
export const CongratulationPage: FC<{ params: LanguageParams }> = (
    { params: { lng } }
) => {
    return <Congratulation lng={lng} />
}
export const VerificationPage: FC<{ params: LanguageParams }> = (
    { params: { lng } }
) => {
    return <Verification lng={lng} />
}
