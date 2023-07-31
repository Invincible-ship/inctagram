"use client"

import React, { useContext, useState} from 'react'
import Link from "next/link"
import style from './signup.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import {Button} from "@/shared/ui/Button/Button"
import {SubmitHandler, useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {InputField} from "@/shared/ui/InputField/InputField"
import {PasswordWrapper} from "@/shared/ui/PasswordWrapper/PasswordWrapper"
import {useClientTranslation} from "@/shared/config/i18n/client"
import {GoogleButton} from "@/shared/ui/GoogleButton/GoogleButton"
import {GitHubButton} from "@/shared/ui/GitHubButton/GitHubButton"
import {useSignUpMutation} from "@/features/auth/signup/model/api/signUpApi"
import {Preloader} from "@/shared/ui/Preloader/Preloader"
import { RegisterParamsType } from '../model/types/types'

export const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {t} = useClientTranslation('', 'signUp')

    const userNameRequired = t("validate.userNameRequired")
    const userNameMaxLength = t("validate.userNameMaxLength")
    const emailInvalid = t("validate.emailInvalid")
    const emailRequired = t("validate.emailRequired")
    const passwordRequired = t("validate.passwordRequired")
    const passwordMinLength = t("validate.passwordMinLength")
    const passwordMaxLength = t("validate.passwordMaxLength")
    const passwordConfirmationRequired = t("validate.passwordConfirmationRequired")
    const passwordsDoNotMatch = t("validate.passwordsDoNotMatch")
    const formSchema = z
        .object({
            userName: z.string().min(6, userNameRequired).max(30, userNameMaxLength),
            email: z.string().email(emailInvalid).min(1, emailRequired),
            password: z
                .string()
                .min(1, passwordRequired)
                .min(6, passwordMinLength).max(20, passwordMaxLength),
            passwordConfirmation: z.string().min(1, passwordConfirmationRequired),
        })
        .refine((data) => data.password === data.passwordConfirmation, {
            path: ["passwordConfirmation"],
            message: passwordsDoNotMatch,
        })
    type FormSchemaType = z.infer<typeof formSchema>

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const [signUp, {isLoading, isError, error}] = useSignUpMutation()


    if (isLoading) {
        return <Preloader/>
    }

    if (isError) {
        if (typeof error === 'string') {
            return <h1>{error}</h1>
        } else if (error && 'error' in error) {
            return <h1>{error.error}</h1>
        }
    }


    const onSubmit: SubmitHandler<FormSchemaType> = async (data: RegisterParamsType) => {
        try {
            await signUp(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
      <div className={"form registration"}>
        <div className="form-wrapper auth-form">
          <div className={"title b-title bt26 semibold align-center"}>{t('signUp')}</div>
          <div className={style.iconWrapper}>
            <GoogleButton/>
            <GitHubButton/>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={"form-style"}>
            <InputField
                        id={"userName"}
                        type={"text"}
                        placeholder={t('userName')}
                        title={t('userName')}
                        register={register("userName")}
                        error={errors.userName}
                    />
            <InputField
                        id={"email"}
                        type={"email"}
                        placeholder={t('email')}
                        title={t('email')}
                        register={register("email")}
                        error={errors.email}
                    />
            <PasswordWrapper
                        id={"password"}
                        placeholder={t('password')}
                        type={showPassword ? "text" : "password"}
                        title={t('password')}
                        register={register("password")}
                        toggleShowPassword={toggleShowPassword}
                        error={errors.password}
                    />
            <PasswordWrapper
                        id={"passwordConfirmation"}
                        placeholder={t('passwordConfirmation')}
                        type={showConfirmPassword ? "text" : "password"}
                        title={t('passwordConfirmation')}
                        register={register("passwordConfirmation")}
                        toggleShowPassword={toggleShowConfirmPassword}
                        error={errors.passwordConfirmation}
                    />
            <Button type="submit" className={"styled-btn styled-btn-1"}>
              {t('signUp')}
            </Button>
          </form>
          <span className={`info b-title bt14  align-center semibold`}>{t('doYouHaveAnAccount')}</span>
          <Link href={"/login"} className={`b-title bt16 semibold ${style.linkRegistration} align-center`}>
            <span>{t('signIn')}</span>
          </Link>
        </div>
      </div>
    )
}
