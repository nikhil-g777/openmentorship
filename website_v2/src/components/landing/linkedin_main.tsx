"use client";

import {useLinkedIn} from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import Image from "next/image";
import {signIn} from "next-auth/react";
import {useCommonStore} from "@/zustand/store";
import {handleLoginErrors} from "@/helpers/landing";

const Linkedin = () => {
  const {
    setAuthenticationError,
    setSuccessAlert,
    routeActionLoading,
    setRouteActionLoading,
  } = useCommonStore();

  const {linkedInLogin} = useLinkedIn({
    clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
    redirectUri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!,
    scope: "r_emailaddress r_liteprofile",
    onSuccess: async code => {
      const res = await signIn("credentials", {
        authCode: code,
        redirect: false,
      });
      if (res && res.error) {
        const error = res.error;
        handleLoginErrors({
          error,
          setSuccessAlert,
          setAuthenticationError,
          setRouteActionLoading,
        });
      } else {
        setSuccessAlert("Successfully signed in!", 3);
        setRouteActionLoading(false);
      }
    },
    onError: error => {
      console.log(error);
    },
  });

  // handleLinkedinLogin
  const handleLinkedinLogin = () => {
    // Set loading state
    setRouteActionLoading(true);

    // Redirect to linkedin after 1 second
    setTimeout(() => {
      linkedInLogin();
    }, 1000);
  };

  return (
    <button
      type="button"
      onClick={handleLinkedinLogin}
      className={`btn btn-link p-0 ${routeActionLoading ? "loading" : ""}`}
    >
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
