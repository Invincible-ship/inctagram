import React, { HTMLAttributes, ReactNode } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import CheckIcon from '@/shared/assets/icons/check.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import ArrowDown from '@/shared/assets/icons/arrow-down.svg'
import cls from './Select.module.scss'

type SelectProps = {
  children?: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
  dir?: 'ltr' | 'rtl'
  name?: string
  autoComplete?: string
  disabled?: boolean
  required?: boolean
  position?: 'item-aligned' | 'popper'
  testId?: string
  defaultSelectedItem?: ReactNode
  placeholderText?: ReactNode
  triggerClassName?: string
  valueClassName?: string
  arrowDownIconClassName?: string
  contentClassName?: string
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      children,
      value,
      placeholderText,
      triggerClassName,
      valueClassName,
      arrowDownIconClassName,
      contentClassName,
      position = 'popper',
      testId,
      defaultSelectedItem,
      ...rest
    },
    forwardedRef,
  ) => {
    return (
      <SelectPrimitive.Root value={value} {...rest}>
        <SelectPrimitive.Trigger
          ref={forwardedRef}
          data-testid={testId}
          className={classNames(cls.SelectTrigger, {}, [triggerClassName])}
        >
          <SelectPrimitive.Value
            placeholder={placeholderText}
            className={classNames(cls.SelectValue, {}, [valueClassName])}
          >
            {defaultSelectedItem || value}
          </SelectPrimitive.Value>
          <SelectPrimitive.Icon
            className={classNames(cls.SelectIcon, {}, [arrowDownIconClassName])}
          >
            <ArrowDown />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position={position}
            className={classNames(cls.SelectContent, {}, [contentClassName])}
          >
            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  },
)

Select.displayName = 'Select'

type SelectItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string
  disabled?: boolean
  textValue?: string
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...rest }, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        ref={forwardedRef}
        className={classNames(cls.SelectItem, {}, [className])}
        {...rest}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className={cls.CheckIcon} />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    )
  },
)

SelectItem.displayName = 'SelectItem'
