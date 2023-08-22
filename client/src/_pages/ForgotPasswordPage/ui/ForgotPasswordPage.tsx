import dynamic from 'next/dynamic'
import React from 'react'

const ForgotPassword = dynamic(() => import('@/features/auth/forgotPassword'), { ssr: false })

export const ForgotPasswordPage = () => {
  return (
    <div className={'content'}>
      <ForgotPassword />
    </div>
  )
}
