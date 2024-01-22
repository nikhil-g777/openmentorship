"use client";

import {SUCCESS_ALERT} from "@/constants/common";
import {
  linkedInRedirectUrl,
  googleRedirectUrl,
  linkedInProvider,
  googleProvider,
  linkedInAuthCodeRegex,
  googleAuthCodeRegex,
} from "@/constants/auth";
import {mainConstants} from "@/constants/main";
import {
  handleLoginErrors,
  handlePendingConfirmation,
  handleUserRegistration,
} from "@/helpers/landing";
import {isValidJSON} from "@/helpers/register";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {signIn} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const Auth = () => {
  const router = useRouter();
  const {
    setAuthenticationError,
    setSuccessAlert,
    routeActionLoading,
    setRouteActionLoading,
    setAuthorizationCode,
    authorizationCode,
    authProvider,
    setAuthProvider,
  } = useCommonStore();
  const {
    setToken,
    setUserId,
    setUserType,
    setFirstName,
    setLastName,
    setEmail,
    setRegistrationStatus,
  } = useRegisterStore();

  // Handle LinkedIn Login
  const handleLogin = (provider: string) => {
    if (
      process.env.NEXT_PUBLIC_CYPRESS_ACCOUNT_TYPE &&
      process.env.NEXT_PUBLIC_CYPRESS_MENTEE_ID &&
      process.env.NEXT_PUBLIC_CYPRESS_MENTOR_ID &&
      process.env.NEXT_PUBLIC_CYPRESS_TEST &&
      process.env.NEXT_PUBLIC_CYPRESS_TEST.toLowerCase() === "true"
    ) {
      signIn("credentials", {
        authCode: process.env.NEXT_PUBLIC_CYPRESS_ACCOUNT_TYPE,
      });
      return;
    }

    // Redirect to provider
    if (provider === linkedInProvider) {
      window.location.href = linkedInRedirectUrl;
    }
    if (provider === googleProvider) {
      window.location.href = googleRedirectUrl;
    }
  };

  useEffect(() => {
    const windowUrl = window.location.href;
    if (windowUrl.includes("code=")) {
      // Set auth provider
      if (windowUrl.includes(googleProvider)) {
        setAuthProvider(googleProvider);
      } else {
        setAuthProvider(linkedInProvider);
      }
      // Get authorization code
      const codeMatch = windowUrl.match(
        authProvider === googleProvider
          ? googleAuthCodeRegex
          : linkedInAuthCodeRegex
      );
      if (!codeMatch) return;

      // Set authorization code
      setAuthorizationCode(codeMatch[1]);
      // Set route action loading
      setRouteActionLoading(true);
      router.replace("/");
    }
  }, [
    setAuthorizationCode,
    router,
    setRouteActionLoading,
    authProvider,
    setAuthProvider,
  ]);

  // Sign in with LinkedIn
  useEffect(() => {
    if (authorizationCode && authorizationCode.length > 10) {
      signIn("credentials", {
        authCode: authorizationCode,
        provider: authProvider,
        redirect: false,
      })
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
              // Check if user is new
              if (user.newUser) {
                return handleUserRegistration({
                  user,
                  setSuccessAlert,
                  setToken,
                  setUserId,
                  setFirstName,
                  setLastName,
                  setEmail,
                  router,
                });
              }

              // Handle pending confirmation
              if (
                user.registrationStatus ===
                mainConstants.registrationStatus.pendingConfirmation.name
              ) {
                return handlePendingConfirmation({
                  user,
                  setSuccessAlert,
                  setRouteActionLoading,
                  setAuthenticationError,
                  setUserId,
                  setUserType,
                  setEmail,
                  setFirstName,
                  setLastName,
                  setRegistrationStatus,
                });
              }
            } else {
              return handleLoginErrors({
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
    setUserType,
    setRegistrationStatus,
    authProvider,
  ]);

  return (
    <div className="mt-4 w-full flex flex-col justify-center items-center gap-2 md:flex-row md:justify-start md:gap-4">
      <button
        onClick={() => handleLogin("linkedin")}
        className="flex flex-row items-center gap-2 bg-[#0A66C2] p-2 rounded-md hover:opacity-80 w-[180px] h-[36px] shadow"
        disabled={routeActionLoading}
        data-cy="linkedin-button"
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
      <button
        onClick={() => handleLogin("google")}
        className="flex flex-row items-center gap-2 bg-white p-2 rounded-md hover:opacity-80 w-[180px] h-[36px] shadow"
        disabled={routeActionLoading}
        data-cy="google-button"
      >
        <Image
          src="/assets/icons/google.svg"
          width={24}
          height={24}
          alt="Google Icon"
        />
        <span className="block w-full truncate text-xs text-[#1F1F1F] font-bold text-center">
          Sign in with Google
        </span>
      </button>
    </div>
  );
};

export {Auth};
