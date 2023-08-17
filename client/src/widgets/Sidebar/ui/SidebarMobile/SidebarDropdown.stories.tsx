import { Meta, StoryObj } from '@storybook/react'
import { SidebarDropdown } from './SidebarDropdown'

const meta: Meta<typeof SidebarDropdown> = {
  title: 'WIDGETS/SideBar/DropdownMobileMenu',
  tags: ['autodocs'],
  component: SidebarDropdown,
  args: {},
}

export default meta
type Story = StoryObj<typeof SidebarDropdown>

export const Default: Story = {}
