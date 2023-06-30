"use client";

import {useRegisterStore} from "@/zustand/store";
import {useState} from "react";
import {TagsWrapper} from "./step_3_tags_wrapper";

type Props = {
  type: string;
  heading: string;
  error: {skills: string; interests: string};
  setError: React.Dispatch<
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
    if (type === "skills") {
      for (const skill of skills) {
        if (skill.toLowerCase() === inputValue.toLowerCase()) {
          setInputValue("");
          return;
        }
      }
    } else {
      for (const interest of interests) {
        if (interest.toLowerCase() === inputValue.toLowerCase()) {
          setInputValue("");
          return;
        }
      }
    }

    // Add to tags
    if (type === "skills") {
      setSkills([...skills, inputValue]);
      setInputValue("");
      setError({skills: "", interests: ""});
    } else {
      setInterests([...interests, inputValue]);
      setInputValue("");
      setError({skills: "", interests: ""});
    }
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
    <div className="w-full my-8">
      <label className="block text-base md:text-xl mb-2">{heading}</label>
      <form className="form-control" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Type here..."
            className="input input-bordered w-full"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          <button type="submit" className="btn btn-square px-8 btn-primary">
            Add
          </button>
        </div>
      </form>
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
