"use client";

import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Guidelines} from "./guidelines";

const PostRegistration = () => {
  const {
    currentScreen,
    userType,
    menteeGuidelines,
    mentorGuidelines,
    resetState,
  } = useRegisterStore();
  const {setSuccessAlert} = useCommonStore();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Handle click
  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessAlert(
        "Your profile is currently under review. Please check back later for updates.",
        6
      );
      resetState();
      router.replace("/");
    }, 3000);
  };

  return (
    <div className={`w-full ${currentScreen === "step6" ? "" : "hidden"}`}>
      {/* Heading */}
      <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal mt-8">
        Registration complete, here are your next steps:
      </h1>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4 flex justify-center">
        <ul className="steps steps-vertical">
          {userType === "mentee" && menteeGuidelines && menteeGuidelines.length
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
        >
          {loading ? "Redirecting..." : "Got it!"}
        </button>
      </div>
    </div>
  );
};

export {PostRegistration};
