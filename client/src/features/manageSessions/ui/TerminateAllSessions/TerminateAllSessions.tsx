import { useTerminateAllSessionsMutation } from '@/entities/Session'
import { Namespaces } from '@/shared/config/i18n/types'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { handleApiError } from '@/shared/utils/handleApiError'
import { TFunction } from 'i18next'
import React, { FC } from 'react'

type TerminateAllSessionProps = {
  t: TFunction<Namespaces, undefined>
  disabled?: boolean
}

export const TerminateAllSessions: FC<TerminateAllSessionProps> = ({ t, disabled }) => {
  const [terminateAllSessionsMutation, { isLoading }] = useTerminateAllSessionsMutation()

  const terminateAllSessions = async () => {
    try {
      await terminateAllSessionsMutation().unwrap()
    } catch (err) {
      handleApiError(err)
    }
  }

  return (
    <Button
      theme={ButtonTheme.OUTLINED}
      onClick={terminateAllSessions}
      isLoading={isLoading}
      disabled={disabled || isLoading}
    >
      {t('devices.features.terminateAll')}
    </Button>
  )
}
