"use client";

import {updateUser} from "@/endpoints/user";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";

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
          {userType === "mentee"
            ? menteeGuidelines.map(guideline => (
                <li
                  className="step step-primary !gap-2 sm:!gap-4 md:!gap-8"
                  key={guideline.id}
                >
                  {/* Card */}
                  <div className="w-full card lg:card-side bg-base-100 border border-base-300 min-h-[120px] h-fit lg:mb-4">
                    <Image
                      src={guideline.imageURL}
                      alt="steps"
                      className="mx-auto p-4"
                      width={100}
                      height={100}
                    />
                    <div className="card-body">
                      <p>{guideline.text}</p>
                    </div>
                  </div>
                </li>
              ))
            : mentorGuidelines.map(guideline => (
                <li
                  className="step step-primary !gap-2 sm:!gap-4 md:!gap-8"
                  key={guideline.id}
                >
                  {/* Card */}
                  <div className="w-full card lg:card-side bg-base-100 border border-base-300 min-h-[120px] h-fit lg:mb-4">
                    <Image
                      src={guideline.imageURL}
                      alt="steps"
                      className="mx-auto p-4"
                      width={100}
                      height={100}
                    />
                    <div className="card-body">
                      <p>{guideline.text}</p>
                    </div>
                  </div>
                </li>
              ))}
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
