"use client";

import {
  useCommonStore,
  useProfileSettingsStore,
  useRegisterStore,
} from "@/zustand/store";
import {validateSocialLinks} from "@/helpers/register";
import {useState} from "react";
import {SocialLinks} from "@/types/regsiter";
import {updateUser} from "@/endpoints/user";
import {LinksProvider} from "./links_provider";

const Step5 = () => {
  const {...states} = useRegisterStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();
  const {isProfilePage, socialLinksErrors} = useProfileSettingsStore();
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
    // const noLinkProvided = checkAtleastOneSocialLinkProvided(
    //   states.socialLinks,
    //   error,
    //   setError
    // );
    // if (noLinkProvided) return;

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
        linkedInProfileUrl: states.linkedInProfileURL,
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
      setSuccessAlert("Registration completed successfully", 3);
      states.setCurrentScreen("step6");
    }
    // Error alert if response is unsuccessful
    if (!res.success) {
      setErrorAlert("Something went wrong, please try again later", 3);
      return;
    }
  };

  return (
    <div
      className={`w-full ${
        states.currentScreen === "step5" || isProfilePage ? "" : "hidden"
      }`}
    >
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        {!isProfilePage ? (
          <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
            Add social links and showcase your work
          </h1>
        ) : (
          <h2 className="text-xl font-semibold mt-8 -mb-4">Social Media</h2>
        )}
        {/* Links */}
        <LinksProvider
          error={isProfilePage ? socialLinksErrors : error}
          handleChanges={handleChanges}
        />
        {/* Continue */}
        {!isProfilePage ? (
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
        ) : null}
      </div>
    </div>
  );
};

export {Step5};
