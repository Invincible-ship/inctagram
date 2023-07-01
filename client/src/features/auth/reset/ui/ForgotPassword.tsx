"use client"

import React, {FC, useState} from 'react'
import Input from "@/shared/ui/Input/Input"
import Link from "next/link"
import './forgot.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import {Button} from "@/shared/ui/Button/Button"
import ReCAPTCHA from "react-google-recaptcha"
import {useClientTranslation} from "@/shared/config/i18n/client";

type ForgotPassword = {
    lng: string
}

function onChange(value) {
    console.log("Captcha value:", value)
}

export const ForgotPassword: FC<ForgotPassword> = ({lng}) => {

    const { t } = useClientTranslation(lng, 'resetPage')

    const handleSubmit = (e) => {
        e.preventDefault()
        // const token = captchaRef.current.getValue()
        // captchaRef.current.reset()
    }

    return (
        <div className={'form registration'}>
            <div className='form-wrapper auth-form'>

                <div className={'title b-title bt26 semibold align-center'}>{t('mainTitle')}</div>

                <form className={'form-style' } onSubmit={handleSubmit}>
                    <Input
                        required
                        id="email"
                        type="email"
                        className={'input'}
                        placeholder={'Epam@epam.com'}
                        title={'Email'}
                    />
                    <span className={'error-lbl'}>{}</span>

                    <span className={'info b-title bt14 semibold'}>{t('info')}</span>

                    <Button type="submit" className={'styled-btn styled-btn-1'}>{t('sendLink')}</Button>


                    <Link href={'/login'} className="b-title bt16 semibold link-registration align-center"><span>{t('BackToSignIn')}</span></Link>

                    <ReCAPTCHA

                        sitekey="6LdPYuImAAAAAGngeM-aK5HsW-CVdTPXbQP6GB6Y"
                        onChange={onChange}
                        theme="dark"
                    />
                </form>
            </div>
        </div>
    )
}

