"use client";

import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {Profile} from "../profileCard/profile";
import {Name} from "../profileCard/name";
import {LinkedInProfileURL} from "../register/main/linkedInProfileURL/linkedin_profile_url";

const HeadingBio = () => {
  const {profileImage, headlineError, isEditable, setBioError, bioError} =
    useProfileSettingsStore();
  const {firstName, lastName, headline, setHeadline, bio, setBio} =
    useRegisterStore();

  // Handle change
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
    if (e.target.value.length < 150 || e.target.value.length > 300) {
      setBioError("Your bio should be between 150 and 300 characters long.");
    } else {
      setBioError("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Container */}
      <div className="w-full flex flex-col items-center sm:flex-row sm:items-start gap-5 mt-8">
        {/* Profile Image */}
        <Profile data={profileImage} />
        {/* Typography */}
        <div className="w-full flex flex-col gap-4">
          {/* Name */}
          <div className="w-full">
            <Name firstName={firstName} lastName={lastName} linkedinURI="" />
          </div>
          {/* Headline and Bio */}
          <div className="w-full form-control">
            <LinkedInProfileURL />
            <label className="label">
              <span className="label-text">Headline</span>
            </label>
            <input
              id="headline"
              type="text"
              placeholder="* Headline"
              className={`input input-bordered w-full ${
                headlineError.length > 0 ? "border-error" : ""
              }`}
              value={headline}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setHeadline(e.target.value)
              }
              disabled={!isEditable}
            />
            {/* Headline Error */}
            {headlineError.length ? (
              <label className="label" htmlFor="headline">
                <span className="label-text-alt text-error">
                  {headlineError}
                </span>
              </label>
            ) : null}
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <textarea
              id="bio"
              placeholder="* Bio"
              className={`textarea textarea-bordered textarea-lg px-4 text-base w-full max-h-48 h-36 ${
                bioError.length ? "border-error" : ""
              }`}
              value={bio}
              onChange={handleBioChange}
              disabled={!isEditable}
            ></textarea>
            {/* Bio Error && Word Count */}
            <label className="label" htmlFor="headline">
              {bioError.length ? (
                <span className="label-text-alt text-error">{bioError}</span>
              ) : null}
              <span className="label-text-alt text-right">
                {bio.length}/300
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export {HeadingBio};
