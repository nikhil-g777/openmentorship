"use client";

import {updateUser} from "@/endpoints/user";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Guidelines} from "./guidelines";

const PostRegistration = () => {
  const {
    token,
    currentScreen,
    userId,
    userType,
    menteeGuidelines,
    mentorGuidelines,
    resetState,
  } = useRegisterStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Handle continue
  const handleContinue = async () => {
    // Update the user
    setLoading(true);
    const res = await updateUser(token, {
      _id: userId,
      user: {
        active: true,
      },
      type: "completeRegistration",
    });
    setLoading(false);
    // Success alert if response is successful
    if (res.success) {
      setSuccessAlert(
        "Your profile is currently under review. Please check back later for updates.",
        5
      );
      resetState();
      router.replace("/");
    }
    // Error alert if response is unsuccessful
    if (!res.success) {
      setErrorAlert("Failed to update the data!", 3);
      return;
    }
  };

  return (
    <div className={`w-full ${currentScreen === "step6" ? "" : "hidden"}`}>
      <div className="w-full max-w-3xl mx-auto mt-16 px-4 flex justify-center">
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
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Got it!"}
        </button>
      </div>
    </div>
  );
};

export {PostRegistration};
