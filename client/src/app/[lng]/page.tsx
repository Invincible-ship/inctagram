import dynamic from 'next/dynamic'
// import SignUpPage from "@/pages/SignUpPage"

export default dynamic(() => import('@/pages/SignUpPage'), { ssr: false })

// export default SignUpPage
