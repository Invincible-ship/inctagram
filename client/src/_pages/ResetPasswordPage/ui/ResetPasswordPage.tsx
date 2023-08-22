import dynamic from 'next/dynamic'
import React from 'react'

const ResetPassword = dynamic(() => import('@/features/auth/resetPassword'), { ssr: false })

export const ResetPasswordPage = () => {
  return (
    <div className={'content'}>
      <ResetPassword />
    </div>
  )
}
