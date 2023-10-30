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
  full?: boolean
}

export const Button: FC<ButtonProps> = ({
  className = '',
  theme = ButtonTheme.DEFAULT,
  isLoading,
  children,
  full,
  ...rest
}) => {
  const mods = {
    [cls.full]: full,
  }

  return (
    <button
      data-testid="test"
      type="button"
      className={classNames(cls.Button, mods, [className, cls[theme]])}
      {...rest}
    >
      {isLoading && <Spinner id={cls[theme]} />}
      {children}
    </button>
  )
}
