import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Get User Details
const getUserInfo = async (authCode: string) => {
  const userRes = await fetch(`${process.env.BACKEND_BASE_URL}/users/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
      authorization: `Bearer ${authCode}`,
    },
  });
  const userInfo = await userRes.json();
  return userInfo;
};

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        authCode: {type: "text"},
      },
      async authorize(credentials, req) { // eslint-disable-line
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
    async jwt({user, token}: any) { // eslint-disable-line
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({session, token}: any) { // eslint-disable-line
      session.user = token.user;
      session.profile = await getUserInfo(token.user.token);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
