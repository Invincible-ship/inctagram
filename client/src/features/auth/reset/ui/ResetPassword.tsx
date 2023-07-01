"use client"

import React, {FC, useState} from 'react'
import Input from "@/shared/ui/Input/Input"
import Eye from '@/shared/assets/icons/eye-outline.svg'
import './reset.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import {Button} from "@/shared/ui/Button/Button"
import {useClientTranslation} from "@/shared/config/i18n/client"

type ResetPassword = {
    lng: string
}

export const ResetPassword: FC<ResetPassword> = ({ lng }) => {

    const { t } = useClientTranslation(lng, 'resetPage')
    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
      <div className={'form registration'}>
        <div className='form-wrapper auth-form'>

          <div className={'title b-title bt26 semibold align-center'}>{t('mainTitleReset')}</div>
          <div className={'icon-wrapper'}>

          </div>

          <form  className={'form-style'}>
                    
            <div className={'password-wrapper'}>
              <Input
                            id="password"
                            className={'password'}
                            placeholder={'******************'}
                            type={showPassword ? 'text' : 'password'}
                            title={t('inputTitleNewPassword')}
                        />
              <span className={'error-lbl'}>{}</span>
              <span className='eye' onClick={toggleShowPassword}><Eye /></span>
            </div>

            <div className={'password-wrapper'}>
              <Input
                            id="confirmPassword"
                            className={'password'}
                            placeholder={'******************'}
                            type={showConfirmPassword ? 'text' : 'password'}
                            title={t('inputTitleConfirmPassword')}
                        />
              <span className={'error-lbl'}>{}</span>
              <span className='eye' onClick={toggleShowConfirmPassword}><Eye /></span>
            </div>
              <span className={'info b-title bt14  align-center semibold'}>{t('infoReset')}</span>
            <Button type="submit" className={'styled-btn styled-btn-1'}>{t('CreateNewPasswordReset')}</Button>
          </form>


        </div>
      </div>
    )
}

