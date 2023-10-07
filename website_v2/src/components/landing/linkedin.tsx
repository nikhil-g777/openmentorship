"use client";

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
            }

            // Handle pending confirmation
            if (user.success === false) {
              handlePendingConfirmation({
                user,
                setSuccessAlert,
                setRouteActionLoading,
                setAuthenticationError,
                setUserId,
                setUserType,
                setEmail,
                setFirstName,
                setLastName,
              });
            }
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
      }}
      onReject={err => {
        console.error(err);
      }}
      onLoginStart={() => setRouteActionLoading(true)}
    >
      <button className="flex flex-row items-center gap-2 bg-[#0A66C2] p-2 rounded-md hover:opacity-80 w-[180px] h-[36px]">
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
    </LoginSocialLinkedin>
  );
};

export {LinkedIn};
