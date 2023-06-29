"use client";

import Image from "next/image";
import {LinkedInConnect} from "./linkedin_connect";
import Link from "next/link";
import {useRegisterStore} from "@/zustand/store";
import {useState} from "react";

const MainScreen = () => {
  const [headlineError, setHeadlineError] = useState<string>("");
  const [bioError, setBioError] = useState<string>("");
  const {
    token,
    currentScreen,
    setCurrentScreen,
    firstName,
    lastName,
    email,
    headline,
    setHeadline,
    bio,
    setBio,
  } = useRegisterStore();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent reload
    e.preventDefault();

    // Reset errors
    setHeadlineError("");
    setBioError("");

    // Show errors
    if (headline.length <= 3) {
      setHeadlineError("Your headline should be more than 3 characters long.");
      return;
    }
    if (bio.length < 150 || bio.length > 300) {
      setBioError("Your bio should be between 150 and 300 characters long.");
      return;
    }

    // Move to next screen
    setCurrentScreen("step1");
  };
  return (
    <div className={`w-full ${currentScreen === "main" ? "" : "hidden"}`}>
      <div className="w-full min-h-screen h-full grid grid-cols-1 md:grid-cols-2 justify-center">
        {/* Image */}
        <div className="w-full relative overflow-hidden hidden md:block">
          <Image
            src="/assets/images/registerBackground.png"
            fill={true}
            className="object-cover"
            alt="register-hero"
          />
        </div>
        {/* Typography */}
        <div className="w-full flex flex-col gap-4 mt-8 px-4 sm:px-8 md:px-16">
          {/* Heading and Linkedin */}
          <h1 className="text-xl text-center md:text-left sm:text-heading sm:leading-normal font-bold">
            Open Mentorship
          </h1>
          <h2 className="text-base text-center md:text-left md:text-lg">
            Find a Mentor who can help guide you to success.
          </h2>
          <LinkedInConnect />
          {/* Form */}
          <form className="w-full mt-8" onSubmit={handleSubmit}>
            {/* First Name & Last Name */}
            <div className="w-full flex flex-col md:flex-row gap-2">
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
            {/* Email, Headline & Bio */}
            <div className="w-full flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="* Email"
                className="input input-bordered w-full"
                disabled
                required
                value={email}
              />
              <div className="w-full">
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
                {headlineError.length ? (
                  <label className="label" htmlFor="headline">
                    <span className="label-text-alt text-error">
                      {headlineError}
                    </span>
                  </label>
                ) : null}
              </div>
              <div className="w-full">
                <textarea
                  id="bio"
                  placeholder="* Bio"
                  className={`textarea textarea-bordered textarea-lg px-4 text-base w-full max-h-48 min-h-16 ${
                    bioError.length ? "border-error" : ""
                  }`}
                  value={bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setBio(e.target.value)
                  }
                ></textarea>
                {bioError.length ? (
                  <label className="label" htmlFor="headline">
                    <span className="label-text-alt text-error">
                      {bioError}
                    </span>
                  </label>
                ) : null}
              </div>

              {/* Login or Continue */}
              <div className="w-full mt-8 mb-16 flex flex-col-reverse md:flex-row justify-center items-center gap-4 md:gap-8">
                <Link href="/" className="link">
                  Already have an account?
                </Link>
                <button
                  className="w-48 btn btn-sm btn-primary rounded-full"
                  disabled={token.length === 0}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export {MainScreen};
