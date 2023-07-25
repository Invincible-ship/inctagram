import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './signIn'

const meta: Meta<typeof SignIn> = {
  title: 'features/SignIn',
  component: SignIn,
}

export default meta
type Story = StoryObj<typeof SignIn>;

export const Default: Story = {
  render: () => <SignIn />,
}