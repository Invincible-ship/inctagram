import { Meta, StoryObj } from '@storybook/react'
import { SidebarItem } from './Sidebar.Item'
import HomeIcon from '../../../../public/icons/home-outline.svg'
import HomeIconActive from '../../../../public/icons/home-active.svg'
import CreateIcon from '../../../../public/icons/create-outline.svg'
import CreateIconActive from '../../../../public/icons/create-active.svg'
import MyProfileIcon from '../../../../public/icons/profile-outline.svg'
import MyProfileIconActive from '../../../../public/icons/profile-active.svg'
import MessengerIcon from '../../../../public/icons/messenger-outline.svg'
import MessengerIconActive from '../../../../public/icons/messenger-active.svg'
import SearchIcon from '../../../../public/icons/search-outline.svg'
import SearchIconActive from '../../../../public/icons/search-active.svg'
import StatisticsIcon from '../../../../public/icons/statistics-outline.svg'
import StatisticsIconActive from '../../../../public/icons/statistics-active.svg'
import FavoritesIcon from '../../../../public/icons/favorites-outline.svg'
import FavoritesIconActive from '../../../../public/icons/favorites-active.svg'
import LogOutIcon from '../../../../public/icons/log-out.svg'
import LogOutIconActive from '../../../../public/icons/log-out-active.svg'

const meta: Meta<typeof SidebarItem> = {
  title: 'WIDGETS/SideBar/Item',
  tags: ['autodocs'],
  component: SidebarItem,
  args: {
    isActive: true,
    path: '/path',
  },
}

export default meta
type Story = StoryObj<typeof SidebarItem>

export const Home: Story = {
  args: {
    text: 'home',
    icon: <HomeIcon />,
    iconActive: <HomeIconActive />,
  },
}
export const Create: Story = {
  args: {
    text: 'create',
    icon: <CreateIcon />,
    iconActive: <CreateIconActive />,
  },
}
export const MyProfile: Story = {
  args: {
    text: 'profile',
    icon: <MyProfileIcon />,
    iconActive: <MyProfileIconActive />,
  },
}
export const Messenger: Story = {
  args: {
    text: 'messenger',
    icon: <MessengerIcon />,
    iconActive: <MessengerIconActive />,
  },
}
export const Search: Story = {
  args: {
    text: 'search',
    icon: <SearchIcon />,
    iconActive: <SearchIconActive />,
  },
}
export const Statistics: Story = {
  args: {
    text: 'statistics',
    icon: <StatisticsIcon />,
    iconActive: <StatisticsIconActive />,
  },
}
export const Favorites: Story = {
  args: {
    text: 'favorites',
    icon: <FavoritesIcon />,
    iconActive: <FavoritesIconActive />,
  },
}
export const LogOut: Story = {
  args: {
    text: 'logOut',
    icon: <LogOutIcon />,
    iconActive: <LogOutIconActive />,
  },
}
