import React from 'react'
import { Meta, Story, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import {ResetPassword} from "@/features/auth/resetPassword";
import {action} from "@storybook/addon-actions";
import {errors} from "openid-client";

const meta: Meta<typeof ResetPassword> = {
  title: 'Components/ResetPassword',
  component: ResetPassword,
  decorators: [StoreDecorator],
}

export default meta
type Story = StoryObj<typeof ResetPassword>

export const Default: Story = {
  render: () => <ResetPassword lng="en" isLoading={false} />,
}

export const Loading: Story = {
  render: () => <ResetPassword lng="en" isLoading={true} />,
}

export const Error: Story = {
  render: () => <ResetPassword
      lng="en"
      isError={true}
      errors={errors}
  />,
}
