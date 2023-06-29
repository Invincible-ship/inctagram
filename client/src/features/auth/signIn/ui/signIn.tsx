'use client'

import React, { useState } from 'react'
import Input from "@/shared/ui/Input/Input"
import Eye from '@/assets/icon/eye-outline.svg'
import Link from "next/link"
import './../../signup/ui/signup.scss'
import '../../../../shared/styles/variables/common/_form.scss'
import '../../../../shared/styles/variables/common/_b-titles.scss'
import '../../../../shared/styles/variables/common/_buttons.scss'
import { Button } from "@/shared/ui/Button/Button"
import Google from '../../../../assets/icon/google.svg'
import Github from '../../../../assets/icon/github.svg'
import s from './signIn.module.scss'

export const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);

	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<div className={'form registration' + ' ' + `${s.wrapper}`}>
			<div className='form-wrapper auth-form'>

				<div className={'title b-title bt26 semibold align-center'}>Sign Up</div>
				<div className={'icon-wrapper'}>
					<Google />
					<Github />
				</div>

				<form className={'form-style'}>

					<Input
						id="email"
						type="email"
						className={'input'}
						placeholder={'Epam@epam.com'}
						title={'Email'}
					/>
					<span className={'error-lbl'}>{ }</span>

					<div className={'password-wrapper'}>
						<Input
							id="password"
							className={'password'}
							placeholder={'******************'}
							type={showPassword ? 'text' : 'password'}
							title={'Password'}
						/>
						<span className={'error-lbl'}>{ }</span>
						<span className='eye' onClick={toggleShowPassword}><Eye /></span>
					</div>

					<div className={s.forgotPassword}>
						<Link className={s.forgotPasswordLink} href={'/forgotPassword'}>Forgot Password</Link>
					</div>

					<Button type="submit" className={s.signInButton}>Sign In</Button>
				</form>
				<span className={'info b-title bt16 align-center'}>Do you have an account?</span>
				<Link href={'/login'} className="b-title bt16 semibold link-registration align-center"><span>Sign Up</span></Link>
			</div>
		</div>
	)
}

