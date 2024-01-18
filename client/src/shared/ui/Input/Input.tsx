import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useState } from 'react'
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
}

export const Input = forwardRef<HTMLInputElement, InputPropsType>(
  ({ error, className, id, type, title, full, role, ...restProps }, ref) => {
    const [valueType, setValueType] = useState(type)
    const wrapperMods = {
      [s.full]: full,
    }
    const inputMods = {
      [s.errorInput]: !!error?.message,
    }
    const toggleShowPassword = () => {
      setValueType(prevState => (prevState === 'text' ? 'password' : 'text'))
    }
    return (
      <div className={classNames(s.inputWrapper, wrapperMods, [className])}>
        <label htmlFor={id}>{title}</label>
        <input
          ref={ref}
          id={id}
          role={role}
          type={valueType}
          className={classNames(s.styledInput, inputMods)}
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
