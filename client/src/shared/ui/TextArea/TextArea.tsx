import { classNames } from '@/shared/lib/classNames/classNames'
import { DetailedHTMLProps, FC, TextareaHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import cls from './TextArea.module.scss'

type DefaultTextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

type TextAreaProps = DefaultTextAreaProps & {
  title?: string
  error?: FieldError
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ key, id, title, error, ...rest }, ref) => {
    const mods = {
      [cls.errorTextArea]: !!error,
    }

    return (
      <div key={key} className={cls.textAreaWrapper}>
        <label htmlFor={id}>{title}</label>
        <textarea ref={ref} className={classNames(cls.textArea, mods)} maxLength={200} {...rest} />
        {error && <span className={cls.textAreaError}>{error.message}</span>}
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'
