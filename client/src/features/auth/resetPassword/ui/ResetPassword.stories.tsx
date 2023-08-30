import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ResetPassword } from './ResetPassword'

const meta: Meta<typeof ResetPassword> = {
  title: 'Components/ResetPassword',
  component: ResetPassword,
  decorators: [StoreDecorator],
}

export default meta
type Story = StoryObj<typeof ResetPassword>

export const ResetPasswordComponent: Story = {
  render: () => <ResetPassword />,
}
