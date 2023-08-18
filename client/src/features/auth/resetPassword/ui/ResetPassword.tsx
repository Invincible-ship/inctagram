"use client"

import React, {FC, useEffect, useState} from 'react'
import './resetPassword.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import {useClientTranslation} from "@/shared/config/i18n/client"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    formSchema,
    FormSchemaType,
} from '@/features/auth/resetPassword/lib/validationConstants/validationConstants';
import {ResetPasswordForm} from "@/features/auth/resetPassword/ui/resetPasswordForm";
import {Preloader} from "@/shared/ui/Preloader/Preloader";
import {useResetPasswordMutation} from "@/features/auth/resetPassword/model/api/reset_password.api.ts";

type ResetPassword = {
    lng?: string
}

export const ResetPassword: FC<ResetPassword> = ({lng}) => {
    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const {t} = useClientTranslation("", 'resetPage')
    // const dispatch = useAppDispatch()
    const schema = formSchema(t)

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm<FormSchemaType>({
        resolver: zodResolver(schema),
    })

    console.log(errors)


    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        try {
            await resetPassword(data).unwrap();
        } catch (error) {
            if (error.data && error.data.errors) {
                for (const err of error.data.errors) {
                    setError(err.field, {
                        type: 'server',
                        message: err.message,
                    });
                }
            } else {
                console.error(error);
            }
        }
    }

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <div className={'form'}>
            <div className='form-wrapper auth-form'>
                <div className={'title b-title bt26 semibold align-center'}>{t('mainTitleReset')}</div>
                <ResetPasswordForm
                    onSubmit={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    t={t}
                    errors={errors}
                    register={register}
                />
            </div>
        </div>
    )
}


