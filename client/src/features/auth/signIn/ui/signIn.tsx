"use client"

import React, {FC, useState} from 'react'
import Link from "next/link"
import style from '@/features/auth/signup/ui/signup.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import s from './signIn.module.scss'
import {useClientTranslation} from '@/shared/config/i18n/client'
import {SubmitHandler, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useSignInMutation} from "@/features/auth/signIn/model/api/signIn.api"
import {Preloader} from "@/shared/ui/Preloader/Preloader"
import {SocialButtons} from "@/features/auth/signup/ui/SocialButtons";
import {formSchema, FormSchemaType} from "@/features/auth/signIn/lib/validationConstants/validationConstants";
import {SignInForm} from "@/features/auth/signIn/ui/SignInForm";

export type SignInProps = {
	lng?: string;
};

export const SignIn: FC<SignInProps> = ({lng}) => {
	const {t} = useClientTranslation(lng, 'signIn')
	const schema = formSchema(t)
	const [signIn, {isLoading}] = useSignInMutation()
	const [errorLogin, setErrorLogin] = useState<string>('')

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm({
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		try {
			const response = await signIn(data).unwrap()

			if (response.accessToken) {
				localStorage.setItem('accessToken', response.accessToken)
			}
		} catch (error) {
			if (error.data && error.data.errors) {
				for (const err of error.data.errors) {
					setError(err.field, {
						type: 'server',
						message: err.message,
					});
				}
			} else {
				setErrorLogin(t('errorLogin'))
			}
		}
	};

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
					errorLogin={errorLogin}
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

