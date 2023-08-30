import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ForgotPassword } from './ForgotPassword'

const meta: Meta<typeof ForgotPassword> = {
  title: 'Components/ResetPassword',
  component: ForgotPassword,
  decorators: [StoreDecorator],
}

export default meta
type Story = StoryObj<typeof ForgotPassword>

export const ForgotPasswordComponent: Story = {
  render: () => <ForgotPassword />,
}
