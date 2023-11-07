import { Namespaces } from '@/shared/config/i18n/types'
import { DottedMenuIcon } from '@/shared/ui/DottedMenuIcon/DottedMenuIcon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/Dropdown/Dropdown'
import React, { CSSProperties, useContext, useMemo, useState } from 'react'
import SettingsIcon from '@/shared/assets/icons/settings.svg'
import StatisticsIcon from '@/shared/assets/icons/trending-up.svg'
import FavoritesIcon from '@/shared/assets/icons/bookmark.svg'
import { useSelector } from 'react-redux'
import { getUserId } from '@/entities/User'
import { Routes } from '@/shared/types/routes'
import { HStack, VStack } from '@/shared/ui/Stack'
import { SignOut } from '@/features/auth/signout'
import { useRouter } from 'next/navigation'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useClientTranslation } from '@/shared/config/i18n/client'

export const HeaderMenu = () => {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false)
  const lngId = useContext(LanguageContext)
  const { t } = useClientTranslation(Namespaces.HEADER)
  const userId = useSelector(getUserId)
  const router = useRouter()

  const handleMenuStateChange = (open: boolean) => setIsMenuActive(open)

  const menuItems = useMemo(
    () => [
      {
        icon: <SettingsIcon />,
        text: t('menu.settings'),
        href: `/${lngId}${Routes.PROFILE}/${userId}/edit`,
      },
      {
        icon: <StatisticsIcon />,
        text: t('menu.statistics'),
        href: `/${lngId}/#`,
      },
      {
        icon: <FavoritesIcon />,
        text: t('menu.favorites'),
        href: `/${lngId}/#`,
      },
    ],
    [userId, lngId, t],
  )

  const signOutStyles: CSSProperties = {
    width: '100%',
    padding: '6px 12px',
    fontWeight: 500,
    justifyContent: 'flex-start',
    gap: '12px',
  }

  return (
    <DropdownMenu onOpenChange={handleMenuStateChange}>
      <DropdownMenuTrigger>
        <DottedMenuIcon isActive={isMenuActive} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <VStack gap="12">
          {menuItems.map(({ href, text, icon }) => (
            <DropdownMenuItem key={text} onSelect={() => router.push(href)}>
              <HStack align="center" gap="12">
                <span>{icon}</span>
                {text}
              </HStack>
            </DropdownMenuItem>
          ))}
          <SignOut style={signOutStyles} />
        </VStack>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
