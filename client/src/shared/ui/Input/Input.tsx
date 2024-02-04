import React, {
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react'
import s from './Input.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import { FieldError } from 'react-hook-form'
import { classNames } from '@/shared/lib/classNames/classNames'
import Eye from '@/shared/assets/icons/eye-outline.svg'
import { checkWhitespace } from '@/shared/utils/checkWhitespace'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputPropsType = DefaultInputPropsType & {
  withoutWhitespace?: boolean
  error?: FieldError
  title?: string
  full?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
  const {
    error,
    className,
    id,
    type,
    title,
    full,
    required,
    role,
    withoutWhitespace,
    onChange,
    ...restProps
  } = props
  const [valueType, setValueType] = useState(type)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value

    if (withoutWhitespace && checkWhitespace(val)) {
      e.target.value = val.slice(0, val.length - 1)
    }

    onChange?.(e)
  }

  const wrapperMods = {
    [s.full]: full,
  }
  const inputMods = {
    [s.errorInput]: !!error?.message,
  }

  const toggleShowPassword = () => {
    setValueType(prevState => (prevState === 'text' ? 'password' : 'text'))
  }

  const requiredContent = required ? <span className={s.requiredStar}>*</span> : ''

  return (
    <div className={classNames(s.inputWrapper, wrapperMods, [className])}>
      <div className={s.label}>
        <label htmlFor={id}>{title}</label>
        {requiredContent}
      </div>
      <input
        ref={ref}
        id={id}
        role={role}
        type={valueType}
        required={required}
        className={classNames(s.styledInput, inputMods)}
        onChange={onChangeHandler}
        {...restProps}
        data-testid="input"
      />
      {(type == 'password' || role == 'password') && (
        <span data-open={valueType != 'password'} className={s.eye} onClick={toggleShowPassword}>
          <Eye />
        </span>
      )}
      <div id={id ? id + '-span' : undefined} className={s.errorBlock}>
        {error && <span className={`${s.error}`}>{error.message}</span>}
      </div>
    </div>
  )
})

Input.displayName = 'Input'
