"use client"

import React, {useState} from 'react'
import Input from "@/shared/ui/Input/Input"
import Eye from '@/shared/assets/icons/eye-outline.svg'
import Link from "next/link"
import './../../signup/ui/signup.scss'
import '../../../../shared/styles/variables/common/_form.scss'
import '../../../../shared/styles/variables/common/_b-titles.scss'
import '../../../../shared/styles/variables/common/_buttons.scss'
import {Button} from "@/shared/ui/Button/Button"
import Google from '@/shared/assets/icons/google.svg'
import Github from '@/shared/assets/icons/github.svg'
import s from './signIn.module.scss'
import {useClientTranslation} from '@/shared/config/i18n/client'
import {SubmitHandler, useForm} from "react-hook-form"
import {z} from "zod"
import {authThunks} from "@/features/auth/auth.slice"
import {useAppDispatch} from "@/shared/lib/hooks"
import {zodResolver} from "@hookform/resolvers/zod"
import {FormSchemaType} from "@/features/auth/signin/model/types/types"

export const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
  })

export const SignIn = () => {
  const {t} = useClientTranslation()

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data)
    dispatch(authThunks.register(data))
  }

  return (
    <div className={'form registration' + ' ' + `${s.wrapper}`}>
      <div className="form-wrapper auth-form">
        <div className={'title b-title bt26 semibold align-center'}>
          {t('signIn.signIn')}
        </div>
        <div className={'icon-wrapper'}>
          <Google/>
          <Github/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={'form-style'}>
          <Input
            id="email"
            type="email"
            className={'input'}
            placeholder={'Epam@epam.com'}
            title={t("signIn.email")}
            {...register('email')}
          />
          {errors.email && (
            <span className={'error-lbl'}>
            {errors.email.message}
          </span>
          )}
          <div className={'password-wrapper'}>
            <Input
              id="password"
              className={'password'}
              placeholder={'******************'}
              type={showPassword ? 'text' : 'password'}
              title={t("signIn.password")}
              {...register("password")}
            />
            <span className="eye" onClick={toggleShowPassword}>
              <Eye/>
            </span>
            {errors.password && (
              <span className={'error-lbl'}>
              {errors.password.message}
            </span>
            )}
          </div>
          <div className={s.forgotPassword}>
            <Link className={s.forgotPasswordLink}
                  href={'/forgotPassword'}>
              {t('signIn.forgotPassword')}
            </Link>
          </div>
          <Button type="submit" className={s.signInButton} disabled={isSubmitting}>
            {t('signIn.signIn')}
          </Button>
        </form>
        <span className={'info b-title bt16 align-center'}>
          {t("signIn.dontHaveAnAccount")}?
        </span>
        <Link href={'/'} className="b-title bt16 semibold link-registration align-center">
        <span>
          {t('signIn.signUp')}
        </span>
        </Link>
      </div>
    </div>
  )
}

