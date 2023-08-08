// SignUpForm.tsx
'use client';
import React, { FC, FormEventHandler, useState } from 'react';
import { InputField } from '@/shared/ui/InputField/InputField';
import { Button } from '@/shared/ui/Button/Button';
import '@/shared/styles/variables/common/_form.scss';
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import {SubmitHandler, useForm} from "react-hook-form";
import {formSchema, FormSchemaType} from "@/features/auth/forgotPassword/lib/validationConstants/validationConstants";
import {zodResolver} from "@hookform/resolvers/zod";
import {useClientTranslation} from "@/shared/config/i18n/client";

export type ForgotPasswordFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  verifyCaptcha: any;
  isLoading: boolean;
  t: (key: string) => string;
  errors: Record<string, any>;
  register: any;
  isActive: boolean;
  setIsActive: boolean;
  recaptcha_response: string;
};

// function onChange(token) {
//     console.log("Captcha value:", token)
// }

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onSubmit,
  t,
  errors,
  register,
  isActive,
  setIsActive,
  recaptcha_response,
  verifyCaptcha,
  onChange,
}) => {



  return (
      <form className={'form-style'} onSubmit={onSubmit} >

          <InputField
              id={"email"}
              type={"email"}
              placeholder={t('email')}
              title={t('email')}
              register={...register("email")}
              error={errors.email}
          />

          <span className={'info b-title bt14 semibold'}>{t('info')}</span>

          <span className="sentByEmail" style={{display: isActive ? " " : "none"}}>{t('sentByEmail')}</span>

          <Button type="submit"  className={'styled-btn styled-btn-1'}>{t('sendLink')}</Button>
          {/*onClick={handleClick}*/}
          <Link href={'/login'}
                className="b-title bt16 semibold link-registration align-center"><span>{t('BackToSignIn')}</span></Link>

          <ReCAPTCHA
              id="reCaptcha"
              style={{display: isActive ? "none" : ""}}
              sitekey="6LdPYuImAAAAAGngeM-aK5HsW-CVdTPXbQP6GB6Y"
              onChange={verifyCaptcha}
              theme="dark"
          />
          <div id="g-recaptcha-error"></div>
      </form>

  );

};
