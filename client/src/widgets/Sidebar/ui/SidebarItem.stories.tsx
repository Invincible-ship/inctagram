import { Meta, StoryObj } from '@storybook/react'
import { SidebarItem } from './SidebarItem'
import HomeIconActive from '@/shared/assets/icons/home-active.svg'
import HomeIcon from '@/shared/assets/icons/home-outline.svg'

const meta: Meta<typeof SidebarItem> = {
  title: 'WIDGETS/SideBar/Item',
  tags: ['autodocs'],
  component: SidebarItem,
  args: {
    isActive: true,
  },
}

export default meta
type Story = StoryObj<typeof SidebarItem>

export const Home: Story = {
  args: {
    text: 'Home',
    icon: <HomeIcon />,
    iconActive: <HomeIconActive />,
    path: '/path',
  },
}
