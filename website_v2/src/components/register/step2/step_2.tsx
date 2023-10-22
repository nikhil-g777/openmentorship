"use client";

import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {FieldsProvider} from "./fields_provider";
import {useState} from "react";
import {
  checkDuplicateCurrentFields,
  checkDuplicateExperienceEducation,
  checkExperiencesEducationBothFields,
  checkExperiencesEducationLength,
} from "@/helpers/register";

const Step2 = () => {
  const {currentScreen, setCurrentScreen, experiences, education} =
    useRegisterStore();
  const {isProfilePage, experienceError, setExperienceError} =
    useProfileSettingsStore();
  const [inputError, setInputError] = useState<{
    experience: string;
    education: string;
  }>({experience: "", education: ""});

  // Handle continue
  const handleContinue = () => {
    // Reset error
    setInputError({experience: "", education: ""});

    // Check experience and education length
    const noLength = checkExperiencesEducationLength(
      experiences,
      education,
      setInputError
    );
    if (noLength) return;

    // Check duplicate organization + title and duplicate school + degree
    const duplicateCurrentFields = checkDuplicateCurrentFields(
      experiences,
      education,
      setInputError
    );
    if (duplicateCurrentFields) return;

    // Check if any duplicate experience or education
    const duplicateExperienceEducation = checkDuplicateExperienceEducation(
      experiences,
      education,
      setInputError
    );
    if (duplicateExperienceEducation) return;

    // Check if all fields are filled
    const experiencesEducationFields = checkExperiencesEducationBothFields(
      experiences,
      education,
      setInputError
    );
    if (experiencesEducationFields) return;

    // Move to next screen
    setCurrentScreen("step3");
  };

  return (
    <div
      className={`w-full ${
        currentScreen === "step2" || isProfilePage ? "" : "hidden"
      }`}
    >
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        {!isProfilePage ? (
          <h1
            className="text-xl text-center sm:text-sub_heading sm:leading-normal"
            data-cy="register-step2-heading"
          >
            About You
          </h1>
        ) : (
          <h2 className="text-xl font-semibold mt-8 mb-4">Experience</h2>
        )}
        {/* Work Experience */}
        <FieldsProvider
          type="experiences"
          inputError={isProfilePage ? experienceError : inputError}
          setInputError={isProfilePage ? setExperienceError : setInputError}
        />
        {/* Education */}
        <FieldsProvider
          type="education"
          inputError={isProfilePage ? experienceError : inputError}
          setInputError={isProfilePage ? setExperienceError : setInputError}
        />
        {/* Continue */}
        {!isProfilePage ? (
          <div className="w-full my-8 text-center">
            <button
              className="w-48 btn btn-outline btn-accent rounded-full hover:text-white"
              onClick={handleContinue}
              data-cy="register-step2-continue"
            >
              Continue
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export {Step2};
