import { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'WIDGETS/Header',
  tags: ['autodocs'],
  component: Header,
  args: {},
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}
