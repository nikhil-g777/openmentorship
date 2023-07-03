"use client";

import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {
  twitterPattern,
  mediumPattern,
  behancePattern,
  githubPattern,
  otherPattern,
} from "@/helpers/register";
import {useState} from "react";
import {SocialLinks} from "@/types/regsiter";
import {updateUser} from "@/endpoints/user";

const Step5 = () => {
  const {
    token,
    userId,
    currentScreen,
    setCurrentScreen,
    headline,
    bio,
    userType,
    careerStatus,
    areasOfInterest,
    experiences,
    education,
    skills,
    interests,
    goals,
    communicationFrequency,
    communicationPreferences,
    socialLinks,
    setSocialLinks,
    socialSites,
  } = useRegisterStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<SocialLinks>({
    twitter: "",
    medium: "",
    behance: "",
    github: "",
    portfolio: "",
    other: "",
  });

  // Handle changes
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the social links
    socialLinks[e.target.name as keyof SocialLinks] = e.target.value.trim();
    setSocialLinks(socialLinks);
  };

  // Handle continue
  const handleContinue = async () => {
    // Reset the errors
    setError({
      twitter: "",
      medium: "",
      behance: "",
      github: "",
      portfolio: "",
      other: "",
    });

    // Atleast one link should be provided
    if (
      !socialLinks.twitter.length &&
      !socialLinks.medium.length &&
      !socialLinks.behance.length &&
      !socialLinks.github.length &&
      !socialLinks.portfolio.length &&
      !socialLinks.other.length
    ) {
      setError({
        ...error,
        other: "Atleast one link is required",
      });
      return;
    }

    // Check for errors
    if (
      socialLinks.twitter.length &&
      !twitterPattern.test(socialLinks.twitter)
    ) {
      setError({...error, twitter: "Invalid twitter url"});
      return;
    }
    if (socialLinks.medium.length && !mediumPattern.test(socialLinks.medium)) {
      setError({...error, medium: "Invalid medium url"});
      return;
    }
    if (
      socialLinks.behance.length &&
      !behancePattern.test(socialLinks.behance)
    ) {
      setError({...error, behance: "Invalid behance url"});
      return;
    }
    if (socialLinks.github.length && !githubPattern.test(socialLinks.github)) {
      setError({...error, github: "Invalid github url"});
      return;
    }
    if (
      socialLinks.portfolio.length &&
      !otherPattern.test(socialLinks.portfolio)
    ) {
      setError({...error, portfolio: "Invalid portfolio url"});
      return;
    }
    if (socialLinks.other.length && !otherPattern.test(socialLinks.other)) {
      setError({...error, other: "Invalid url"});
      return;
    }

    // Update with the details
    setLoading(true);
    const res = await updateUser(token, {
      type: "completeRegistration",
      _id: userId,
      register: true,
      user: {
        headline: headline,
        bio: bio,
        userType: userType,
        careerStatus: careerStatus,
        areasOfInterest: areasOfInterest,
        experiences: experiences.map(exp => ({
          organization: exp.organization,
          title: exp.title,
        })),
        education: education.map(edu => ({
          school: edu.school,
          degree: edu.degree,
        })),
        skills: skills,
        interests: interests,
        goals: goals,
        communicationFrequency: communicationFrequency,
        communicationPreferences: communicationPreferences,
        socialLinks: socialLinks,
        registrationStatus: "complete",
      },
    });
    setLoading(false);
    // Success alert if response is successful
    if (res.success) {
      setSuccessAlert("Registration completed successfully");
      setCurrentScreen("step6");
    }
    // Error alert if response is unsuccessful
    if (!res.success) {
      setErrorAlert("Something went wrong, please try again later");
      return;
    }
  };

  return (
    <div className={`w-full ${currentScreen === "step5" ? "" : "hidden"}`}>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
          Add your Social Media links
        </h1>
        {/* Links */}
        <div className="w-full flex flex-col gap-4 mt-8">
          {socialSites && socialSites.length
            ? socialSites.map(site => (
                <div key={site}>
                  <div
                    key={site}
                    className="w-full flex flex-col md:flex-row md:items-center gap-2"
                  >
                    <label
                      htmlFor={site}
                      className="text-base md:text-lg md:w-1/6 capitalize"
                    >
                      {site}
                    </label>
                    <input
                      className={`input input-bordered w-full ${
                        error[site as keyof SocialLinks].length
                          ? "input-error"
                          : ""
                      }`}
                      id={site}
                      placeholder="https://"
                      name={site}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChanges(e)
                      }
                    />
                  </div>
                  {/* Error */}
                  {error[site as keyof SocialLinks].length ? (
                    <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
                      <label className="w-[14%]"></label>
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {error[site as keyof SocialLinks]}
                        </span>
                      </label>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>
        {/* Continue */}
        <div className="w-full my-8 text-center">
          <button
            className={`w-48 btn btn-outline btn-accent rounded-full hover:text-white ${
              loading ? "loading" : ""
            }`}
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Updating..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export {Step5};
