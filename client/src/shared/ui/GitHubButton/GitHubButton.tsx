"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import Github from "@/shared/ui/GitHubButton/Github"


const GitHubButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/profile"

  return <Github onClick={() => signIn("github", { callbackUrl })}/>
}

export { GitHubButton }
