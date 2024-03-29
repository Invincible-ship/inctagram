import { useTerminateSessionMutation } from '@/entities/Session'
import { Namespaces } from '@/shared/config/i18n/types'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { HStack } from '@/shared/ui/Stack'
import { handleApiError } from '@/shared/utils/handleApiError'
import { TFunction } from 'i18next'
import React, { FC } from 'react'
import LogoutIcon from '@/shared/assets/icons/log-out.svg'
import cls from './TerminateSession.module.scss'

type TerminateSessionProps = {
  deviceId: number
  t: TFunction<Namespaces, undefined>
}

export const TerminateSession: FC<TerminateSessionProps> = ({ t, deviceId }) => {
  const [terminateSessionMutation, { isLoading }] = useTerminateSessionMutation()

  const terminateSession = async () => {
    try {
      await terminateSessionMutation(deviceId).unwrap()
    } catch (err) {
      handleApiError(err)
    }
  }

  return (
    <Button
      theme={ButtonTheme.TEXT}
      onClick={terminateSession}
      isLoading={isLoading}
      disabled={isLoading}
    >
      <HStack className={cls.buttonContent} gap="12" align="center">
        <LogoutIcon />
        {t('devices.features.terminateOne')}
      </HStack>
    </Button>
  )
}
