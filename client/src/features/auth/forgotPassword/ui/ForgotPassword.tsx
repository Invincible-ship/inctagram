"use client"

import React, {FC, useState} from 'react'
import Link from "next/link"
import './forgotPassword.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import {Button} from "@/shared/ui/Button/Button"
import ReCAPTCHA from "react-google-recaptcha"
import {useClientTranslation} from "@/shared/config/i18n/client";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {InputField} from "@/shared/ui/InputField/InputField";
import {authThunks} from "@/features/auth/signup/model/slice/auth.slice";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch"
import {avatarUpload} from "@/features/avatarUpload";



type ForgotPassword = {
    lng: string
}

type FormSchemaType = z.infer<typeof formSchema>

const formSchema = z
    .object({
        userName: z.string().min(6, "Username is required").max(30),
        email: z.string().email("Invalid email").min(1, "Email is required"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must have more than 6 characters").max(20),
        passwordConfirmation: z.string().min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "Passwords do not match",
    })

function onChange(value) {
    console.log("Captcha value:", value)
}

export const ForgotPassword: FC<ForgotPassword> = ({lng}) => {

    const { t } = useClientTranslation(lng, 'resetPage')
    const dispatch = useAppDispatch()
    const [isActive, setIsActive] = useState(false)

    let handleClick

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        dispatch(authThunks.register(data))
        handleClick = () => {
            setIsActive(true)
        }
    }



    return (
        <div className={'form'}>
            <div className='form-wrapper auth-form'>

                <div className={'title b-title bt26 semibold align-center'}>{t('mainTitle')}</div>

                <form className={'form-style' } onSubmit={handleSubmit(onSubmit)} novalidate>

                        <InputField
                            id={"email"}
                            type={"email"}
                            placeholder={t('signUp.email')}
                            title={t('signUp.email')}
                            register={...register("email")}
                            error={errors.email}
                        />

                    <span className={'info b-title bt14 semibold'}>{t('info')}</span>

                    <span className="sentByEmail" style={{display: isActive ? " " : "none"}}>{t('sentByEmail')}</span>

                    <Button type="submit" onClick={handleClick} className={'styled-btn styled-btn-1'} >{t('sendLink')}</Button>

                    <Link href={'/login'} className="b-title bt16 semibold link-registration align-center"><span>{t('BackToSignIn')}</span></Link>

                    <ReCAPTCHA
                        style={{display: isActive ? "none" : ""}}
                        sitekey="6LdPYuImAAAAAGngeM-aK5HsW-CVdTPXbQP6GB6Y"
                        onChange={onChange}
                        theme="dark"
                    />
                </form>

            </div>

        </div>
    )
}

