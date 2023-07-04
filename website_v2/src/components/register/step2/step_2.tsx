"use client";

import {useRegisterStore} from "@/zustand/store";
import {FieldsProvider} from "./fields_provider";
import {useState} from "react";
import {
  checkDuplicateCurrentFields,
  checkDuplicateTitleDegree,
  checkExperiencesEducationBothFields,
  checkExperiencesEducationLength,
} from "@/helpers/register";

const Step2 = () => {
  const {currentScreen, setCurrentScreen, experiences, education} =
    useRegisterStore();
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

    // Check if any duplicate title or degree
    const duplicateTitleDegree = checkDuplicateTitleDegree(
      experiences,
      education,
      setInputError
    );
    if (duplicateTitleDegree) return;

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
    <div className={`w-full ${currentScreen === "step2" ? "" : "hidden"}`}>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
          About You
        </h1>
        {/* Work Experience */}
        <FieldsProvider
          type="experiences"
          inputError={inputError}
          setInputError={setInputError}
        />
        {/* Education */}
        <FieldsProvider
          type="education"
          inputError={inputError}
          setInputError={setInputError}
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

export {Step2};
