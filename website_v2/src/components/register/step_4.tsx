"use client";

import {useRegisterStore} from "@/zustand/store";
import {Preferences} from "./step_4_preferences";
import {useState} from "react";

const Step4 = () => {
  const {
    currentScreen,
    setCurrentScreen,
    goals,
    communicationFrequency,
    communicationPreferences,
  } = useRegisterStore();
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
    if (Object.keys(goals).length === 0) {
      setError({
        goals: "Please select at least one goal",
        frequency: "",
        preferences: "",
      });
      return;
    }

    // Check if frequency is empty
    if (communicationFrequency === "") {
      setError({
        frequency: "Please select a frequency",
        preferences: "",
        goals: "",
      });
      return;
    }

    // Check if preferences is empty
    if (communicationPreferences.length === 0) {
      setError({
        preferences: "Please select at least one preference",
        goals: "",
        frequency: "",
      });
      return;
    }

    // Move to next screen
    setCurrentScreen("step5");
  };
  return (
    <div className={`w-full ${currentScreen === "step4" ? "" : "hidden"}`}>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
          Mentorship
        </h1>
        <Preferences error={error} />
        {/* Continue */}
        <div className="w-full my-8 text-center">
          <button
            className="w-48 btn btn-outline btn-accent rounded-full hover:text-white"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export {Step4};
