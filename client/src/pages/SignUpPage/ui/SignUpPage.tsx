import dynamic from "next/dynamic"

const SignUp = dynamic(() => import('@/features/auth/signup'), { ssr: false })
// import SignUp from "@/features/auth/signup"

export const SignUpPage = () => {
  return (
    <div className={"content"}>
      <SignUp />
    </div>
  )
}
