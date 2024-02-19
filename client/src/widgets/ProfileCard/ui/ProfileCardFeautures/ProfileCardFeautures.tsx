'use client'

import { getUserId } from '@/entities/User'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { Routes } from '@/shared/types/routes'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Flex } from '@/shared/ui/Stack'
import { TFunction } from 'i18next'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, memo, useContext, useMemo } from 'react'
import { useSelector } from 'react-redux'

type ProfileCardFeauturesProps = {
  t: TFunction<Namespaces, undefined>
  mobile?: boolean
}

export const ProfileCardFeautures: FC<ProfileCardFeauturesProps> = memo(({ mobile, t }) => {
  const lngId = useContext(LanguageContext)
  const { id: profileId } = useParams()
  const userId = useSelector(getUserId)

  console.log('User id: ', userId, 'Profile id: ', profileId)

  const owner = useMemo(() => +profileId === userId, [profileId, userId])

  if (owner)
    return !mobile ? (
      <Link href={`/${lngId}${Routes.PROFILE}/${profileId}/edit`}>
        <Button data-testid="settings-btn" theme={ButtonTheme.SECONDARY}>
          {t('profile.settings')}
        </Button>
      </Link>
    ) : null

  // TODO: change to real features after api will be added
  return (
    <Flex direction={mobile ? 'column' : 'row'} gap="12" max={mobile}>
      <Button full={mobile}>Follow</Button>
      <Button theme={ButtonTheme.SECONDARY} full={mobile}>
        Send message
      </Button>
    </Flex>
  )
})

ProfileCardFeautures.displayName = 'ProfileCardFeautures'
