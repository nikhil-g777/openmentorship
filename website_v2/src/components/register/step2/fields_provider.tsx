"use client";

import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {SetStateAction} from "react";
import {InputProvider} from "./inputs_provider";
import {
  addExperienceEducation,
  checkDuplicateCurrentFields,
  checkDuplicateExperienceEducation,
  checkExperiencesEducationBothFields,
  updateExperienceEducation,
} from "@/helpers/register";

type Props = {
  type: string;
  inputError: {experience: string; education: string};
  setInputError: (experienceError: {
    experience: string;
    education: string;
  }) => void | React.Dispatch<
    SetStateAction<{
      experience: string;
      education: string;
    }>
  >;
};

const FieldsProvider = ({type, inputError, setInputError}: Props) => {
  const {experiences, education, setExperiences, setEducation} =
    useRegisterStore();
  const {isProfilePage} = useProfileSettingsStore();

  // Add input fields
  const handleAddInput = () => {
    // Return if input fields are more than 3
    if (type === "experiences" && experiences.length >= 3) return;
    if (type === "education" && education.length >= 3) return;

    // Reset error
    setInputError({experience: "", education: ""});

    // Check if both fields are filled
    const experiencesEducationFields = checkExperiencesEducationBothFields(
      experiences,
      education,
      setInputError
    );
    if (experiencesEducationFields) return;

    // Check if organization and title are not same
    const duplicateCurrentFields = checkDuplicateCurrentFields(
      experiences,
      education,
      setInputError
    );
    if (duplicateCurrentFields) return;

    // Check if any duplicate title or degree
    const duplicateExperienceEducation = checkDuplicateExperienceEducation(
      experiences,
      education,
      setInputError
    );
    if (duplicateExperienceEducation) return;

    // Add experience or education
    addExperienceEducation(
      type,
      experiences,
      education,
      setExperiences,
      setEducation
    );
  };

  // Change input fields
  const handleChangeInput = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateExperienceEducation(
      type,
      index,
      e,
      experiences,
      education,
      setExperiences,
      setEducation
    );
  };

  // Remove input fields
  const handleRemoveInput = (index: number) => {
    // Remove input field
    if (type === "experiences") {
      setExperiences(experiences.filter((field, i) => i !== index));
    } else {
      setEducation(education.filter((field, i) => i !== index));
    }
  };
  return (
    <div className={isProfilePage ? "" : "w-full mt-8"}>
      {type === "experiences" ? (
        <InputProvider
          type={type}
          inputFields={experiences}
          handleChangeInput={handleChangeInput}
          handleRemoveInput={handleRemoveInput}
          inputError={inputError}
          handleAddInput={handleAddInput}
        />
      ) : (
        <InputProvider
          type={type}
          inputFields={education}
          handleChangeInput={handleChangeInput}
          handleRemoveInput={handleRemoveInput}
          inputError={inputError}
          handleAddInput={handleAddInput}
        />
      )}
    </div>
  );
};

export {FieldsProvider};
