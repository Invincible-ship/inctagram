"use client"

import React, {FC, useEffect, useState} from 'react'
import './resetPassword.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import {Button} from "@/shared/ui/Button/Button"
import {useClientTranslation} from "@/shared/config/i18n/client"
import {SubmitHandler, useForm} from "react-hook-form";
// import {formSchema, FormSchema} from "@/features/auth/reset/model/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {authThunks} from "@/features/auth/signup/model/slice/auth.slice";
// import {useAppDispatch} from "@/shared/lib/hooks";
import {z} from "zod";
import {PasswordWrapper} from "@/shared/ui/PasswordWrapper/PasswordWrapper";

type ResetPassword = {
    lng: string
}

type FormSchemaType = z.infer<typeof formSchema>

const formSchema = z
    .object({
        // userName: z.string().min(6, "Username is required").max(30),
        // email: z.string().email("Invalid email").min(1, "Email is required"),
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

export const ResetPassword: FC<ResetPassword> = ({lng}) => {

    const {t} = useClientTranslation(lng, 'resetPage')

    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const dispatch = useAppDispatch()

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        dispatch(authThunks.register(data))
    }


    return (
        <div className={'form'}>
            <div className='form-wrapper auth-form'>

                <div className={'title b-title bt26 semibold align-center'}>{t('mainTitleReset')}</div>

                <form className={'form-style'} onSubmit={handleSubmit(onSubmit)}>

                    <PasswordWrapper
                        id={"password"}
                        placeholder={t('signUp.password')}
                        type={showPassword ? "text" : "password"}
                        title={t('signUp.password')}
                        register={...register("password")}
                        toggleShowPassword={toggleShowPassword}
                        error={errors.password}
                    />
                    <PasswordWrapper
                        id={"passwordConfirmation"}
                        placeholder={t('signUp.passwordConfirmation')}
                        type={showConfirmPassword ? "text" : "password"}
                        title={t('signUp.passwordConfirmation')}
                        register={...register("passwordConfirmation")}
                        toggleShowPassword={toggleShowConfirmPassword}
                        error={errors.passwordConfirmation}
                    />
                    <span className={'info b-title bt14  align-center semibold'}>{t('infoReset')}</span>
                    <Button
                        type="submit"
                        className={'styled-btn styled-btn-1'}
                    >{t('CreateNewPasswordReset')}</Button>
                </form>
            </div>
        </div>

    )
}


