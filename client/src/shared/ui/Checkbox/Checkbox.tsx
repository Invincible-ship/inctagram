import styles from './Checkbox.module.scss'
import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type CheckboxProps = DefaultInputPropsType & {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleAgree?: (check: boolean) => void
  checked?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({ handleAgree, checked, onChange, value, ...rest }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    handleAgree?.(e.currentTarget.checked)

    onChange?.(e)
  }

  return (
    <div>
      <input
        type="checkbox"
        id="myCheckbox"
        value={value}
        className={styles.customCheckbox}
        onChange={onChangeHandler}
        checked={checked}
        {...rest}
      />
      <label htmlFor="myCheckbox" className={styles.checkboxLabel}></label>
    </div>
  )
}
