'use client'

import {SignUpForm} from './SignUpForm'
import {SocialButtons} from './SocialButtons'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useClientTranslation} from '@/shared/config/i18n/client'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import style from './signup.module.scss'
import {
    FormSchemaType,
    formSchema,
} from '../lib/validationConstants/validationConstants'
import {zodResolver} from '@hookform/resolvers/zod'
import Link from 'next/link'
import {Preloader} from '@/shared/ui/Preloader/Preloader'
import {signupThunk} from '../model/signup'
import {useSelector} from 'react-redux'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Namespaces } from '@/shared/config/i18n/types'
import {useContext} from "react"
import {LanguageContext} from "@/providers/LanguageProvider/LanguageProvider"
import {getIsLoading} from "@/features/auth/signup/model/selectors/getIsLoading"

export const SignUp = () => {
    const lngId = useContext(LanguageContext)
    const isLoading = useSelector(getIsLoading)
    const dispatch = useAppDispatch()
    const { t } = useClientTranslation(lngId, Namespaces.SIGNUP)
    const schema = formSchema(t)

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm<FormSchemaType>({
        reValidateMode: 'onBlur',
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<FormSchemaType> = data => {
        dispatch(signupThunk({body: data, setError}))
    }

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className={'form registration'}>
            <div className="form-wrapper auth-form">
                <div className={'title b-title bt26 semibold align-center'}>{t('signUp')}</div>
                <SocialButtons/>
                <SignUpForm
                    onSubmit={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    t={t}
                    errors={errors}
                    register={register}
                />
                <span className={`info b-title bt14  align-center semibold`}>
          {t('doYouHaveAnAccount')}
        </span>
                <Link
                    href={'/signIn'}
                    className={`b-title bt16 semibold ${style.linkRegistration} align-center`}
                >
                    <span>{t('signIn')}</span>
                </Link>
            </div>
        </div>
    )
}
