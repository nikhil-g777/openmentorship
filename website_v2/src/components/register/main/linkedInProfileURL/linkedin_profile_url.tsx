import {useRegisterStore} from "@/zustand/store";
import {LinkedInProfileSteps} from "./linkedin_profile_steps";
import {Dispatch, SetStateAction} from "react";
import {linkedInPattern} from "@/helpers/register";

type Props = {
  linkedInURLError: string;
  setLinkedInURLError: Dispatch<SetStateAction<string>>;
};

const LinkedInProfileURL = ({linkedInURLError, setLinkedInURLError}: Props) => {
  const {firstName, lastName, linkedInProfileURL, setLinkedInProfileURL} =
    useRegisterStore();

  // Handle LinkedIn Profile URL Change
  const handleLinkedinProfileURLChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkedInProfileURL(e.target.value);

    // Validation
    if (linkedInPattern.test(e.target.value)) {
      setLinkedInURLError("");
    } else {
      setLinkedInURLError("Please enter a valid LinkedIn profile URL.");
    }
  };

  return (
    <div className="w-full flex flex-row items-center gap-4">
      <div className="w-full">
        <input
          type="text"
          placeholder="* LinkedIn Profile URL"
          className={`input input-bordered w-full ${
            linkedInURLError.length > 0 ? "border-error" : ""
          }`}
          disabled={firstName === "" || lastName === ""}
          required
          value={linkedInProfileURL}
          onChange={handleLinkedinProfileURLChange}
        />
        {/* LinkedIn Error */}
        {linkedInURLError.length ? (
          <label className="label" htmlFor="headline">
            <span className="label-text-alt text-error">
              {linkedInURLError}
            </span>
          </label>
        ) : null}
      </div>
      <LinkedInProfileSteps />
    </div>
  );
};

export {LinkedInProfileURL};
