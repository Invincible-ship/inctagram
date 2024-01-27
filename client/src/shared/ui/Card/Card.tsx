'use client'
import React, { ReactNode } from 'react'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'

type Props = {
  children: ReactNode
  t: TFunction<Namespaces, undefined>
  title: string
  className?: string
}
export const Card = ({ children, t, title, className }: Props) => {
  return (
    <div className={`auth-form ${className}`}>
      <div className={'title b-title bt26 semibold align-center'}>{t(title)}</div>
      {children}
    </div>
  )
}
