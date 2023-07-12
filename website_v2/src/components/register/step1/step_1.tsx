"use client";

import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {useState} from "react";
import {AccountType} from "./account_type";
import {StudentProfessional} from "./student_professional";
import {AreasOfInterest} from "./areas_of_interest";

const Step1 = () => {
  const {currentScreen, setCurrentScreen, areasOfInterest} = useRegisterStore();
  const {isProfilePage, areasOfInterestError} = useProfileSettingsStore();
  const [error, setError] = useState("");

  // Handle continue
  const handleContinue = () => {
    // Reset error
    setError("");

    // Validate
    if (
      !areasOfInterest.software &&
      !areasOfInterest.design &&
      !areasOfInterest.other
    ) {
      setError("Please select at least one area of interest");
      return;
    }

    // Move to next screen
    setCurrentScreen("step2");
  };

  return (
    <div
      className={`w-full ${
        currentScreen === "step1" || isProfilePage ? "" : "hidden"
      }`}
    >
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        {!isProfilePage ? (
          <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
            Tell us a little bit about yourself, it helps make the right
            connections
          </h1>
        ) : (
          <h2 className="text-xl font-semibold mt-8 mb-4">More About You</h2>
        )}
        {/* Account Type */}
        <AccountType />
        {/* Student or Professional */}
        <StudentProfessional />
        {/* Area of Interest */}
        <AreasOfInterest error={isProfilePage ? areasOfInterestError : error} />
        {/* Continue */}
        {!isProfilePage ? (
          <div className="w-full my-8 text-center">
            <button
              className="w-48 btn btn-outline btn-accent rounded-full hover:text-white"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export {Step1};
