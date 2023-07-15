"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import GitHub from "src/shared/assets/icons/github.svg"

const GitHubButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/profile"

  return <GitHub onClick={() => signIn("github", { callbackUrl })}></GitHub>
}

export { GitHubButton }
