"use client";

import {useLinkedIn} from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import Image from "next/image";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useCommonStore} from "@/zustand/store";

const Linkedin = () => {
  const router = useRouter();
  const {setAuthenticationError} = useCommonStore();

  const {linkedInLogin} = useLinkedIn({
    clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
    redirectUri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!,
    scope: "r_emailaddress r_liteprofile",
    onSuccess: async code => {
      const res = await signIn("credentials", {
        authCode: code,
        redirect: false,
      });
      if (res && res.error === "CredentialsSignin") {
        setAuthenticationError({
          heading: "Pending Approval",
          subHeading: "We're processing your profile",
          message:
            "In order to make sure our mentorship community holds up a standard, we process and verify mentor profiles.",
        });
      } else {
        router.replace(
          "/explore?page=1&limit=10&areasOfInterest=&goals=&communicationFrequency=&communicationPreferences="
        );
      }
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <button type="button" onClick={linkedInLogin} className="btn btn-link p-0">
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
