"use client";

import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {TagsProvider} from "./tags_provider";
import {useState} from "react";

const Step3 = () => {
  const {currentScreen, setCurrentScreen, skills, interests} =
    useRegisterStore();
  const {isProfilePage, skillsInterestsError, setSkillsInterestsError} =
    useProfileSettingsStore();
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
    <div
      className={`w-full ${
        currentScreen === "step3" || isProfilePage ? "" : "hidden"
      }`}
    >
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        {!isProfilePage ? (
          <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
            Let&apos;s get more specific
          </h1>
        ) : (
          <h2 className="text-xl font-semibold mt-8 -mb-4">
            Skills and Interests
          </h2>
        )}
        {/* Skills */}
        <TagsProvider
          type="skills"
          heading="What are some of your top skills?"
          error={isProfilePage ? skillsInterestsError : error}
          setError={isProfilePage ? setSkillsInterestsError : setError}
        />
        {/* Interests */}
        <TagsProvider
          type="interests"
          heading="What are your areas of interest?"
          error={isProfilePage ? skillsInterestsError : error}
          setError={isProfilePage ? setSkillsInterestsError : setError}
        />
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

export {Step3};
