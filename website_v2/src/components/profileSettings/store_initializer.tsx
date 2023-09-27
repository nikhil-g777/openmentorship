"use client";

import {UserProfile} from "@/types/profile";
import {
  useCommonStore,
  useProfileSettingsStore,
  useRegisterStore,
} from "@/zustand/store";
import {useEffect} from "react";
import {notFound, useRouter} from "next/navigation";

type Props = {
  data: UserProfile;
  token: string | undefined | null;
};

const StoreInitializer = ({data, token}: Props) => {
  const router = useRouter();
  const {
    setToken,
    setFirstName,
    setLastName,
    setEmail,
    setLinkedInProfileUrl,
    setHeadline,
    setBio,
    setUserType,
    setInterests,
    setSkills,
    setGoals,
    setSocialLinks,
    setExperiences,
    setEducation,
    setAreasOfInterest,
    setCommunicationFrequency,
    setCommunicationPreferences,
  } = useRegisterStore();
  const {setProfileImage, setisProfilePage} = useProfileSettingsStore();
  const {setErrorAlert} = useCommonStore();

  // Update states
  useEffect(() => {
    // Redirect if no token
    if (!token) {
      setErrorAlert("Error getting data! Redirecting you to homepage.", 6);
      router.replace("/");
      return;
    }

    // Not found if request failed
    if (!data.success) {
      notFound();
    }

    // Set states
    setToken(token);
    setFirstName(data.user.firstName);
    setLastName(data.user.lastName);
    setEmail(data.user.email);
    setLinkedInProfileUrl(data.user.linkedInProfileUrl);
    setProfileImage(data.user.profileImageUrls);
    setisProfilePage(true);
    setHeadline(data.user.headline);
    setBio(data.user.bio);
    setUserType(data.user.userType);
    setInterests(data.user.interests);
    setSkills(data.user.skills);
    setGoals(data.user.goals);
    setSocialLinks(data.user.socialLinks);
    setExperiences(data.user.experiences);
    setEducation(data.user.education);
    setAreasOfInterest(data.user.areasOfInterest);
    setCommunicationFrequency(data.user.communicationFrequency);
    setCommunicationPreferences(data.user.communicationPreferences);

    // Cleanup function
    return () => setisProfilePage(false);
  }, [
    token,
    data,
    router,
    setErrorAlert,
    setToken,
    setFirstName,
    setLastName,
    setEmail,
    setLinkedInProfileUrl,
    setProfileImage,
    setisProfilePage,
    setHeadline,
    setBio,
    setUserType,
    setInterests,
    setSkills,
    setGoals,
    setSocialLinks,
    setExperiences,
    setEducation,
    setAreasOfInterest,
    setCommunicationFrequency,
    setCommunicationPreferences,
  ]);

  return null;
};

export {StoreInitializer};
