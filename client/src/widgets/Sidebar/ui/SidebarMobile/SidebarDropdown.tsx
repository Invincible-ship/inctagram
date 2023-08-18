'use client'
import DropdownMenu from '@/shared/ui/DropdownMenu/DropdownMenu'
import { FC } from 'react'
import DropdownIcon from '../../../../../public/icons/dropdown-outline.svg'
import { dropdownMenuItems } from '../../lib/sidebarItemsData'
import { Namespaces } from '@/shared/config/i18n/types'
import { useClientTranslation } from '@/shared/config/i18n/client'

export const SidebarDropdown: FC = () => {
  const { t } = useClientTranslation('', Namespaces.SIDEBAR)
  return <DropdownMenu icon={<DropdownIcon />} items={dropdownMenuItems} t={t} />
}
