import { ButtonHTMLAttributes, FC } from 'react'
import Spinner from '@/shared/assets/icons/spinner.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ButtonTheme {
  DEFAULT = 'primary',
  SECONDARY = 'secondary',
  OUTLINED = 'outlined',
  TEXT = 'text',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({
  className = '',
  theme = ButtonTheme.DEFAULT,
  isLoading,
  children,
  ...rest
}) => {
  return (
    <button
      data-testid="test"
      type="button"
      className={classNames(cls.Button, {}, [className, cls[theme]])}
      {...rest}
    >
      {isLoading && <Spinner className={cls[theme]} />}
      {children}
    </button>
  )
}
