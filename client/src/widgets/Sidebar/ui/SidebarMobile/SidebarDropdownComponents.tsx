import React, { forwardRef, ReactNode } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export const DropdownMenuContent = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content {...props} ref={forwardedRef}>
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    )
  },
)

export const DropdownMenuLabel = DropdownMenuPrimitive.Label
export const DropdownMenuItem = DropdownMenuPrimitive.Item
export const DropdownMenuGroup = DropdownMenuPrimitive.Group

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator
