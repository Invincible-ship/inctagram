import Input from '@/shared/ui/Input/Input'
import { FC } from 'react'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { FieldError } from 'react-hook-form'

type InputFieldProps = {
  id: string
  type: string
  className?: 'input'
  placeholder: string
  title: string
  register: any
  error: FieldError
}

export const InputField: FC<InputFieldProps> = ({
  id,
  type,
  className,
  placeholder,
  title,
  register,
  error,
}) => {
  return (
    <div className={'field input-field'}>
      <Input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        title={title}
        error={error}
        {...register}
      />
    </div>
  )
}
