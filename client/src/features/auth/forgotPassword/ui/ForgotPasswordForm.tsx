// SignUpForm.tsx
'use client';
import React, { FC, FormEventHandler, useState } from 'react';
import { InputField } from '@/shared/ui/InputField/InputField';
import { PasswordWrapper } from '@/shared/ui/PasswordWrapper/PasswordWrapper';
import { Button } from '@/shared/ui/Button/Button';
import '@/shared/styles/variables/common/_form.scss';
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import {SubmitHandler, useForm} from "react-hook-form";
import {formSchema, FormSchemaType} from "@/features/auth/signup/lib/validationConstants/validationConstants";
import {zodResolver} from "@hookform/resolvers/zod";
import {useClientTranslation} from "@/shared/config/i18n/client";

export type ForgotPasswordFormProps = {
  // onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  // onClick: FormEventHandler<HTMLFormElement> | undefined;
    // ChangeStatus: FormEventHandler<HTMLFormElement> | undefined;
    // handleClick: FormEventHandler<HTMLFormElement> | undefined;
  isLoading: boolean;
  t: (key: string) => string;
  errors: Record<string, any>;
  register: any;
  //   isActive: boolean;
  //   setIsActive: boolean;
};

function onChange(value) {
    console.log("Captcha value:", value)
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  t,
  errors,
  register,
}) => {
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

    let handleClick

    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        // dispatch(authThunks.register(data))
        handleClick = () => {
            setIsActive(true)
        }
    }

  return (
      <form className={'form-style'} onSubmit={onSubmit} noValidate>

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
