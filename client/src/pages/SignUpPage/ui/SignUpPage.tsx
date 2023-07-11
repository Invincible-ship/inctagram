import { Congratulation, MergeAccount, SignUp, Verification } from '@/features/auth/signup'
import { LanguageParams } from '@/shared/config/i18n/types'
import { FC } from 'react'

export const SignUpPage: FC<{ params: LanguageParams }> = (
    { params: { lng } }
) => {
    return (
        <div style={{ marginTop: '100px', padding: '0 20px', display: 'flex', gap: '30px', justifyContent: 'center' }}>
            <SignUp lng={lng} />
        </div>
    )
}