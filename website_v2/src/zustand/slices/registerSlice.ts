import {
  communicationFrequencyList,
  communicationPreferencesList,
  goalsList,
  menteeGuidelines,
  mentorGuidelines,
  socialSites,
} from "@/helpers/register";
import {
  CommunicationPreferences,
  Education,
  SocialLinks,
  WorkExperience,
} from "@/types/regsiter";
import {StateCreator} from "zustand";

// Types
export type RegisterSlice = {
  // States
  // Main screen
  token: string;
  userId: string;
  currentScreen: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedInProfileUrl: string;
  headline: string;
  bio: string;
  // Screen1
  userType: string;
  careerStatus: string;
  areasOfInterest: {
    software: boolean;
    design: boolean;
    other: boolean;
  };
  // Screen2
  experiences: [] | WorkExperience[];
  education: [] | Education[];
  // Screen3
  skills: string[];
  interests: string[];
  // Screen4
  goals: {[key: string]: boolean};
  goalsList: {id: number; name: string; title: string}[];
  communicationFrequency: string;
  communicationFrequencyList: {id: number; value: string; title: string}[];
  communicationPreferences: CommunicationPreferences;
  communicationPreferencesList: string[];
  // Screen5
  socialLinks: SocialLinks;
  socialSites: string[];
  // Guidelines
  menteeGuidelines: {id: number; imageURL: string; text: string}[];
  mentorGuidelines: {id: number; imageURL: string; text: string}[];
  // Registration status
  registrationStatus: string;

  // Actions
  // Main screen
  setToken: (type: string) => void;
  setUserId: (type: string) => void;
  setCurrentScreen: (type: string) => void;
  setFirstName: (type: string) => void;
  setLastName: (type: string) => void;
  setEmail: (type: string) => void;
  setLinkedInProfileUrl: (type: string) => void;
  setHeadline: (type: string) => void;
  setBio: (type: string) => void;
  // Screen1
  setUserType: (type: string) => void;
  setCareerStatus: (type: string) => void;
  setAreasOfInterest: (type: {
    software: boolean;
    design: boolean;
    other: boolean;
  }) => void;
  // Screen2
  setExperiences: (type: [] | WorkExperience[]) => void;
  setEducation: (type: [] | Education[]) => void;
  // Screen3
  setSkills: (type: string[]) => void;
  setInterests: (type: string[]) => void;
  // Screen4
  setGoals: (type: {[key: string]: boolean}) => void;
  setCommunicationFrequency: (type: string) => void;
  setCommunicationPreferences: (type: CommunicationPreferences) => void;
  // Screen5
  setSocialLinks: (type: SocialLinks) => void;
  // Reset state
  resetState: () => void;
  // Registration status
  setRegistrationStatus: (type: string) => void;
};

// Initial state
const initialState = {
  // Main screen
  token: "",
  userId: "",
  currentScreen: "main",
  firstName: "",
  lastName: "",
  email: "",
  linkedInProfileUrl: "",
  headline: "",
  bio: "",
  // Screen1
  userType: "mentee",
  careerStatus: "Student",
  areasOfInterest: {
    software: false,
    design: false,
    other: false,
  },
  // Screen2
  experiences: [],
  education: [],
  // Screen3
  skills: [],
  interests: [],
  // Screen4
  goals: {},
  goalsList: goalsList,
  communicationFrequency: "",
  communicationFrequencyList: communicationFrequencyList,
  communicationPreferences: [],
  communicationPreferencesList: communicationPreferencesList,
  // Screen5
  socialLinks: {
    twitter: "",
    medium: "",
    behance: "",
    github: "",
    portfolio: "",
    other: "",
  },
  socialSites: socialSites,
  // Guidelines
  menteeGuidelines: menteeGuidelines,
  mentorGuidelines: mentorGuidelines,
  // Registration status
  registrationStatus: "",
};

export const registerSlice: StateCreator<
  RegisterSlice,
  [],
  [],
  RegisterSlice
> = set => ({
  ...initialState,
  // Actions
  // Main screen
  setUserId: (userId: string) =>
    set(() => ({
      userId: userId,
    })),
  setToken: (token: string) =>
    set(() => ({
      token: token,
    })),
  setCurrentScreen: (currentScreen: string) =>
    set(() => ({
      currentScreen: currentScreen,
    })),
  setFirstName: (firstName: string) =>
    set(() => ({
      firstName: firstName,
    })),
  setLastName: (lastName: string) =>
    set(() => ({
      lastName: lastName,
    })),
  setEmail: (email: string) =>
    set(() => ({
      email: email,
    })),
  setLinkedInProfileUrl: (linkedInProfileUrl: string) =>
    set(() => ({
      linkedInProfileUrl: linkedInProfileUrl,
    })),
  setHeadline: (headline: string) =>
    set(() => ({
      headline: headline,
    })),
  setBio: (bio: string) =>
    set(() => ({
      bio: bio,
    })),
  // Screen1
  setUserType: (userType: string) =>
    set(() => ({
      userType: userType,
    })),
  setCareerStatus: (careerStatus: string) =>
    set(() => ({
      careerStatus: careerStatus,
    })),
  setAreasOfInterest: (areasOfInterest: {
    software: boolean;
    design: boolean;
    other: boolean;
  }) =>
    set(() => ({
      areasOfInterest: areasOfInterest,
    })),
  // Screen2
  setExperiences: (experiences: [] | WorkExperience[]) =>
    set(() => ({
      experiences: experiences,
    })),
  setEducation: (education: [] | Education[]) =>
    set(() => ({
      education: education,
    })),
  // Screen3
  setSkills: (skills: string[]) =>
    set(() => ({
      skills: skills,
    })),
  setInterests: (interests: string[]) =>
    set(() => ({
      interests: interests,
    })),
  // Screen4
  setGoals: (goals: {[key: string]: boolean}) =>
    set(() => ({
      goals: goals,
    })),
  setCommunicationFrequency: (communicationFrequency: string) =>
    set(() => ({
      communicationFrequency: communicationFrequency,
    })),
  setCommunicationPreferences: (
    communicationPreferences: CommunicationPreferences
  ) =>
    set(() => ({
      communicationPreferences: communicationPreferences,
    })),
  // Screen5
  setSocialLinks: (socialLinks: SocialLinks) =>
    set(() => ({
      socialLinks: socialLinks,
    })),
  // Reset state
  resetState: () =>
    set(() => ({
      ...initialState,
    })),
  // Registration status
  setRegistrationStatus: (registrationStatus: string) =>
    set(() => ({
      registrationStatus: registrationStatus,
    })),
});
