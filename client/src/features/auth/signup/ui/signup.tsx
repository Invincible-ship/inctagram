"use client"

import React, {FC, useState} from 'react'
import Link from "next/link"
import style from './signup.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import {Button} from "@/shared/ui/Button/Button"
import Google from '../../../../shared/assets/icons/google.svg'
import Github from '../../../../shared/assets/icons/github.svg'
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {authThunks} from "@/features/auth/signup/model/slice/auth.slice";
import {useAppDispatch} from "@/shared/lib/hooks";
import {InputField} from "@/shared/ui/InputField/InputField";
import {PasswordWrapper} from "@/shared/ui/PasswordWrapper/PasswordWrapper";
import {useClientTranslation} from "@/shared/config/i18n/client";
import {useRouter} from "next/navigation";
import {GoogleButton} from "@/components/GoogleButton";
import {signIn} from "next-auth/react";
import {GitHubButton} from "@/components/GitHubButton";

type FormSchemaType = z.infer<typeof formSchema>

const formSchema = z
    .object({
        userName: z.string().min(6, "Username is required").max(30),
        email: z.string().email("Invalid email").min(1, "Email is required"),
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

type SignUpProps = {
    lng: string
}

export const SignUp: FC<SignUpProps> = ({lng}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter();
    const dispatch = useAppDispatch()
    const {t} = useClientTranslation(lng, 'signUp')

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(formSchema),
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        dispatch(authThunks.register(data));
    };

    return (
        <div className={"form registration"}>
            <div className="form-wrapper auth-form">
                <div className={"title b-title bt26 semibold align-center"}>{t('signUp.signUp')}</div>
                <div className={style.iconWrapper}>
                    <GoogleButton/>
                    <GitHubButton/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={"form-style"}>
                    <InputField
                        id={"userName"}
                        type={"text"}
                        placeholder={t('signUp.userName')}
                        title={t('signUp.userName')}
                        register={...register("userName")}
                        error={errors.userName}
                    />
                    <InputField
                        id={"email"}
                        type={"email"}
                        placeholder={t('signUp.email')}
                        title={t('signUp.email')}
                        register={...register("email")}
                        error={errors.email}
                    />
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
                    <Button type="submit" className={"styled-btn styled-btn-1"}>
                        {t('signUp.signUp')}
                    </Button>
                </form>
                <span className={`info b-title bt14  align-center semibold`}>{t('signUp.doYouHaveAnAccount')}</span>
                <Link href={"/login"} className={`b-title bt16 semibold ${style.linkRegistration} align-center`}>
                    <span>{t('signUp.signIn')}</span>
                </Link>
            </div>
        </div>
    );
};
