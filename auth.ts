import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

type Profile = {
  name?: string;
  email?: string;
  image?: string;
  role?: string; // Add role field
};

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({account, profile}) {
      if (account && account.provider === "google") {
        profile.role = account.role; // Assign role based on user's choice
        console.log("Google account", account);
        console.log("Google profile", profile);
        return true;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
