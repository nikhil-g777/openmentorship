"use client";

import {UserProfile} from "@/types/profile";
import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {useRef} from "react";

type Props = {
  data: UserProfile;
};

const StoreInitializer = ({data}: Props) => {
  // console.log(data);
  const {
    setFirstName,
    setLastName,
    setEmail,
    setHeadline,
    setBio,
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
    setFirstName(data.user.firstName);
    setLastName(data.user.lastName);
    setEmail(data.user.email);
    setProfileImage(data.user.profileImageUrls);
    setisProfilePage(true);
    setHeadline(data.user.headline);
    setBio(data.user.bio);
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
