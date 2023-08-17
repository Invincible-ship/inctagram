import { Meta, StoryObj } from '@storybook/react'
import DropdownMenu from './DropdownMenu'
import DropdownIcon from '../../../../public/icons/dropdown-outline.svg'
import SettingsIcon from '../../../../public/icons/settings-outline.svg'
import SettingsIconActive from '../../../../public/icons/settings-active.svg'
import LogOutIcon from '../../../../public/icons/log-out.svg'
import LogOutIconActive from '../../../../public/icons/log-out-active.svg'

const meta: Meta<typeof DropdownMenu> = {
  title: 'shared/DropdownMenu',
  tags: ['autodocs'],
  component: DropdownMenu,
  args: {},
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  args: {
    icon: <DropdownIcon />,
    items: [
      { text: 'settings', icon: <SettingsIcon />, iconActive: <SettingsIconActive />, path: '/#' },
      { text: 'logOut', icon: <LogOutIcon />, iconActive: <LogOutIconActive />, path: '/#' },
    ],
    t: () => 'tranlation text',
  },
}
