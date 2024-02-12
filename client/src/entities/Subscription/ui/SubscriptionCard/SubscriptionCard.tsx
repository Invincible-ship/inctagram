import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { FC, ReactNode } from 'react'
import cls from './SubscriptionCard.module.scss'

type SubscriptionCardProps = {
  children: ReactNode
  className?: string
}

export const SubscriptionCard: FC<SubscriptionCardProps> = ({ children, className }) => (
  <HStack className={classNames(cls.Card, {}, [className])} max>
    {children}
  </HStack>
)
