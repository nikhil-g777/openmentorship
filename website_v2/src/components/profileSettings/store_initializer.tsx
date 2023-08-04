"use client";

import {UserProfile} from "@/types/profile";
import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {useRef} from "react";

type Props = {
  data: UserProfile;
  token: string | undefined | null;
};

const StoreInitializer = ({data, token}: Props) => {
  // console.log(data);
  const {
    setToken,
    setFirstName,
    setLastName,
    setEmail,
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
  const initialzied = useRef(false);

  // Update states once
  if (!initialzied.current) {
    setToken(token || "");
    setFirstName(data.user.firstName);
    setLastName(data.user.lastName);
    setEmail(data.user.email);
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

    // Set current to true
    initialzied.current = true;
  }
  return null;
};

export {StoreInitializer};
