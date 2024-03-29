'use client'

import { SessionCard, useGetAllSessionsQuery } from '@/entities/Session'
import { TerminateAllSessions, TerminateSession } from '@/features/manageSessions'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { HStack, VStack } from '@/shared/ui/Stack'
import React, { memo, useMemo } from 'react'
import cls from './Devices.module.scss'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

export const Devices = memo(() => {
  const { t } = useClientTranslation(Namespaces.PROFILE_SETTINGS)
  const { data: sessions, isFetching } = useGetAllSessionsQuery()

  const [currentSession, activeSessions] = useMemo(() => {
    if (!sessions) return [undefined, []]
    if (sessions.length == 1) return [sessions[0], []]

    const sortedSessions = [...sessions].sort((a, b) => b.deviceId - a.deviceId)

    return [sortedSessions[0], sortedSessions.slice(1)]
  }, [sessions])

  return (
    currentSession && (
      <VStack className={cls.Devices} gap="16" max>
        <VStack gap="8" max>
          <HStack className={cls.title}>{t('devices.title.current')}</HStack>
          <SessionCard session={currentSession} t={t} />
        </VStack>
        {!!activeSessions.length && (
          <HStack justify="end" max>
            <TerminateAllSessions t={t} />
          </HStack>
        )}
        <VStack gap="16" max>
          <HStack className={cls.title}>{t('devices.title.active')}</HStack>
          {activeSessions.map(session => (
            <SessionCard
              key={session.deviceId}
              session={session}
              t={t}
              action={<TerminateSession deviceId={session.deviceId} t={t} />}
            />
          ))}
          {!activeSessions.length && !isFetching && (
            <HStack className={cls.absent} align="center" justify="center" max>
              {t('devices.text.absent')}
            </HStack>
          )}
        </VStack>
      </VStack>
    )
  )
})

Devices.displayName = 'Devices'

export const DevicesSkeleton = () => (
  <VStack gap="16" max>
    <Skeleton width="150px" height="30px" border="5px" />
    <Skeleton width="100%" height="120px" border="5px" />
    <Skeleton width="150px" height="30px" border="5px" />
    <Skeleton width="100%" height="120px" border="5px" />
    <Skeleton width="100%" height="120px" border="5px" />
  </VStack>
)
