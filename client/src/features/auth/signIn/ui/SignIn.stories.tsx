import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { SignIn } from './signIn'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof SignIn> = {
  title: 'Components/SignIn',
  component: SignIn,
  decorators: [StoreDecorator],
}

export default meta
type Story = StoryObj<typeof SignIn>

export const SignInComponent: Story = {
  render: () => <SignIn />,
}
