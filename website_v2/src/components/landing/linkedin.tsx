"use client";

import {mainConstants} from "@/constants/main";
import {
  handleLoginErrors,
  handlePendingConfirmation,
  handleUserRegistration,
} from "@/helpers/landing";
import {isValidJSON} from "@/helpers/register";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {FC} from "react";
import {LoginSocialLinkedin, IResolveParams} from "reactjs-social-login";

const LinkedIn: FC = () => {
  const router = useRouter();
  const {
    setAuthenticationError,
    setSuccessAlert,
    routeActionLoading,
    setRouteActionLoading,
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

  return (
    <LoginSocialLinkedin
      className={`w-[180px] h-[36px] ${routeActionLoading ? "loading" : ""}`}
      isOnlyGetCode
      client_id={process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!}
      client_secret={process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET!}
      scope="r_emailaddress r_liteprofile"
      redirect_uri={process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!}
      onResolve={async ({data}: IResolveParams) => {
        const res = await signIn("credentials", {
          authCode: data?.code,
          redirect: false,
        });
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
          setSuccessAlert("Successfully signed in!", 3);
          setRouteActionLoading(false);
        }
      }}
      onReject={err => {
        console.error(err);
      }}
      onLoginStart={() => setRouteActionLoading(true)}
    >
      <button className="flex flex-row items-center gap-2 bg-[#0A66C2] p-2 rounded-md hover:opacity-80 w-[180px] h-[36px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{fill: "white", transform: "", msFilter: ""}}
        >
          <circle cx="4.983" cy="5.009" r="2.188"></circle>
          <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095"></path>
        </svg>
        <span className="block w-full truncate text-xs text-white font-semibold text-center">
          Sign in with LinkedIn
        </span>
      </button>
    </LoginSocialLinkedin>
  );
};

export {LinkedIn};
