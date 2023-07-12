import { FC } from 'react'
import { EmailConfirmation, MergeAccount } from '@/features/auth/signup'
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

