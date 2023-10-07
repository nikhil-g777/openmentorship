"use client";

import {handleLoginErrors, handleUserRegistration} from "@/helpers/landing";
import {isValidJSON} from "@/helpers/register";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {signIn} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {LoginSocialLinkedin, IResolveParams} from "reactjs-social-login";

const LinkedIn: React.FC = () => {
  const router = useRouter();
  const {
    setAuthenticationError,
    setSuccessAlert,
    routeActionLoading,
    setRouteActionLoading,
  } = useCommonStore();
  const {setToken, setUserId, setFirstName, setLastName, setEmail} =
    useRegisterStore();

  return (
    <LoginSocialLinkedin
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
      }}
      onReject={err => {
        console.error(err);
      }}
      onLoginStart={() => setRouteActionLoading(true)}
    >
      <Image
        src="/assets/images/linkedinConnect.png"
        alt="Connect with LinkedIn"
        width={180}
        height={36}
        style={{maxWidth: "180px", cursor: "pointer"}}
        data-cy="linkedin-button"
        className={routeActionLoading ? "loading" : ""}
      />
    </LoginSocialLinkedin>
  );
};

export {LinkedIn};
