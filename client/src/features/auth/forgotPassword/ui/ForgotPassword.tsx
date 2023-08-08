"use client"

import React, {FC, useState} from 'react'
import './forgotPassword.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import {useClientTranslation} from "@/shared/config/i18n/client";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ForgotPasswordForm} from "@/features/auth/forgotPassword/ui/ForgotPasswordForm";
import {Preloader} from "@/shared/ui/Preloader/Preloader";
import {formSchema, FormSchemaType} from "@/features/auth/forgotPassword/lib/validationConstants/validationConstants";
import {useForgotPasswordMutation} from "@/features/auth/forgotPassword/model/api/forgot_password.api";


type ForgotPassword = {
    lng?: string
}

export const ForgotPassword: FC<ForgotPassword> = ({lng}) => {

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const { t } = useClientTranslation("", 'resetPage')
    const schema = formSchema(t);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormSchemaType>({
        resolver: zodResolver(schema),
    })

    const [isActive, setIsActive] = useState(false)

    const verifyCaptcha = (token) => {
        recaptcha_response = token;
        document.getElementById('g-recaptcha-error').innerHTML = '';
    }

    let recaptcha_response = '';

    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        if(recaptcha_response.length == 0) {
            document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
            return false
        } else {
            setIsActive(true)
            return true
        }
    }
    if (isLoading) {
        return <Preloader />;
    }

    return (
        <div className={'form'}>
            <div className='form-wrapper auth-form'>

                <div className={'title b-title bt26 semibold align-center'}>{t('mainTitle')}</div>

                <ForgotPasswordForm
                    onSubmit={handleSubmit(onSubmit)}
                    verifyCaptcha={verifyCaptcha}
                    isLoading={isLoading}
                    isActive={isActive}
                    recaptcha_response={recaptcha_response}
                    t={t}
                    errors={errors}
                    register={register}
                />
            </div>
        </div>
    )
}

