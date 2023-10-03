"use client";

import {useLinkedIn} from "react-linkedin-login-oauth2";
import Image from "next/image";
import {signIn} from "next-auth/react";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {handleLoginErrors, handleUserRegistration} from "@/helpers/landing";
import {isValidJSON} from "@/helpers/register";
import {useRouter} from "next/navigation";

const Linkedin = () => {
  const router = useRouter();
  const {
    setAuthenticationError,
    setSuccessAlert,
    routeActionLoading,
    setRouteActionLoading,
  } = useCommonStore();
  const {setToken, setUserId, setFirstName, setLastName, setEmail} =
    useRegisterStore();

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
        // Check if error is a valid JSON & handle registration
        const isJSON = isValidJSON(error);
        if (isJSON) {
          const user = JSON.parse(error);
          handleUserRegistration({
            user,
            setSuccessAlert,
            setToken,
            setUserId,
            setFirstName,
            setLastName,
            setEmail,
            router,
          });
        } else {
          handleLoginErrors({
            error,
            setSuccessAlert,
            setAuthenticationError,
            setRouteActionLoading,
          });
        }
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
      className={`btn btn-link p-0 hover:opacity-90 ${
        routeActionLoading ? "loading" : ""
      }`}
    >
      <Image
        src="/assets/images/linkedinConnect.png"
        alt="Connect with LinkedIn"
        width={180}
        height={36}
        style={{maxWidth: "180px", cursor: "pointer"}}
        data-cy="linkedin-button"
      />
    </button>
  );
};

export {Linkedin};
