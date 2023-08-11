import { Meta, StoryObj } from '@storybook/react'
import { SidebarItem } from './SidebarItem'
//import { HomeIcon } from './iconsComponents/HomeIcon'
import { HomeIconActive } from './iconsComponents/HomeIconActive'
import HomeIc from '@/shared/assets/icons/home-outline.svg'

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
    icon: <HomeIc />,
    iconActive: <HomeIconActive />,
    path: '/path',
  },
}
