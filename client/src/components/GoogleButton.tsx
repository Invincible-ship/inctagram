"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Google from "../shared/assets/icons/google.svg";

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  return <Google onClick={() => signIn("google", { callbackUrl })}></Google>;
};

export { GoogleButton };
