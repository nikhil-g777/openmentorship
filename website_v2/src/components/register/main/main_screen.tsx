"use client";

import {LinkedInConnect} from "./linkedin_connect";
import Link from "next/link";
import {useRegisterStore} from "@/zustand/store";
import {useState} from "react";
import {ImageWrapper} from "./image_wrapper";
import {MainForm} from "./main_form";
import {linkedInPattern} from "@/helpers/register";

const MainScreen = () => {
  const [linkedInURLError, setLinkedInURLError] = useState<string>("");
  const [headlineError, setHeadlineError] = useState<string>("");
  const [bioError, setBioError] = useState<string>("");
  const {
    token,
    currentScreen,
    setCurrentScreen,
    linkedInProfileURL,
    headline,
    bio,
  } = useRegisterStore();

  // Handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent reload
    e.preventDefault();

    // Reset errors
    setHeadlineError("");
    setBioError("");

    // Show errors
    if (!linkedInPattern.test(linkedInProfileURL)) {
      setLinkedInURLError("Please enter a valid LinkedIn profile URL.");
      return;
    }
    if (headline.length <= 3 || headline.length > 100) {
      setHeadlineError("Your headline should be between 3 and 100 characters.");
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
            linkedInURLError={linkedInURLError}
            setLinkedInURLError={setLinkedInURLError}
            headlineError={headlineError}
            setHeadlineError={setHeadlineError}
            bioError={bioError}
            setBioError={setBioError}
            handleSubmit={handleSubmit}
          >
            {/* Login or Continue */}
            <div className="w-full mt-8 mb-16 flex flex-col-reverse md:flex-row justify-center items-center gap-4 md:gap-8">
              <Link href="/" className="link">
                Already have an account?
              </Link>
              <button
                type="submit"
                className="w-48 btn btn-sm btn-primary rounded-full"
                disabled={token.length === 0}
              >
                Continue
              </button>
            </div>
          </MainForm>
        </div>
      </div>
    </div>
  );
};

export {MainScreen};
