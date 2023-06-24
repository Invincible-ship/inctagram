import { ButtonHTMLAttributes, FC } from "react"

export enum ButtonTheme {

}

export enum ButtonSizes {
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl'
}

interface ButtonProps extends
  ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  size?: string;
}

const Button: FC<ButtonProps> = ({
  className,
  theme = '',
  children,
  size = ButtonSizes.M,
  ...rest
}) => {
  return (
    <button 
      type="button"
      className={''}
    >
      {children}
    </button>
  )
}
