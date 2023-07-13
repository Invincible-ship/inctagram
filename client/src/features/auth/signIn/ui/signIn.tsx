"use client"

import React, {useState} from 'react'
import Link from "next/link"
import style from '@/features/auth/signup/ui/signup.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import {Button} from "@/shared/ui/Button/Button"
import s from './signIn.module.scss'
import {useClientTranslation} from '@/shared/config/i18n/client'
import {SubmitHandler, useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {GoogleButton} from "@/components/GoogleButton"
import {GitHubButton} from "@/components/GitHubButton"
import {PasswordWrapper} from "@/shared/ui/PasswordWrapper/PasswordWrapper"
import {InputField} from "@/shared/ui/InputField/InputField"
import {FormSchemaType} from "@/features/auth/signIn/model/types/types"
import {useSignInMutation} from "@/features/auth/signIn/api/signIn.api"


export const SignIn = () => {
  const {t} = useClientTranslation()
  const emailReq = t("signUp.errors.emailRequired")
  const passwordReq = t("signUp.errors.passwordRequired")
  const invalidEmail = t("signUp.errors.emailInvalid")
  const passwordMinLength = t("signUp.errors.passwordMinLength")
  const passwordMaxLength = t("signUp.errors.passwordMaxLength")

  const [signIn, {}] = useSignInMutation()

  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, emailReq)
        .email(invalidEmail),
      password: z
        .string()
        .min(1, passwordReq)
        .min(6, passwordMinLength)
        .max(20, passwordMaxLength),
    })

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }


  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(formSchema),
    // mode: "onChange",
  })

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    signIn(data)
    // await dispatch(authThunks.login(data))
  }

  return (
    <div className={'form registration' + ' ' + `${s.wrapper}`}>
      <div className="form-wrapper auth-form">
        <div className={'title b-title bt26 semibold align-center'}>
          {t('signIn.signIn')}
        </div>
        <div className={style.iconWrapper}>
          <GoogleButton/>
          <GitHubButton/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={'form-style'}>
          <InputField
            id="email"
            type="email"
            placeholder={'Epam@epam.com'}
            title={t("signIn.email")}
            register={...register('email')}
            error={errors.email}
          />
          <PasswordWrapper
            id="password"
            className={'password'}
            placeholder={'******************'}
            type={showPassword ? 'text' : 'password'}
            title={t("signIn.password")}
            toggleShowPassword={toggleShowPassword}
            register={...register('password')}
            error={errors.password}
          />
          <div className={s.forgotPassword}>
            <Link className={s.forgotPasswordLink}
                  href={'/forgotPassword'}>
              {t('signIn.forgotPassword')}
            </Link>
          </div>
          <Button type="submit" className={'styled-btn styled-btn-1'}>
            {t('signIn.signIn')}
          </Button>
        </form>
        <span className={'info b-title bt16 align-center'}>
          {t("signIn.dontHaveAnAccount")}?
        </span>
        <Link href={'/'} className={`b-title bt16 semibold ${style.linkRegistration} align-center`}>
          <span>
            {t('signIn.signUp')}
          </span>
        </Link>
      </div>
    </div>
  )
}

