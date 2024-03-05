import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'widgets/Header',
  component: Header,
}

export default meta
type Story = StoryObj<typeof Header>

export const Authorized: Story = {
  render: () => <Header isAuthorized isUserInited />,
}

export const NonAuthorized: Story = {
  render: () => <Header isUserInited />,
}
