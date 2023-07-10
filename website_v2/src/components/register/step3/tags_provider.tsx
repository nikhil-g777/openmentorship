"use client";

import {useRegisterStore} from "@/zustand/store";
import {useState} from "react";
import {TagsWrapper} from "./tags_wrapper";
import {
  addSkillsInterests,
  checkSkillsInterestsDuplicate,
} from "@/helpers/register";
import {Form} from "./form";

type Props = {
  type: string;
  heading: string;
  error: {skills: string; interests: string};
  setError: (skillsInterestsError: {
    skills: string;
    interests: string;
  }) => void | React.Dispatch<
    React.SetStateAction<{skills: string; interests: string}>
  >;
};

const TagsProvider = ({type, heading, error, setError}: Props) => {
  const {skills, interests, setSkills, setInterests} = useRegisterStore();
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Return if input value is empty
    if (inputValue.length === 0) return;

    // Return if input value already included
    const isDuplicate = checkSkillsInterestsDuplicate(
      type,
      skills,
      interests,
      inputValue,
      setInputValue
    );
    if (isDuplicate) return;

    // Add to tags
    addSkillsInterests(
      type,
      skills,
      setSkills,
      interests,
      setInterests,
      inputValue,
      setInputValue,
      setError
    );
  };

  const handleDelete = (index: number) => {
    // Filter based on the index obtained
    if (type === "skills") {
      const filteredSkills = skills.filter((_, i) => i !== index);
      setSkills(filteredSkills);
    } else {
      const filteredInterests = interests.filter((_, i) => i !== index);
      setInterests(filteredInterests);
    }
  };
  return (
    <div className="w-full mt-8">
      <label className="block text-base md:text-xl mb-2">{heading}</label>
      {/* Form */}
      <Form
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      {/* Tags */}
      {type === "skills" && skills.length > 0 ? (
        <TagsWrapper tags={skills} handleDelete={handleDelete} />
      ) : null}
      {type === "interests" && interests.length > 0 ? (
        <TagsWrapper tags={interests} handleDelete={handleDelete} />
      ) : null}
      {/* Error */}
      {type === "skills" && error.skills.length ? (
        <label className="label">
          <span className="label-text-alt text-error">{error.skills}</span>
        </label>
      ) : null}
      {type === "interests" && error.interests.length ? (
        <label className="label">
          <span className="label-text-alt text-error">{error.interests}</span>
        </label>
      ) : null}
    </div>
  );
};

export {TagsProvider};
