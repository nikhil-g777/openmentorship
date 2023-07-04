"use client";

import {LinkedInConnect} from "./linkedin_connect";
import Link from "next/link";
import {useRegisterStore} from "@/zustand/store";
import {useState} from "react";
import {ImageWrapper} from "./image_wrapper";
import {MainForm} from "./main_form";

const MainScreen = () => {
  const [headlineError, setHeadlineError] = useState<string>("");
  const [bioError, setBioError] = useState<string>("");
  const {token, currentScreen, setCurrentScreen, headline, bio} =
    useRegisterStore();

  // Handle submit
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
        <ImageWrapper />
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
          <MainForm
            headlineError={headlineError}
            bioError={bioError}
            handleSubmit={handleSubmit}
          />
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
      </div>
    </div>
  );
};

export {MainScreen};
