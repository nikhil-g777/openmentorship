import {UserProfile} from "./profile";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: User;
    iat: number;
    exp: number;
    jti: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      message: string;
      success: boolean;
      token: string;
      /** The user */
      user: {
        _id: string;
        userType: string;
      };
    };
    profile: {
      success: boolean;
      user: UserProfile;
    };
  }
}
