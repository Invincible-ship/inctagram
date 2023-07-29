import React from 'react'
import { Meta, Story, StoryObj } from '@storybook/react'
import { SignIn } from './signIn'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof SignIn> = {
	title: 'Components/SignIn',
	component: SignIn,
	decorators: [StoreDecorator],
}

export default meta
type Story = StoryObj<typeof SignIn>

export const Default: Story = {
	render: () => <SignIn lng="en" isLoading={false} />,
}

export const Loading: Story = {
	render: () => <SignIn lng="en" isLoading={true} />,
}

export const Error: Story = {
	render: () => <SignIn lng="en" isError={true} error={{ message: 'Error message' }} />,
}