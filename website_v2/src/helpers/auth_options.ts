import {NextAuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {getUserInfo} from "./user";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        authCode: {type: "text"},
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            accept: "application/json",
          },
          body: JSON.stringify({
            authCode: credentials?.authCode,
            isLocal: Boolean(process.env.NEXT_APP_IS_LOCAL),
          }),
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({user, token}) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({session, token}) {
      session.user = token.user;
      session.profile = await getUserInfo(token.user.token);
      return session;
    },
  },
};
