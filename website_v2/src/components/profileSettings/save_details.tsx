"use client";

import {updateUser} from "@/endpoints/user";
import {
  checkAtleastOneSocialLinkProvided,
  checkCommunicationFrequencyIsEmpty,
  checkCommunicationPreferencesIsEmpty,
  checkDuplicateCurrentFields,
  checkDuplicateTitleDegree,
  checkExperiencesEducationBothFields,
  checkExperiencesEducationLength,
  checkGoalsIsEmpty,
  validateSocialLinks,
} from "@/helpers/register";
import {
  useCommonStore,
  useProfileSettingsStore,
  useRegisterStore,
} from "@/zustand/store";
import Image from "next/image";

const SaveDetails = ({isTopPosition}: {isTopPosition: boolean}) => {
  const {
    token,
    headline,
    bio,
    areasOfInterest,
    experiences,
    education,
    skills,
    interests,
    goals,
    communicationFrequency,
    communicationPreferences,
    socialLinks,
  } = useRegisterStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();
  const {
    setHeadlineError,
    setBioError,
    setAreasOfInterestError,
    setExperienceError,
    setSkillsInterestsError,
    setMentorshipErrors,
    socialLinksErrors,
    setSocialLinksErrors,
    loading,
    setLoading,
    isEditable,
    setIsEditable,
  } = useProfileSettingsStore();

  // Handle submit
  const handleSubmit = async () => {
    // Reset errors
    setHeadlineError("");
    setBioError("");
    setAreasOfInterestError("");
    setExperienceError({experience: "", education: ""});
    setSkillsInterestsError({skills: "", interests: ""});
    setMentorshipErrors({goals: "", frequency: "", preferences: ""});
    setSocialLinksErrors({
      twitter: "",
      medium: "",
      behance: "",
      github: "",
      portfolio: "",
      other: "",
    });

    // Catch Headline & Bio Errors
    if (headline.length <= 3) {
      setHeadlineError("Your headline should be more than 3 characters long.");
      return;
    }
    if (bio.length < 150 || bio.length > 300) {
      setBioError("Your bio should be between 150 and 300 characters long.");
      return;
    }

    // Catch AreasOfInterests Errors
    if (
      !areasOfInterest.software &&
      !areasOfInterest.design &&
      !areasOfInterest.other
    ) {
      setAreasOfInterestError("Please select at least one area of interest");
      return;
    }

    // Catch Experience Errors
    const noLength = checkExperiencesEducationLength(
      experiences,
      education,
      setExperienceError
    );
    if (noLength) return;

    const duplicateCurrentFields = checkDuplicateCurrentFields(
      experiences,
      education,
      setExperienceError
    );
    if (duplicateCurrentFields) return;

    const duplicateTitleDegree = checkDuplicateTitleDegree(
      experiences,
      education,
      setExperienceError
    );
    if (duplicateTitleDegree) return;

    const experiencesEducationFields = checkExperiencesEducationBothFields(
      experiences,
      education,
      setExperienceError
    );
    if (experiencesEducationFields) return;

    // Catch Skills and Interests Errors
    if (skills.length === 0) {
      setSkillsInterestsError({
        skills: "Please add at least one skill",
        interests: "",
      });
      return;
    }
    if (interests.length === 0) {
      setSkillsInterestsError({
        skills: "",
        interests: "Please add at least one interest",
      });
      return;
    }

    // Catch Mentorship Preferences Errors
    const isGoalsEmpty = checkGoalsIsEmpty(goals, setMentorshipErrors);
    if (isGoalsEmpty) return;

    const isCommunicationFrequencyEmpty = checkCommunicationFrequencyIsEmpty(
      communicationFrequency,
      setMentorshipErrors
    );
    if (isCommunicationFrequencyEmpty) return;

    const isCommunicationPreferencesEmpty =
      checkCommunicationPreferencesIsEmpty(
        communicationPreferences,
        setMentorshipErrors
      );
    if (isCommunicationPreferencesEmpty) return;

    // Check Social Links Errors
    const noLinkProvided = checkAtleastOneSocialLinkProvided(
      socialLinks,
      socialLinksErrors,
      setSocialLinksErrors
    );
    if (noLinkProvided) return;

    const notValidLink = validateSocialLinks(
      socialLinks,
      socialLinksErrors,
      setSocialLinksErrors
    );
    if (notValidLink) return;

    // Update Profile
    setLoading(true);
    const res = await updateUser(token, {
      type: "updateUser",
      user: {
        headline,
        bio,
        areasOfInterest,
        experiences: experiences.map(exp => ({
          organization: exp.organization,
          title: exp.title,
        })),
        education: education.map(edu => ({
          school: edu.school,
          degree: edu.degree,
        })),
        skills,
        interests,
        goals,
        communicationFrequency,
        communicationPreferences,
        socialLinks,
      },
    });

    if (res.success) {
      setLoading(false);
      setIsEditable(false);
      setSuccessAlert("Profile updated successfully", 6);
    }
    if (!res.success) {
      setLoading(false);
      setErrorAlert("Something went wrong, please try again later", 6);
    }
  };
  return (
    <>
      {!isTopPosition ? (
        <div className="w-full max-w-3xl mx-auto mb-20">
          <div className="w-full my-8 text-center">
            <button
              className="w-48 btn btn-outline btn-accent rounded-full hover:text-white"
              onClick={handleSubmit}
              disabled={loading || !isEditable}
            >
              {loading ? "Saving..." : "Save Details"}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="btn gap-2 items-center btn-sm btn-outline hover:btn-accent ml-auto"
          onClick={isEditable ? handleSubmit : () => setIsEditable(true)}
          disabled={loading}
        >
          <span>{loading ? "Saving..." : isEditable ? "Save" : "Edit"}</span>
          <Image
            src="/assets/icons/pencil.svg"
            alt="edit and save profile"
            width={20}
            height={20}
          />
        </button>
      )}
    </>
  );
};

export {SaveDetails};
