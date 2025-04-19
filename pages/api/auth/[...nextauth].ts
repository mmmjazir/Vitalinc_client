import NextAuth from "next-auth/next"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions = {
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
       }),
       Github({
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
       }),
    ],
    secret: process.env.SECRET,
}

export default NextAuth(authOptions);