import { Meta, StoryObj } from '@storybook/react'
import DropdownMobileMenu from './SidebarDropdown'
import DropdownIcon from '../../../../../public/icons/dropdown-outline.svg'
import SettingsIcon from '../../../../../public/icons/settings-outline.svg'
import SettingsIconActive from '../../../../../public/icons/settings-active.svg'
import StatisticsIcon from '../../../../../public/icons/statistics-outline.svg'
import StatisticsIconActive from '../../../../../public/icons/statistics-active.svg'
import FavoritesIcon from '../../../../../public/icons/favorites-outline.svg'
import FavoritesIconActive from '../../../../../public/icons/favorites-active.svg'
import LogOutIcon from '../../../../../public/icons/log-out.svg'
import LogOutIconActive from '../../../../../public/icons/log-out-active.svg'

const meta: Meta<typeof DropdownMobileMenu> = {
  title: 'WIDGETS/SideBar/DropdownMobileMenu',
  tags: ['autodocs'],
  component: DropdownMobileMenu,
  args: {},
}

export default meta
type Story = StoryObj<typeof DropdownMobileMenu>

export const Default: Story = {
  args: {
    icon: <DropdownIcon />,
    menuItems: [
      { text: 'settings', icon: <SettingsIcon />, iconActive: <SettingsIconActive />, path: '/#' },
      {
        text: 'statistics',
        icon: <StatisticsIcon />,
        iconActive: <StatisticsIconActive />,
        path: '/#',
      },
      {
        text: 'favorites',
        icon: <FavoritesIcon />,
        iconActive: <FavoritesIconActive />,
        path: '/#',
      },
      { text: 'logOut', icon: <LogOutIcon />, iconActive: <LogOutIconActive />, path: '/#' },
    ],
  },
}
