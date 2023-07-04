"use client";

import {useRegisterStore} from "@/zustand/store";
import {SetStateAction} from "react";
import {InputProvider} from "./step_2_inputs_provider";

type Props = {
  type: string;
  inputError: {experience: string; education: string};
  setInputError: React.Dispatch<
    SetStateAction<{
      experience: string;
      education: string;
    }>
  >;
};

const FieldsProvider = ({type, inputError, setInputError}: Props) => {
  const {experiences, education, setExperiences, setEducation} =
    useRegisterStore();

  // Add input fields
  const handleAddInput = () => {
    // Return if input fields are more than 3
    if (type === "experiences" && experiences.length >= 3) return;
    if (type === "education" && education.length >= 3) return;

    // Reset error
    setInputError({experience: "", education: ""});

    // Check if both fields are filled
    if (type === "experiences") {
      if (experiences.length) {
        const lastField = experiences[experiences.length - 1];
        if (lastField.organization === "" || lastField.title === "") {
          setInputError({experience: "Please fill all fields", education: ""});
          return;
        }
      }
    } else {
      if (education.length) {
        const lastField = education[education.length - 1];
        if (lastField.school === "" || lastField.degree === "") {
          setInputError({experience: "", education: "Please fill all fields"});
          return;
        }
      }
    }

    // Check if organization and title are not same
    if (type === "experiences") {
      if (experiences.length) {
        const lastField = experiences[experiences.length - 1];
        if (
          lastField.organization.toLowerCase() === lastField.title.toLowerCase()
        ) {
          setInputError({
            experience: "Organization and title cannot be same",
            education: "",
          });
          return;
        }
      }
    } else {
      if (education.length) {
        const lastField = education[education.length - 1];
        if (lastField.school.toLowerCase() === lastField.degree.toLowerCase()) {
          setInputError({
            experience: "",
            education: "School and degree cannot be same",
          });
          return;
        }
      }
    }

    // Check if any duplicate title or degree
    const exp = experiences.map(field => field.title.toLowerCase());
    const edu = education.map(field => field.degree.toLowerCase());
    if (exp.length !== new Set(exp).size) {
      setInputError({experience: "Duplicate title found", education: ""});
      return;
    }
    if (edu.length !== new Set(edu).size) {
      setInputError({experience: "", education: "Duplicate degree found"});
      return;
    }

    // Experience or Education
    if (type === "experiences") {
      setExperiences([
        ...experiences,
        {key: crypto.randomUUID(), organization: "", title: ""},
      ]);
    } else {
      setEducation([
        ...education,
        {key: crypto.randomUUID(), school: "", degree: ""},
      ]);
    }
  };

  // Change input fields
  const handleChangeInput = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update input fields
    if (type === "experiences") {
      if (e.target.name === "organization") {
        experiences[index].organization = e.target.value;
      } else {
        experiences[index].title = e.target.value;
      }
      setExperiences([...experiences]);
    } else {
      if (e.target.name === "school") {
        education[index].school = e.target.value;
      } else {
        education[index].degree = e.target.value;
      }
      setEducation([...education]);
    }
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
    <div className="w-full mt-8">
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