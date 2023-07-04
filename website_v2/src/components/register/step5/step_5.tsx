"use client";

import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {
  checkAtleastOneSocialLinkProvided,
  validateSocialLinks,
} from "@/helpers/register";
import {useState} from "react";
import {SocialLinks} from "@/types/regsiter";
import {updateUser} from "@/endpoints/user";
import {LinksProvider} from "./step_5_links_provider";

const Step5 = () => {
  const {...states} = useRegisterStore();
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
    states.socialLinks[e.target.name as keyof SocialLinks] =
      e.target.value.trim();
    states.setSocialLinks(states.socialLinks);
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
    const noLinkProvided = checkAtleastOneSocialLinkProvided(
      states.socialLinks,
      error,
      setError
    );
    if (noLinkProvided) return;

    // Check for errors
    const notValidLink = validateSocialLinks(
      states.socialLinks,
      error,
      setError
    );
    if (notValidLink) return;

    // Update with the details
    setLoading(true);
    const res = await updateUser(states.token, {
      type: "completeRegistration",
      _id: states.userId,
      register: true,
      user: {
        headline: states.headline,
        bio: states.bio,
        userType: states.userType,
        careerStatus: states.careerStatus,
        areasOfInterest: states.areasOfInterest,
        experiences: states.experiences.map(exp => ({
          organization: exp.organization,
          title: exp.title,
        })),
        education: states.education.map(edu => ({
          school: edu.school,
          degree: edu.degree,
        })),
        skills: states.skills,
        interests: states.interests,
        goals: states.goals,
        communicationFrequency: states.communicationFrequency,
        communicationPreferences: states.communicationPreferences,
        socialLinks: states.socialLinks,
        registrationStatus: "complete",
      },
    });
    setLoading(false);
    // Success alert if response is successful
    if (res.success) {
      setSuccessAlert("Registration completed successfully");
      states.setCurrentScreen("step6");
    }
    // Error alert if response is unsuccessful
    if (!res.success) {
      setErrorAlert("Something went wrong, please try again later");
      return;
    }
  };

  return (
    <div
      className={`w-full ${states.currentScreen === "step5" ? "" : "hidden"}`}
    >
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
          Add your Social Media links
        </h1>
        {/* Links */}
        <LinksProvider error={error} handleChanges={handleChanges} />
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
