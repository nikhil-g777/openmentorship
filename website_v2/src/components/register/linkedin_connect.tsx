"use client";

import {registerUser} from "@/endpoints/user";
import {useRegisterStore} from "@/zustand/store";
import Image from "next/image";
import {useLinkedIn} from "react-linkedin-login-oauth2";

const LinkedInConnect = () => {
  const {token, setToken, setFirstName, setLastName, setEmail} =
    useRegisterStore();
  const {linkedInLogin} = useLinkedIn({
    clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
    redirectUri: `${
      typeof window === "object" && window.location.origin
    }/linkedin`,
    scope: "r_emailaddress r_liteprofile",
    onSuccess: async code => {
      const res = await registerUser({authCode: code, type: "linkedInSignup"});
      setToken(res.token);
      setFirstName(res.user.firstName);
      setLastName(res.user.lastName);
      setEmail(res.user.email);
    },
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
