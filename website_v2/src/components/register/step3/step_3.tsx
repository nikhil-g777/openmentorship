"use client";

import {useRegisterStore} from "@/zustand/store";
import {TagsProvider} from "./tags_provider";
import {useState} from "react";

const Step3 = () => {
  const {currentScreen, setCurrentScreen, skills, interests} =
    useRegisterStore();
  const [error, setError] = useState<{skills: string; interests: string}>({
    skills: "",
    interests: "",
  });

  // Handle continue
  const handleContinue = () => {
    // Reset error
    setError({skills: "", interests: ""});

    // Check if all fields are filled
    if (skills.length === 0) {
      setError({skills: "Please add at least one skill", interests: ""});
      return;
    }
    if (interests.length === 0) {
      setError({skills: "", interests: "Please add at least one interest"});
      return;
    }

    // Move to next screen
    setCurrentScreen("step4");
  };

  return (
    <div className={`w-full ${currentScreen === "step3" ? "" : "hidden"}`}>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
          Let&apos;s get more specific
        </h1>
        {/* Skills */}
        <TagsProvider
          type="skills"
          heading="What are some of your top skills?"
          error={error}
          setError={setError}
        />
        {/* Interests */}
        <TagsProvider
          type="interests"
          heading="What are your areas of interest?"
          error={error}
          setError={setError}
        />
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

export {Step3};
