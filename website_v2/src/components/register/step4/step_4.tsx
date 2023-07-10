"use client";

import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {Preferences} from "./preferences";
import {useState} from "react";
import {
  checkCommunicationFrequencyIsEmpty,
  checkCommunicationPreferencesIsEmpty,
  checkGoalsIsEmpty,
} from "@/helpers/register";

const Step4 = () => {
  const {
    currentScreen,
    setCurrentScreen,
    goals,
    communicationFrequency,
    communicationPreferences,
  } = useRegisterStore();
  const {isProfilePage, mentorshipErrors} = useProfileSettingsStore();
  const [error, setError] = useState<{
    goals: string;
    frequency: string;
    preferences: string;
  }>({goals: "", frequency: "", preferences: ""});

  // Handle continue
  const handleContinue = () => {
    // Reset error
    setError({goals: "", frequency: "", preferences: ""});

    // Check if goals is empty
    const isGoalsEmpty = checkGoalsIsEmpty(goals, setError);
    if (isGoalsEmpty) return;

    // Check if frequency is empty
    const isCommunicationFrequencyEmpty = checkCommunicationFrequencyIsEmpty(
      communicationFrequency,
      setError
    );
    if (isCommunicationFrequencyEmpty) return;

    // Check if preferences is empty
    const isCommunicationPreferencesEmpty =
      checkCommunicationPreferencesIsEmpty(communicationPreferences, setError);
    if (isCommunicationPreferencesEmpty) return;

    // Move to next screen
    setCurrentScreen("step5");
  };
  return (
    <div
      className={`w-full ${
        currentScreen === "step4" || isProfilePage ? "" : "hidden"
      }`}
    >
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        {!isProfilePage ? (
          <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
            Mentorship
          </h1>
        ) : (
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Mentorship Preferences
          </h2>
        )}
        <Preferences error={isProfilePage ? mentorshipErrors : error} />
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

export {Step4};
