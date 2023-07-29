"use client"

import React, {FC} from 'react'
import Link from "next/link"
import style from '@/features/auth/signup/ui/signup.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import s from './signIn.module.scss'
import {useClientTranslation} from '@/shared/config/i18n/client'
import {SubmitHandler, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Preloader} from "@/shared/ui/Preloader/Preloader"
import {SocialButtons} from "@/features/auth/signup/ui/SocialButtons"
import {formSchema, FormSchemaType} from "@/features/auth/signIn/lib/validationConstants/validationConstants"
import {SignInForm} from "@/features/auth/signIn/ui/SignInForm"
import {useSelector} from "react-redux"
import {StateSchema} from "@/providers/StoreProvider"
import {signInThunk} from "@/features/auth/signIn/lib/signInThunk/signInThunk"
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch"

export type SignInProps = {
	lng?: string;
};

export const SignIn: FC<SignInProps> = ({lng}) => {
	const {t} = useClientTranslation(lng, 'signIn')
	const schema = formSchema(t)
	const isLoading = useSelector<StateSchema, boolean>(state => state.signInReducer.isLoading)
	const dispatch = useAppDispatch()
	const error = useSelector<StateSchema, boolean>(state => state.signInReducer.error)

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		await dispatch(signInThunk(data))
	}

	if (isLoading) {
		return <Preloader/>
	}

	return (
  <div className={'form registration' + ' ' + `${s.wrapper}`}>
    <div className="form-wrapper auth-form">
      <div className={'title b-title bt26 semibold align-center'}>
        {t('signIn')}
      </div>
      <SocialButtons/>
      <SignInForm
					t={t}
					errors={errors}
					register={register}
					onSubmit={handleSubmit(onSubmit)}
					errorLogin={error ? t("errorLogin") : ''}
				/>
      <span className={'info b-title bt16 align-center'}>
        {t("dontHaveAnAccount")}?
      </span>
      <Link href={'/auth/registration'} className={`b-title bt16 semibold ${style.linkRegistration} align-center`}>
        <span>
          {t('signUp')}
        </span>
      </Link>
    </div>
  </div>
	)
}

