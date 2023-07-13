"use client";

import { SessionProvider } from "next-auth/react";

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
