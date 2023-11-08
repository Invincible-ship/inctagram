import React, {
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
} from 'react'
import s from './Input.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import { FieldError } from 'react-hook-form'
import { classNames } from '@/shared/lib/classNames/classNames'
import { LanguageIds } from '@/shared/config/i18n/types'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: FieldError
  spanClassName?: string
  title?: string
  full?: boolean
  register: any
  lngId: LanguageIds
  name: string
}

const Input = forwardRef<HTMLInputElement, InputPropsType>(
  (
    {
      onChange,
      onChangeText,
      onKeyPress,
      onEnter,
      error,
      className,
      id,
      type,
      title,
      full,
      required,
      handleValidation,
      register,
      ...restProps
    },
    ref,
  ) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onChangeText?.(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyPress?.(e)
      onEnter && // если есть пропс onEnter
        e.key === 'Enter' && // и если нажата кнопка Enter
        onEnter() // то вызвать его
    }

    const wrapperMods = {
      [s.full]: full,
    }

    const inputMods = {
      [s.errorInput]: !!error?.message,
    }

    return (
      <div className={classNames(s.inputWrapper, wrapperMods)}>
        <label htmlFor={id}>
          {title}
          {required && (
            <span className={s.error} style={{ position: 'static' }}>
              {' '}
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={id}
          type={type ? type : 'text'}
          onChange={onChangeCallback}
          onKeyPress={onKeyPressCallback}
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
