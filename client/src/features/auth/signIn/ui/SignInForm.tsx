import {InputField} from "@/shared/ui/InputField/InputField";
import {PasswordWrapper} from "@/shared/ui/PasswordWrapper/PasswordWrapper";
import s from "@/features/auth/signIn/ui/signIn.module.scss";
import Link from "next/link";
import {Button} from "@/shared/ui/Button/Button";
import React, {FC, FormEventHandler, useState} from "react";
// import s from '@/shared/ui/Input/Input.module.scss'

export type SignInFormProps = {
	errorLogin?: string
	onSubmit: FormEventHandler<HTMLFormElement> | undefined;
	t: (key: string) => string;
	errors: Record<string, any>;
	register: any;
}

export const SignInForm: FC<SignInFormProps> = ({onSubmit, t, errors, register, errorLogin}) => {

	const [showPassword, setShowPassword] = useState(false)
	const toggleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<form onSubmit={onSubmit} className={'form-style'}>
			<InputField
				id={'email'}
				type={'email'}
				placeholder={'Epam@epam.com'}
				title={t('email')}
				register={...register('email')}
				error={errors.email}
			/>
			<PasswordWrapper
				id="password"
				className={'password'}
				placeholder={'******************'}
				type={showPassword ? 'text' : 'password'}
				title={t("password")}
				toggleShowPassword={toggleShowPassword}
				register={...register('password')}
				error={errors.password}
			/>
			<div className={s.error}>{errorLogin}</div>
			<div className={s.forgotPassword}>
				<Link className={s.forgotPasswordLink}
							href={'/forgotPassword'}>
					{t('forgotPassword')}
				</Link>
			</div>
			<Button type="submit" className={'styled-btn styled-btn-1'}>
				{t('signIn')}
			</Button>
		</form>
	)
}