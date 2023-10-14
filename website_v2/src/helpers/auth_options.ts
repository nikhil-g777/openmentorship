import {getUserInfo, nextAuthLogin} from "@/endpoints/user";
import {NextAuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";

import {mainConstants} from "@/constants/main";
import {errorCodes} from "@/constants/errorCodes";

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
        const res = (await nextAuthLogin(credentials)) as Response;
        const user = await res.json();

        // Throw errors if any
        if (
          user.registrationStatus ===
            mainConstants.registrationStatus.incomplete.name &&
          user.newUser
        ) {
          throw new Error(JSON.stringify(user));
        }

        if (
          user.registrationStatus ===
            mainConstants.registrationStatus.pendingConfirmation.name &&
          user.user
        ) {
          throw new Error(JSON.stringify(user));
        }

        if (user.errorCode === errorCodes.loginInvalid.code) {
          throw new Error(
            `${errorCodes.loginInvalid.code}-${user.registrationStatus}`
          );
        }

        if (user.errorCode === errorCodes.loginServerError.code) {
          throw new Error(errorCodes.loginServerError.code);
        }

        if (user.errorCode === errorCodes.registerServerError) {
          throw new Error(errorCodes.registerServerError.code);
        }

        // If no error and we have user data, return it
        if (res.ok && user.success) {
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
