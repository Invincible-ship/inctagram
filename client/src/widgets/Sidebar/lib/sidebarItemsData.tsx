import HomeIcon from '../../../../public/icons/home-outline.svg'
import HomeIconActive from '../../../../public/icons/home-active.svg'
import CreateIcon from '../../../../public/icons/create-outline.svg'
import CreateIconActive from '../../../../public/icons/create-active.svg'
import ProfileIcon from '../../../../public/icons/profile-outline.svg'
import ProfileIconActive from '../../../../public/icons/profile-active.svg'
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
import SettingsIcon from '../../../../public/icons/settings-outline.svg'
import SettingsIconActive from '../../../../public/icons/settings-active.svg'

export const dropdownMenuItems = [
  { text: 'settings', icon: <SettingsIcon />, iconActive: <SettingsIconActive />, path: '/#' },
  {
    text: 'statistics',
    icon: <StatisticsIcon />,
    iconActive: <StatisticsIconActive />,
    path: '/#',
  },
  { text: 'favorites', icon: <FavoritesIcon />, iconActive: <FavoritesIconActive />, path: '/#' },
  { text: 'logOut', icon: <LogOutIcon />, iconActive: <LogOutIconActive />, path: '/#' },
]
export const mobileFooterItems = [
  { icon: <HomeIcon />, iconActive: <HomeIconActive />, path: '/#' },
  { icon: <CreateIcon />, iconActive: <CreateIconActive />, path: '/#' },
  { icon: <ProfileIcon />, iconActive: <ProfileIconActive />, path: '/#' },
  { icon: <MessengerIcon />, iconActive: <MessengerIconActive />, path: '/#' },
  { icon: <SearchIcon />, iconActive: <SearchIconActive />, path: '/#' },
]
export const upBlockItems = [
  { text: 'home', icon: <HomeIcon />, iconActive: <HomeIconActive />, path: '/#' },
  { text: 'create', icon: <CreateIcon />, iconActive: <CreateIconActive />, path: '/#' },
  { text: 'profile', icon: <ProfileIcon />, iconActive: <ProfileIconActive />, path: '/#' },
  { text: 'messenger', icon: <MessengerIcon />, iconActive: <MessengerIconActive />, path: '/#' },
  { text: 'search', icon: <SearchIcon />, iconActive: <SearchIconActive />, path: '/#' },
]
export const midleBlockItems = [
  {
    text: 'statistics',
    icon: <StatisticsIcon />,
    iconActive: <StatisticsIconActive />,
    path: '/#',
  },
  { text: 'favorites', icon: <FavoritesIcon />, iconActive: <FavoritesIconActive />, path: '/#' },
]
export const logoutBlockItems = [
  { text: 'logOut', icon: <LogOutIcon />, iconActive: <LogOutIconActive />, path: '/#' },
]
