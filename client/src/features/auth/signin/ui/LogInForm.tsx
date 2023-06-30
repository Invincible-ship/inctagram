'use client'
import s from './LoginForm.module.scss'
import { Button } from "@/shared/ui/Button/Button"
import Link from "next/link"
import { useForm } from "react-hook-form"
import Input from "@/shared/ui/Input/Input"
import React, { useState } from "react"
import Google from "@/assets/icon/google.svg"
import Github from "@/assets/icon/github.svg"
import Eye from "@/assets/icon/eye-outline.svg"
import '../../signup/ui/signup.scss'
import '../../../../shared/styles/variables/common/_form.scss'
import '../../../../shared/styles/variables/common/_b-titles.scss'
import '../../../../shared/styles/variables/common/_buttons.scss'
import { useClientTranslation } from '@/shared/config/i18n/client'

export const LogInForm = () => {
	const { t } = useClientTranslation()
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const { register, handleSubmit } = useForm({
		mode: "onChange",
	})

	const onSubmit = handleSubmit((data) => console.log(data))
	return (
		<div className={'form registration'}>
			<div className="form-wrapper auth-form">
				<div className={'title b-title bt26 semibold align-center'}>
					{t('signIn')}
				</div>
				<div className={'icon-wrapper'}>
					<Google />
					<Github />
				</div>
				<form onSubmit={onSubmit} className={'form-style'}>
					<div className={'field input-field'}>
						<Input
							id={"userEmail"}
							type={"email"}
							className={'input'}
							placeholder={'Epam@epam.com'}
							title={t("email")}
							{...register('email')}
						/>
						<span className={'error-lbl'}></span>
					</div>
					<div className={'password-wrapper'}>
						<Input
							id="password"
							className={'password'}
							placeholder={'******************'}
							type={showPassword ? 'text' : 'password'}
							title={t("password")}
							{...register("password")}
						/>
						<span className={'error-lbl'}></span>
						<span className="eye" onClick={toggleShowPassword}><Eye /></span>
					</div>
					<div>
					</div>
					<div className={s.passRecovery}>
						<Link href="/" className={s.link}>
							{t('forgotPassword')}
						</Link>
					</div>
					<Button type="submit"
						className={'styled-btn styled-btn-1'}
					>
						{t('signIn')}
					</Button>
				</form>
				<span
					className={'info b-title bt14  align-center semibold'}>
					{t("dontHaveAnAccount")}
				</span>
				<Link href={'/signup'}
					className="b-title bt16 semibold link-registration align-center">
					<span>{t('signUp')}</span>
				</Link>
			</div>
		</div>
	)


}
