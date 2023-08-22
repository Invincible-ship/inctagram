import dynamic from 'next/dynamic'

const SignIn = dynamic(() => import('@/features/auth/signIn'), { ssr: false })
// import SignIn from "@/features/auth/signIn"

export const SignInPage = () => {
  return (
    <div className={'content'}>
      <SignIn />
    </div>
  )
}
