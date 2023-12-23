import { classNames } from '@/shared/lib/classNames/classNames'
import { DetailedHTMLProps, TextareaHTMLAttributes, forwardRef, memo } from 'react'
import { FieldError } from 'react-hook-form'
import cls from './TextArea.module.scss'
import { HStack } from '@/shared/ui/Stack'

type DefaultTextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

type TextAreaProps = DefaultTextAreaProps & {
  title?: string
  withCounter?: boolean
  error?: FieldError
}

export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ id, value, title, className, maxLength = 200, error, withCounter, ...rest }, ref) => {
      const mods = {
        [cls.errorTextArea]: !!error,
      }

      return (
        <div className={cls.textAreaWrapper}>
          <label htmlFor={id}>{title}</label>
          <textarea
            id={id}
            ref={ref}
            value={value}
            className={classNames(cls.textArea, mods, [className])}
            maxLength={maxLength}
            {...rest}
          />
          {withCounter && (
            <HStack className={cls.counter} justify="end" max>
              {(value as string)?.length || 0}/{maxLength}
            </HStack>
          )}
          {!!error && <span className={cls.textAreaError}>{error.message}</span>}
        </div>
      )
    },
  ),
)

TextArea.displayName = 'TextArea'
