import { Meta, StoryObj } from '@storybook/react'
import { SidebarItem } from './SidebarItem'

const meta: Meta<typeof SidebarItem> = {
  title: 'WIDGETS/SideBar/Item',
  tags: ['autodocs'],
  component: SidebarItem,
}

export default meta
type Story = StoryObj<typeof SidebarItem>

export const Home: Story = {
  args: {
    text: 'Home',
  },
}
