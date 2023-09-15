// ForgotPasswordForm.tsx
'use client'
import React, { FC, FormEventHandler, useState } from 'react'
import { InputField } from '@/shared/ui/InputField/InputField'
import { Button } from '@/shared/ui/Button/Button'
import '@/shared/styles/variables/common/_form.scss'
import Link from 'next/link'
// eslint-disable-next-line import/no-extraneous-dependencies
import ReCAPTCHA from 'react-google-recaptcha'
import { Routes } from '@/shared/types/routes'
import { SubmitHandler } from 'react-hook-form'
import { Modal } from '@/shared/ui/Modal/Modal'

export type ForgotPasswordFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
  verifyCaptcha: any
  isLoading: boolean
  t: (key: string) => string
  errors: Record<string, any>
  register: any
  isActive: boolean
  setIsActive: boolean
  setRecaptchaResponse: string
  lngId: string
  setEmail: any
  isError: any
  isOpen?: boolean
  onClose?: () => void
  handleCloseModal: any
  isModalOpen: any
  recaptchaError: any
  getEmail: any
  email: string
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onSubmit,
  t,
  errors,
  register,
  isActive,
  setRecaptchaResponse,
  verifyCaptcha,
  lngId,
  setEmail,
  isLoading,
  isError,
  isModalOpen,
  handleCloseModal,
  recaptchaError,
  getEmail,
  email,
}) => {
  return (
    <>
      <form className={'form-style'} onSubmit={onSubmit}>
        <InputField
          id={'email'}
          type={'email'}
          placeholder={t('email')}
          title={t('email')}
          register={register('email')}
          error={errors.email}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <span className={'info b-title bt14 semibold'}>{t('info')}</span>

        <span className="sentByEmail" style={{ display: isActive ? ' ' : 'none' }}>
          {t('sentByEmail')}
        </span>

        <Button type="submit" className={'styled-btn styled-btn-1'} disabled={isLoading}>
          {t('sendLink')}
        </Button>
        {isError && <div>Произошла ошибка. Пожалуйста, попробуйте еще раз.</div>}
        <Link
          href={`/${lngId}${Routes.SIGNIN}`}
          className="b-title bt16 semibold link-forgot align-center"
        >
          <span>{t('BackToSignIn')}</span>
        </Link>

        <ReCAPTCHA
          id="reCaptcha"
          style={{ display: isActive ? 'none' : '' }}
          sitekey="6LdPYuImAAAAAGngeM-aK5HsW-CVdTPXbQP6GB6Y"
          onChange={verifyCaptcha}
          theme="dark"
        />
        <div id="g-recaptcha-error">{recaptchaError}</div>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-header">
          <div>
            <p>Email sent</p>
            <a className="close-button" onClick={handleCloseModal}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="body-modal">
          <p>We have sent a link to confirm your email to {email}</p>
        </div>
        <div className="modal-footer">
          <Button onClick={handleCloseModal}>
            <Link href={`/${lngId}${Routes.SIGNIN}`}>OK</Link>
          </Button>
        </div>
      </Modal>
    </>
  )
}
