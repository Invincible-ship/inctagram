import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'
import s from './Input.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import { FieldError } from 'react-hook-form'
import { classNames } from '@/shared/lib/classNames/classNames'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputPropsType = DefaultInputPropsType & {
  error?: FieldError
  title?: string
  full?: boolean
  name: string
}

const Input = forwardRef<HTMLInputElement, InputPropsType>(
  ({ error, className, id, type, title, full, ...restProps }, ref) => {
    const wrapperMods = {
      [s.full]: full,
    }

    const inputMods = {
      [s.errorInput]: !!error?.message,
    }

    return (
      <div className={classNames(s.inputWrapper, wrapperMods)}>
        <label htmlFor={id}>{title}</label>
        <input
          ref={ref}
          id={id}
          type={type ? type : 'text'}
          className={classNames(s.styledInput, inputMods, [className])}
          {...restProps}
          data-testid="input"
        />
        <div id={id ? id + '-span' : undefined} className={s.errorBlock}>
          {error && <span className={`${s.error}`}>{error.message}</span>}
        </div>
      </div>
    )
  },
)
export default Input

Input.displayName = 'Input'
