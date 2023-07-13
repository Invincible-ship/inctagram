import { FC } from 'react'
import { EmailConfirmation, MergeAccount, ResendLink } from '@/features/auth/signup'
import { LanguageParams } from '@/shared/config/i18n/types'

export const MergeAccountPage: FC<{ params: LanguageParams }> = (
    { params: { lng } }
) => {
    return <MergeAccount lng={lng} />
}
export const EmailConfirmationPage: FC<{ params: LanguageParams }> = (
    { params: { lng } }
) => {
    return <EmailConfirmation lng={lng} />
}
export const ResendLinkPage: FC<{ params: LanguageParams }> = (
    { params: { lng } }
) => {
    return <ResendLink lng={lng} />
}

