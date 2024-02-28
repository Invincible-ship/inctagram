import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import cls from './RadioButton.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type RadioButtonProps = Omit<DefaultInputPropsType, 'type'> & {
  disabled?: boolean
  className?: string
  label?: string
}

export const RadioButton: FC<RadioButtonProps> = ({ label, id, className, disabled, ...rest }) => {
  const mods = {
    [cls.disabled]: disabled,
  }

  return (
    <div className={classNames(cls.RadioButton, mods, [className])}>
      <input id={id} type="radio" className={cls.input} {...rest}></input>
      <label htmlFor={id} className={cls.label}>
        <span className={cls.custom}>
          <span className={cls.circle}></span>
        </span>
        {label}
      </label>
    </div>
  )
}
