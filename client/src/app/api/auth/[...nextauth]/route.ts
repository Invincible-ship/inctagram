import NextAuth from "next-auth";
import { authConfig } from "config/auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };