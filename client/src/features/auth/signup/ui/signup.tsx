import React, {useState} from 'react'
import Input from "@/shared/ui/Input/Input"
import Eye from '@/assets/icon/eye-outline.svg'
import Link from "next/link"
import './signup.scss'
import '../../../../shared/styles/variables/common/_form.scss'
import '../../../../shared/styles/variables/common/_b-titles.scss'
import '../../../../shared/styles/variables/common/_buttons.scss'
import {Button} from "@/shared/ui/Button/Button"
import Google from '../../../../assets/icon/google.svg'
import Github from '../../../../assets/icon/github.svg'

export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className={'form registration'}>
            <div className='form-wrapper auth-form'>

                <div className={'title b-title bt26 semibold align-center'}>Sign Up</div>
                <div className={'icon-wrapper'}>
                    <Google/>
                    <Github/>
                </div>

                <form  className={'form-style'}>
                    <div className={'field input-field'}>
                        <Input
                            id="userName"
                            type="text"
                            className={'input'}
                            placeholder={'Epam'}
                            title={'UserName'}
                        />
                        <span className={'error-lbl'}>{}</span>
                        </div>
                        <Input
                            id="email"
                            type="email"
                            className={'input'}
                            placeholder={'Epam@epam.com'}
                            title={'Email'}
                        />
                            <span className={'error-lbl'}>{}</span>

                    <div className={'password-wrapper'}>
                        <Input
                            id="password"
                            className={'password'}
                            placeholder={'******************'}
                            type={showPassword ? 'text' : 'password'}
                            title={'Password'}
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
                            title={'Password confirmation'}
                        />
                            <span className={'error-lbl'}>{}</span>
                        <span className='eye' onClick={toggleShowConfirmPassword}><Eye /></span>
                    </div>
                    <Button type="submit" className={'styled-btn styled-btn-1'}>Sign Up</Button>
                </form>
                <span className={'info b-title bt14  align-center semibold'}>Do you have an account?</span>
                <Link href={'/login'} className="b-title bt16 semibold link-registration align-center"><span>Sign In</span></Link>
            </div>
        </div>
    )
}

