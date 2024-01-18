import { FieldError } from 'react-hook-form'
import { AriaRole, FC } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import cls from '@/features/auth/signup/ui/signup.module.scss'

export type PasswordWrapperProps = {
  full?: boolean
  id: string
  role?: AriaRole
  className?: string
  placeholder: string
  type: string
  title: string
  register: any
  error?: FieldError
}

export const PasswordWrapper: FC<PasswordWrapperProps> = ({
  full,
  id,
  role,
  className,
  placeholder,
  type,
  title,
  register,
  error,
}) => {
  return (
    <div className={cls.passwordWrapper}>
      <Input
        full={full}
        id={id}
        role={role}
        className={className}
        placeholder={placeholder}
        type={type}
        title={title}
        error={error}
        {...register}
      />
    </div>
  )
}
