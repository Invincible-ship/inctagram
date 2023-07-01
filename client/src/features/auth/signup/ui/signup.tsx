"use client"
// TODO: повторяющиеся input-field и password-wrapper сделать отдельным компонентом
// TODO: стили из signup.scss сделать модульными, чтобы избежать коллизии имен - signup.module.scss

import React, {FC, useState} from 'react'
import Input from "@/shared/ui/Input/Input"
import Eye from '@/shared/assets/icons/eye-outline.svg'
import Link from "next/link"
import './signup.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import {Button} from "@/shared/ui/Button/Button"
import Google from '../../../../assets/icon/google.svg'
import Github from '../../../../assets/icon/github.svg'
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {authThunks} from "@/features/auth/auth.slice";
import {useAppDispatch, useAppSelector} from "@/shared/lib/hooks";

type FormSchemaType = z.infer<typeof formSchema>

const formSchema = z
    .object({
        username: z.string().min(1, "Username is required").max(100),
        email: z.string().email("Invalid email").min(1, "Email is required"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must have more than 8 characters"),
        confirmPassword: z.string().min(1, "Password confirmation is required"),
        terms: z.literal(true, {
            errorMap: () => ({message: "You must accept the terms and conditions"}),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type SignUpProps = {
  lng: string
}

export const SignUp: FC<SignUpProps> = ({ lng }) => {
    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        resolver: zodResolver(formSchema),
    });


    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
        dispatch(authThunks.register(data))
    };

    // if (isLoggedIn) {
    //     return <div>SuccessSuccessSuccessSuccessSuccessSuccessSuccessSuccess</div>
    // }


    return (
      <div className={'form registration'}>
        <div className='form-wrapper auth-form'>

          <div className={'title b-title bt26 semibold align-center'}>Sign Up</div>
          <div className={'icon-wrapper'}>
            <Google/>
            <Github/>
          </div>

                <form onSubmit={handleSubmit(onSubmit)} className={'form-style'}>
                    <div className={'field input-field'}>
                        <Input
                            id="username"
                            type="text"
                            className={'input'}
                            placeholder={'Epam'}
                            title={'UserName'}
                            username="Username"
                            {...register('username')}
                        />
                        {errors.username && (
                            <span className={'error-lbl'}>{errors.username.message}</span>
                        )}
                    </div>
                    <Input
                        id="email"
                        type="email"
                        className={'input'}
                        placeholder={'Epam@epam.com'}
                        title={'Email'}
                        name="email"
                        {...register('email')}
                    />
                    {errors.email && (
                        <span className={'error-lbl'}>{errors.email.message}</span>
                    )}
                    <div className={'password-wrapper'}>
                        <Input
                            id="password"
                            className={'password'}
                            placeholder={'******************'}
                            type={showPassword ? 'text' : 'password'}
                            title={'Password'}
                            name="password" {...register('password')}
                        />
                        {errors.password && errors.password ? (
                            <span className={'error-lbl'}>{errors.password}</span>
                        ) : null}
                        <span className='eye' onClick={toggleShowPassword}><Eye/></span>
                    </div>

            <div className={'password-wrapper'}>
              <Input
                            id="confirmPassword"
                            className={'password'}
                            placeholder={'******************'}
                            type={showConfirmPassword ? 'text' : 'password'}
                            title={'Password confirmation'}
                            name="confirmPassword" {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && errors.confirmPassword ? (
                            <span className={'error-lbl'}>{errors.confirmPassword}</span>
                        ) : null}
                        <span className='eye' onClick={toggleShowConfirmPassword}><Eye/></span>
                    </div>
                    <Button type="submit" className={'styled-btn styled-btn-1'} disabled={isSubmitting}>Sign Up</Button>
                </form>
                <span className={'info b-title bt14  align-center semibold'}>Do you have an account?</span>
                <Link href={'/login'}
                      className="b-title bt16 semibold link-registration align-center"><span>Sign In</span></Link>
            </div>
        </div>
    )
}

