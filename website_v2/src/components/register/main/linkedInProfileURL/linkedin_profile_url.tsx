"use client";

import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {LinkedInProfileSteps} from "./linkedin_profile_steps";
import {linkedInPattern} from "@/helpers/register";

const LinkedInProfileURL = () => {
  const {linkedInUrlError, setLinkedInUrlError, isEditable} =
    useProfileSettingsStore();
  const {firstName, lastName, linkedInProfileUrl, setLinkedInProfileUrl} =
    useRegisterStore();

  // Handle LinkedIn Profile URL Change
  const handleLinkedinProfileURLChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkedInProfileUrl(e.target.value);

    // Validation
    if (linkedInPattern.test(e.target.value)) {
      setLinkedInUrlError("");
    } else {
      setLinkedInUrlError("Please enter a valid LinkedIn profile URL.");
    }
  };

  return (
    <div className="w-full flex flex-row items-center gap-4">
      <div className="w-full">
        <input
          type="text"
          placeholder="* LinkedIn Profile URL"
          className={`input input-bordered w-full ${
            linkedInUrlError.length > 0 ? "border-error" : ""
          }`}
          disabled={firstName === "" || lastName === "" || !isEditable}
          required
          value={linkedInProfileUrl}
          onChange={handleLinkedinProfileURLChange}
          data-cy="register-main-linkedin-profile-url-field"
        />
        {/* LinkedIn Error */}
        {linkedInUrlError.length ? (
          <label className="label" htmlFor="headline">
            <span
              className="label-text-alt text-error"
              data-cy="register-main-linkedin-error"
            >
              {linkedInUrlError}
            </span>
          </label>
        ) : null}
      </div>
      <LinkedInProfileSteps />
    </div>
  );
};

export {LinkedInProfileURL};
