'use client'

import SignIn from '@/features/auth/signIn'
import { GoogleOAuthProvider } from '@react-oauth/google'

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string

export const SignInPage = () => {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <SignIn />
    </GoogleOAuthProvider>
  )
}

export default SignInPage
