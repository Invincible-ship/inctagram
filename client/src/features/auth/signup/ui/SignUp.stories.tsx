import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { SignUp } from './signup'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import './signup.module.scss'

const meta: Meta<typeof SignUp> = {
  title: 'Components/SignUp',
  component: SignUp,
  decorators: [StoreDecorator],
}

export default meta
type Story = StoryObj<typeof SignUp>

export const Default: Story = {
  render: () => <SignUp />,
}

export const Loading: Story = {
  render: () => <SignUp />,
}

export const Error: Story = {
  render: () => <SignUp />,
}
