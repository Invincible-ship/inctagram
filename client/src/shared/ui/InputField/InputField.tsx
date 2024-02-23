import { Input } from '@/shared/ui/Input/Input'
import { FC } from 'react'
import '@/app/styles/variables/common/_form.scss'
import '@/app/styles/variables/common/_b-titles.scss'
import '@/app/styles/variables/common/_buttons.scss'
import { FieldError } from 'react-hook-form'

type InputFieldProps = {
  id: string
  type: string
  className?: string
  placeholder: string
  title: string
  register?: any
  error?: FieldError
  full?: boolean
}

export const InputField: FC<InputFieldProps> = ({
  id,
  type,
  className,
  placeholder,
  title,
  register,
  error,
  full,
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
        full={full}
        withoutWhitespace
        {...register}
      />
    </div>
  )
}
