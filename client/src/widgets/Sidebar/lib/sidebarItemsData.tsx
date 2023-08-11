import HomeIcon from '@/shared/assets/icons/home-outline.svg'
import HomeIconActive from '@/shared/assets/icons/home-active.svg'
import { CreateIcon } from '../ui/iconsComponents/CreateIcon'
import { CreateIconActive } from '../ui/iconsComponents/CreateIconActive'
import { ProfileIcon } from '../ui/iconsComponents/ProfileIcon'
import { ProfileIconActive } from '../ui/iconsComponents/ProfileIconActive'
import { MessengerIconActive } from '../ui/iconsComponents/MessengerIconActive'
import { MessengerIcon } from '../ui/iconsComponents/MessengerIcon'
import { SearchIcon } from '../ui/iconsComponents/SearchIcon'
import { SearchIconActive } from '../ui/iconsComponents/SearchIconActive'
import { StatisticsIcon } from '../ui/iconsComponents/StatisticsIcon'
import { StatisticsIconActive } from '../ui/iconsComponents/StatisticsIconActive'
import { FavoritesIcon } from '../ui/iconsComponents/FavoritesIcon'
import { FavoritesIconActive } from '../ui/iconsComponents/FavoritesIconActive'
import { LogOutIcon } from '../ui/iconsComponents/LogOutIcon'
import { LogOutIconActive } from '../ui/iconsComponents/LogOutIconActive'

export const mainItems = [
  { text: 'home', icon: <HomeIcon />, iconActive: <HomeIconActive />, path: '/#' },
  { text: 'create', icon: <CreateIcon />, iconActive: <CreateIconActive />, path: '/#' },
  { text: 'myProfile', icon: <ProfileIcon />, iconActive: <ProfileIconActive />, path: '/#' },
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
export const footerItems = [
  { text: 'logOut', icon: <LogOutIcon />, iconActive: <LogOutIconActive />, path: '/#' },
]
