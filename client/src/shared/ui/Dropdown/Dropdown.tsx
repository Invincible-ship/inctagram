import React, { FC } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import CheckIcon from '@/shared/assets/icons/check.svg'
import cls from './Dropdown.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

export const DropdownMenu = DropdownMenuPrimitive.Root

export const DropdownMenuTrigger: FC<DropdownMenuPrimitive.DropdownMenuTriggerProps> = ({
  className,
  ...rest
}) => (
  <DropdownMenuPrimitive.Trigger
    className={classNames(cls.DropdownTrigger, {}, [className])}
    {...rest}
  />
)

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuContentProps
>(
  (
    { children, className, side = 'bottom', sideOffset = 0, align = 'end', ...props },
    forwardedRef,
  ) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={forwardedRef}
          side={side}
          sideOffset={sideOffset}
          align={align}
          className={classNames(cls.DropdownContent, {}, [className])}
          {...props}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    )
  },
)

DropdownMenuContent.displayName = 'DropdownMenuContent'

export const DropdownMenuLabel = DropdownMenuPrimitive.Label
export const DropdownMenuItem: FC<DropdownMenuPrimitive.DropdownMenuItemProps> = ({
  className,
  ...rest
}) => (
  <DropdownMenuPrimitive.Item className={classNames(cls.DropdownItem, {}, [className])} {...rest} />
)
export const DropdownMenuGroup = DropdownMenuPrimitive.Group

export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem {...props} ref={forwardedRef}>
      {children}
      <DropdownMenuPrimitive.ItemIndicator>
        {props.checked === true && <CheckIcon />}
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.CheckboxItem>
  )
})

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuRadioItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.RadioItem {...props} ref={forwardedRef}>
      {children}
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.RadioItem>
  )
})

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem'

export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator
