import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/app/lib/db";

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  trustHost: true,
  callbacks: {
    async signIn({account, profile}) {
      if (account && account.provider === "google") {
        console.log("Google account", account);
        console.log("Google profile", profile);
        return true;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
