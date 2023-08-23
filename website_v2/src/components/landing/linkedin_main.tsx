"use client";

import {useLinkedIn} from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import Image from "next/image";
import {signIn} from "next-auth/react";

const Linkedin = () => {
  const {linkedInLogin} = useLinkedIn({
    clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
    redirectUri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!,
    scope: "r_emailaddress r_liteprofile",
    onSuccess: code => {
      signIn("credentials", {authCode: code});
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <button type="button" onClick={linkedInLogin} className="link">
      <Image
        src={linkedin}
        alt="Sign in with Linked In"
        style={{maxWidth: "180px", cursor: "pointer"}}
        data-cy="linkedin-button"
      />
    </button>
  );
};

export {Linkedin};
