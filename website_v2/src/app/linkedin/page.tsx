"use client";

import {LinkedInCallback} from "react-linkedin-login-oauth2";

// Named export can't be used here as the library is using the default export internally
export default function LinkedInPage() {
  return <LinkedInCallback />;
}
