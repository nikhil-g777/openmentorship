"use client";

import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Guidelines} from "./guidelines";
import {SUCCESS_ALERT, USER_TYPE} from "@/constants/common";

const PostRegistration = () => {
  const {currentScreen, userType, menteeGuidelines, mentorGuidelines} =
    useRegisterStore();
  const {setSuccessAlert} = useCommonStore();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Handle click
  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setSuccessAlert(SUCCESS_ALERT.CONFIRM_EMAIL, 6);
      router.replace("/");
    }, 2000);
  };

  // Set loading to false on unmount
  useEffect(() => {
    return () => setLoading(false);
  }, [setLoading]);

  return (
    <div className={`w-full ${currentScreen === "step6" ? "" : "hidden"}`}>
      {/* Heading */}
      <h1
        className="text-xl text-center sm:text-sub_heading sm:leading-normal mt-8"
        data-cy="register-post-registration-heading"
      >
        Registration complete, here are your next steps:
      </h1>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4 flex justify-center">
        <ul className="steps steps-vertical">
          {userType === USER_TYPE.MENTEE &&
          menteeGuidelines &&
          menteeGuidelines.length
            ? menteeGuidelines.map(guideline => (
                <Guidelines key={guideline.id} guideline={guideline} />
              ))
            : mentorGuidelines && menteeGuidelines.length
            ? mentorGuidelines.map(guideline => (
                <Guidelines key={guideline.id} guideline={guideline} />
              ))
            : null}
        </ul>
      </div>
      {/* Continue */}
      <div className="w-full mt-8 mb-24 text-center">
        <button
          className={`w-48 btn btn-outline btn-accent rounded-full hover:text-white ${
            loading ? "loading" : ""
          }`}
          onClick={handleClick}
          disabled={loading}
          data-cy="register-post-registration-continue"
        >
          {loading ? "Redirecting..." : "Got it!"}
        </button>
      </div>
    </div>
  );
};

export {PostRegistration};
