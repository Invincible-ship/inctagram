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
import {boolean, z} from "zod";
import {InputField} from "@/shared/ui/InputField/InputField";
import {authThunks} from "@/features/auth/signup/model/slice/auth.slice";
// import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch"
import {avatarUpload} from "@/features/avatarUpload";
import {ForgotPasswordForm} from "@/features/auth/forgotPassword/ui/ForgotPasswordForm";
import {Preloader} from "@/shared/ui/Preloader/Preloader";
import {formSchema, FormSchemaType} from "@/features/auth/signup/lib/validationConstants/validationConstants";
import {useForgotPasswordMutation} from "@/features/auth/forgotPassword/model/api/forgot_password.api";


type ForgotPassword = {
    lng?: string
}

export const ForgotPassword: FC<ForgotPassword> = ({lng}) => {

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const { t } = useClientTranslation("", 'resetPage')
    // const dispatch = useAppDispatch()

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <div className={'form'}>
            <div className='form-wrapper auth-form'>

                <div className={'title b-title bt26 semibold align-center'}>{t('mainTitle')}</div>

                <ForgotPasswordForm
                    // onSubmit={handleSubmit(onSubmit)}
                    // onClick={handleClick}
                    // isActive={isActive}
                    // setIsActive={setIsActive}
                    isLoading={isLoading}
                    t={t}
                    // errors={errors}
                    // register={register}
                />

            </div>

        </div>
    )
}

