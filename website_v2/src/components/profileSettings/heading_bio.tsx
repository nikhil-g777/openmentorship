"use client";

import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {Profile} from "../profileCard/profile";
import Name from "../profileCard/name";

const HeadingBio = () => {
  const {profileImage, headlineError, bioError} = useProfileSettingsStore();
  const {firstName, lastName, headline, setHeadline, bio, setBio} =
    useRegisterStore();

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
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setBio(e.target.value)
              }
            ></textarea>
            {/* Bio Error */}
            {bioError.length ? (
              <label className="label" htmlFor="headline">
                <span className="label-text-alt text-error">{bioError}</span>
              </label>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export {HeadingBio};
