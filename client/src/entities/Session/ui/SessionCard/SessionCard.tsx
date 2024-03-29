import { HStack, VStack } from '@/shared/ui/Stack'
import { Session } from '../../model/types/types'
import React, { FC, ReactElement, ReactNode, isValidElement } from 'react'
import cls from './SessionCard.module.scss'
import ChromeIcon from '@/shared/assets/icons/chrome.svg'
import FirefoxIcon from '@/shared/assets/icons/firefox.svg'
import SafariIcon from '@/shared/assets/icons/safari.svg'
import OperaIcon from '@/shared/assets/icons/opera.svg'
import MobileIcon from '@/shared/assets/icons/phone.svg'
import DesktopIcon from '@/shared/assets/icons/desktop.svg'
import { useDateFormatter } from '@/shared/lib/hooks/useDateFormatter/useDateFormatter'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import { classNames } from '@/shared/lib/classNames/classNames'

const mapBrowserNameToIcon: Record<Session['browserName'], ReactNode> = {
  Chrome: <ChromeIcon />,
  Safari: <SafariIcon />,
  Firefox: <FirefoxIcon />,
  Opera: <OperaIcon />,
}

const mapDeviceTypeToIcon: Record<string, ReactNode> = {
  mobile: <MobileIcon />,
  desktop: <DesktopIcon />,
}

type SessionCardProps = {
  session: Session
  t: TFunction<Namespaces, undefined>
  action?: ReactNode
}

export const SessionCard: FC<SessionCardProps> = ({ session, action, t }) => {
  const { browserName, ip, lastActive, deviceName, deviceType } = session
  const formatter = useDateFormatter()

  const icon = deviceType ? mapDeviceTypeToIcon[deviceType] : mapBrowserNameToIcon[browserName]

  const mods = {
    [cls.rightPadding]: !!action,
  }

  return (
    <HStack className={classNames(cls.Card, mods)} justify="between" max>
      <HStack gap="12" align="start">
        {icon}
        <VStack gap="16">
          <HStack className={cls.title}>{deviceName || browserName}</HStack>
          <VStack gap="4">
            <HStack className={cls.ip}>IP: {ip}</HStack>
            {action && (
              <HStack className={cls.lastVisit}>
                {`${t('devices.text.lastVisit')}: ${formatter.format(new Date(lastActive))}`}
              </HStack>
            )}
          </VStack>
        </VStack>
      </HStack>
      {action && <HStack className={cls.action}>{action}</HStack>}
    </HStack>
  )
}
