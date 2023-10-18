import {useRegisterStore} from "@/zustand/store";
import {Dispatch, SetStateAction} from "react";
import {LinkedInProfileURL} from "./linkedInProfileURL/linkedin_profile_url";

type Props = {
  headlineError: string;
  setHeadlineError: Dispatch<SetStateAction<string>>;
  bioError: string;
  setBioError: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
};

const MainForm = ({
  headlineError,
  setHeadlineError,
  bioError,
  setBioError,
  handleSubmit,
  children,
}: Props) => {
  const {firstName, lastName, email, headline, setHeadline, bio, setBio} =
    useRegisterStore();

  // Handle Headline Change
  const handleHeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeadline(e.target.value);

    // Validation
    if (e.target.value.length <= 3 || e.target.value.length > 100) {
      setHeadlineError("Your headline should be between 3 and 100 characters.");
    } else {
      setHeadlineError("");
    }
  };

  // Handle Bio Change
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);

    // Validation
    if (e.target.value.length < 150 || e.target.value.length > 300) {
      setBioError("Your bio should be between 150 and 300 characters long.");
    } else {
      setBioError("");
    }
  };
  return (
    <form className="w-full mt-4" onSubmit={handleSubmit}>
      {/* First Name & Last Name */}
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-2">
        <input
          type="text"
          placeholder="* First Name"
          className="input input-bordered w-full"
          disabled
          required
          value={firstName}
        />
        <input
          type="text"
          placeholder="* Last Name"
          className="input input-bordered w-full"
          disabled
          required
          value={lastName}
        />
      </div>
      {/* Email, LinkedInProfileURL, Headline & Bio */}
      <div className="w-full flex flex-col gap-4 mt-4">
        <input
          type="text"
          placeholder="* Email"
          className="input input-bordered w-full"
          disabled
          required
          value={email}
        />
        {/* LinkedIn Profile URL */}
        <LinkedInProfileURL />
        <div className="w-full">
          <input
            id="headline"
            type="text"
            placeholder="* Headline"
            className={`input input-bordered w-full ${
              headlineError.length > 0 ? "border-error" : ""
            }`}
            disabled={firstName === "" || lastName === ""}
            value={headline}
            onChange={handleHeadlineChange}
          />
          {/* Headline Error */}
          {headlineError.length ? (
            <label className="label" htmlFor="headline">
              <span className="label-text-alt text-error">{headlineError}</span>
            </label>
          ) : null}
        </div>
        <div className="w-full">
          <textarea
            id="bio"
            placeholder="* Bio"
            className={`textarea textarea-bordered textarea-lg px-4 text-base w-full max-h-48 min-h-[128px] ${
              bioError.length ? "border-error" : ""
            }`}
            disabled={firstName === "" || lastName === ""}
            value={bio}
            onChange={handleBioChange}
          ></textarea>
          {/* Bio Error & Word Count */}
          <label className="label" htmlFor="headline">
            {bioError.length ? (
              <span className="label-text-alt text-error">{bioError}</span>
            ) : null}
            <span className="label-text-alt text-right">{bio.length}/300</span>
          </label>
        </div>
      </div>
      {/* Submit */}
      {children}
    </form>
  );
};

export {MainForm};
