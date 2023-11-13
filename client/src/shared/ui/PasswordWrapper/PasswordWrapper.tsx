import { FieldError } from 'react-hook-form'
import { FC } from 'react'
import Input from '@/shared/ui/Input/Input'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import cls from '@/features/auth/signup/ui/signup.module.scss'
import Eye from '@/shared/ui/Eye/Eye'

export type PasswordWrapperProps = {
  id: string
  className?: 'password'
  placeholder: string
  type: string
  title: string
  register: any
  error: FieldError
  toggleShowPassword: () => void
}

export const PasswordWrapper: FC<PasswordWrapperProps> = ({
  id,
  className,
  placeholder,
  type,
  title,
  register,
  error,
  toggleShowPassword,
}) => {
  return (
    <div className={cls.passwordWrapper}>
      <Input
        id={id}
        className={className}
        placeholder={placeholder}
        type={type}
        title={title}
        error={error}
        {...register}
      />
      <span className={cls.eye} onClick={toggleShowPassword}>
        <Eye />
      </span>
    </div>
  )
}
