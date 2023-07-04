"use client";

import Image from "next/image";
import {registerUser} from "@/endpoints/user";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {useLinkedIn} from "react-linkedin-login-oauth2";

const LinkedInConnect = () => {
  const {token, setUserId, setToken, setFirstName, setLastName, setEmail} =
    useRegisterStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();

  // Get LinkedIn data
  const {linkedInLogin} = useLinkedIn({
    clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
    redirectUri: `${
      typeof window === "object" && window.location.origin
    }/linkedin`,
    scope: "r_emailaddress r_liteprofile",
    onSuccess: async code => {
      // Register user
      const res = await registerUser({authCode: code, type: "linkedInSignup"});
      // Handle register success response
      if (res.success) {
        setSuccessAlert("Successfully fetched LinkedIn data!");
        setToken(res.token);
        setUserId(res.user._id);
        setFirstName(res.user.firstName);
        setLastName(res.user.lastName);
        setEmail(res.user.email);
      }
      // Handle register error response
      if (!res.success) {
        setErrorAlert("Failed to fetch LinkedIn data!");
        return;
      }
    },
    // Handle linkedin error
    onError: error => {
      console.log(error);
    },
  });

  return (
    <button type="button" onClick={linkedInLogin} className="w-fit link">
      <Image
        src="/assets/images/linkedinConnect.png"
        alt="Connect with Linkedin"
        width={678}
        height={135}
        className={`min-w-[180px] max-w-[180px] ${
          token.length === 0 ? "cursor-pointer" : "cursor-not-allowed grayscale"
        }`}
        data-cy="linkedin-button"
      />
    </button>
  );
};

export {LinkedInConnect};
