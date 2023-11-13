import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes, AriaRole } from 'react'
import s from './Input.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import { FieldError } from 'react-hook-form'
import { classNames } from '@/shared/lib/classNames/classNames'
import Eye from '@/shared/ui/Eye/Eye'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputPropsType = DefaultInputPropsType & {
  error?: FieldError
  title?: string
  full?: boolean
  toggleShowPassword?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputPropsType>(
  ({ error, className, id, type, title, full, toggleShowPassword, role, ...restProps }, ref) => {
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
          role={role}
          type={type ? type : 'text'}
          className={classNames(s.styledInput, inputMods, [className])}
          {...restProps}
          data-testid="input"
        />
        {(type == 'password' || role == 'password') && (
          <span className={s.eye} onClick={toggleShowPassword}>
            <Eye />
          </span>
        )}
        <div id={id ? id + '-span' : undefined} className={s.errorBlock}>
          {error && <span className={`${s.error}`}>{error.message}</span>}
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'
