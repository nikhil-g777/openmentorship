"use client";

import {AuthenticationErrorModal} from "@/components/modals/authentication_error_modal";
import {StoreInitializer} from "@/components/signIn/store_initializer";
import {handleLoginErrors, handleUserRegistration} from "@/helpers/landing";
import {isValidJSON} from "@/helpers/register";
import {AuthenticationLoader} from "@/loaders/authentication_loader";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {signIn, useSession} from "next-auth/react";
import Image from "next/image";
import {redirect, useRouter} from "next/navigation";
import {IResolveParams, LoginSocialLinkedin} from "reactjs-social-login";

const Page = () => {
  const session = useSession();
  const token = session?.data?.user?.token;
  const router = useRouter();
  const {
    setAuthenticationError,
    setSuccessAlert,
    routeActionLoading,
    setRouteActionLoading,
  } = useCommonStore();
  const {setToken, setUserId, setFirstName, setLastName, setEmail} =
    useRegisterStore();

  //   Redirect to landing page if token exists
  if (token) redirect("/");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <StoreInitializer />
      <AuthenticationLoader />
      <div className="card lg:card-side bg-base-100 border border-base-300 max-w-3xl min-h-[400px] mx-auto p-8">
        <Image
          src="/assets/images/welcome.svg"
          alt="Sign In"
          width={300}
          height={300}
          className="object-contain mx-auto"
        />
        <div className="card-body justify-center">
          <h2 className="card-title justify-center text-2xl">Sign In</h2>
          <p className="text-center flex-grow-0">
            Connect with LinkedIn to start mentoring or being mentored.
          </p>
          <div className="card-actions justify-center mt-4">
            {/* LinkedIn */}
            <LoginSocialLinkedin
              className={`w-[180px] h-[36px] ${
                routeActionLoading ? "loading" : ""
              }`}
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
          </div>
        </div>
      </div>
      {/* Error Modal */}
      <AuthenticationErrorModal />
    </div>
  );
};

export default Page;
