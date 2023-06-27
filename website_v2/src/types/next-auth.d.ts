import {AdapterUser} from "next-auth/adapters";
import {UserProfile} from "./profile";
import {User} from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
    profile: {
      success: boolean;
      user: UserProfile;
    };
  }

  interface User {
    message: string;
    success: boolean;
    token: string;
    /** The user */
    user: {
      _id: string;
      userType: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: User | AdapterUser;
    iat: number;
    exp: number;
    jti: string;
  }
}
