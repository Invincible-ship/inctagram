// SignUpForm.tsx
'use client';
import React, { FC, FormEventHandler, useState } from 'react';
import { InputField } from '@/shared/ui/InputField/InputField';
import { PasswordWrapper } from '@/shared/ui/PasswordWrapper/PasswordWrapper';
import { Button } from '@/shared/ui/Button/Button';
import '@/shared/styles/variables/common/_form.scss';
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import {toast} from "react-toastify";
import isActive = toast.isActive;

export type ForgotPasswordFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleClick: FormEventHandler<HTMLFormElement> | undefined;
  isLoading: boolean;
  t: (key: string) => string;
  errors: Record<string, any>;
  register: any;
};

function onChange(value) {
    console.log("Captcha value:", value)
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onSubmit,
  t,
  errors,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };



  return (
      <form className={'form-style'} onSubmit={onSubmit} noValidate>

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

          <Button type="submit" onClick={handleClick} className={'styled-btn styled-btn-1'}>{t('sendLink')}</Button>

          <Link href={'/login'}
                className="b-title bt16 semibold link-registration align-center"><span>{t('BackToSignIn')}</span></Link>

          <ReCAPTCHA
              style={{display: isActive ? "none" : ""}}
              sitekey="6LdPYuImAAAAAGngeM-aK5HsW-CVdTPXbQP6GB6Y"
              onChange={onChange}
              theme="dark"
          />
      </form>
  );
};
