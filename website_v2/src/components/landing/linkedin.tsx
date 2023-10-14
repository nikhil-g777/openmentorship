"use client";

import {SUCCESS_ALERT} from "@/constants/common";
import {authCodeRegex, linkedInRedirectUrl} from "@/constants/linkedin";
import {handleLoginErrors, handleUserRegistration} from "@/helpers/landing";
import {isValidJSON} from "@/helpers/register";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {signIn} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const LinkedIn = () => {
  const router = useRouter();
  const {
    setAuthenticationError,
    setSuccessAlert,
    routeActionLoading,
    setRouteActionLoading,
    setAuthorizationCode,
    authorizationCode,
  } = useCommonStore();
  const {setToken, setUserId, setFirstName, setLastName, setEmail} =
    useRegisterStore();

  // Handle LinkedIn Login
  const handleLinkedinLogin = () => {
    window.location.href = linkedInRedirectUrl;
  };

  useEffect(() => {
    const windowUrl = window.location.href;
    if (windowUrl.includes("code=")) {
      const codeMatch = windowUrl.match(authCodeRegex);
      if (!codeMatch) return;

      // Set authorization code
      setAuthorizationCode(codeMatch[1]);
      // Set route action loading
      setRouteActionLoading(true);
      router.replace("/");
    }
  }, [setAuthorizationCode, router, setRouteActionLoading]);

  // Sign in with LinkedIn
  useEffect(() => {
    if (authorizationCode) {
      signIn("credentials", {authCode: authorizationCode, redirect: false})
        .then(res => {
          // Reset authorization code
          setAuthorizationCode("");
          // Set route action loading
          setRouteActionLoading(false);

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
            setSuccessAlert(SUCCESS_ALERT.SIGN_IN, 3);
            setRouteActionLoading(false);
          }
        })
        .catch(error => {
          // Reset authorization code
          setAuthorizationCode("");
          console.log(error);
          setRouteActionLoading(false);
        });
    }
  }, [
    authorizationCode,
    router,
    setAuthenticationError,
    setAuthorizationCode,
    setEmail,
    setFirstName,
    setLastName,
    setRouteActionLoading,
    setSuccessAlert,
    setToken,
    setUserId,
  ]);

  return (
    <button
      onClick={handleLinkedinLogin}
      className="flex flex-row items-center gap-2 bg-[#0A66C2] p-2 rounded-md hover:opacity-80 w-[180px] h-[36px]"
      disabled={routeActionLoading}
    >
      <Image
        src="/assets/icons/linkedin.svg"
        width={24}
        height={24}
        alt="LinkedIn Icon"
      />
      <span className="block w-full truncate text-xs text-white font-semibold text-center">
        Sign in with LinkedIn
      </span>
    </button>
  );
};

export {LinkedIn};
