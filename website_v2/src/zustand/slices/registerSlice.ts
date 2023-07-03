import {
  CommunicationPreferences,
  Education,
  SocialLinks,
  WorkExperience,
} from "@/types/regsiter";
import {StateCreator} from "zustand";

export type RegisterSlice = {
  token: string;
  userId: string;
  setUserId: (type: string) => void;
  setToken: (type: string) => void;
  currentScreen: string;
  setCurrentScreen: (type: string) => void;
  firstName: string;
  setFirstName: (type: string) => void;
  lastName: string;
  setLastName: (type: string) => void;
  email: string;
  setEmail: (type: string) => void;
  headline: string;
  setHeadline: (type: string) => void;
  bio: string;
  setBio: (type: string) => void;
  userType: string;
  setUserType: (type: string) => void;
  careerStatus: string;
  setCareerStatus: (type: string) => void;
  areasOfInterest: {
    software: boolean;
    design: boolean;
    other: boolean;
  };
  setAreasOfInterest: (type: {
    software: boolean;
    design: boolean;
    other: boolean;
  }) => void;
  experiences: [] | WorkExperience[];
  setExperiences: (type: [] | WorkExperience[]) => void;
  education: [] | Education[];
  setEducation: (type: [] | Education[]) => void;
  skills: string[];
  setSkills: (type: string[]) => void;
  interests: string[];
  setInterests: (type: string[]) => void;
  goals: {[key: string]: boolean};
  setGoals: (type: {[key: string]: boolean}) => void;
  communicationFrequency: string;
  setCommunicationFrequency: (type: string) => void;
  communicationPreferences: CommunicationPreferences;
  setCommunicationPreferences: (type: CommunicationPreferences) => void;
  socialLinks: SocialLinks;
  setSocialLinks: (type: SocialLinks) => void;
  socialSites: string[];
  menteeGuidelines: {id: number; imageURL: string; text: string}[];
  mentorGuidelines: {id: number; imageURL: string; text: string}[];
};

export const registerSlice: StateCreator<
  RegisterSlice,
  [],
  [],
  RegisterSlice
> = set => ({
  token: "",
  userId: "",
  setUserId: (userId: string) =>
    set(() => ({
      userId: userId,
    })),
  setToken: (token: string) =>
    set(() => ({
      token: token,
    })),
  currentScreen: "main",
  setCurrentScreen: (currentScreen: string) =>
    set(() => ({
      currentScreen: currentScreen,
    })),
  firstName: "",
  setFirstName: (firstName: string) =>
    set(() => ({
      firstName: firstName,
    })),
  lastName: "",
  setLastName: (lastName: string) =>
    set(() => ({
      lastName: lastName,
    })),
  email: "",
  setEmail: (email: string) =>
    set(() => ({
      email: email,
    })),
  headline: "",
  setHeadline: (headline: string) =>
    set(() => ({
      headline: headline,
    })),
  bio: "",
  setBio: (bio: string) =>
    set(() => ({
      bio: bio,
    })),
  userType: "mentee",
  setUserType: (userType: string) =>
    set(() => ({
      userType: userType,
    })),
  careerStatus: "Student",
  setCareerStatus: (careerStatus: string) =>
    set(() => ({
      careerStatus: careerStatus,
    })),
  areasOfInterest: {
    software: false,
    design: false,
    other: false,
  },
  setAreasOfInterest: (areasOfInterest: {
    software: boolean;
    design: boolean;
    other: boolean;
  }) =>
    set(() => ({
      areasOfInterest: areasOfInterest,
    })),
  experiences: [],
  setExperiences: (experiences: [] | WorkExperience[]) =>
    set(() => ({
      experiences: experiences,
    })),
  education: [],
  setEducation: (education: [] | Education[]) =>
    set(() => ({
      education: education,
    })),
  skills: [],
  setSkills: (skills: string[]) =>
    set(() => ({
      skills: skills,
    })),
  interests: [],
  setInterests: (interests: string[]) =>
    set(() => ({
      interests: interests,
    })),
  goals: {},
  setGoals: (goals: {[key: string]: boolean}) =>
    set(() => ({
      goals: goals,
    })),
  communicationFrequency: "",
  setCommunicationFrequency: (communicationFrequency: string) =>
    set(() => ({
      communicationFrequency: communicationFrequency,
    })),
  communicationPreferences: [],
  setCommunicationPreferences: (
    communicationPreferences: CommunicationPreferences
  ) =>
    set(() => ({
      communicationPreferences: communicationPreferences,
    })),
  socialLinks: {
    twitter: "",
    medium: "",
    behance: "",
    github: "",
    portfolio: "",
    other: "",
  },
  setSocialLinks: (socialLinks: SocialLinks) =>
    set(() => ({
      socialLinks: socialLinks,
    })),
  socialSites: ["twitter", "medium", "behance", "github", "portfolio", "other"],
  menteeGuidelines: [
    {
      id: 1,
      imageURL: "/assets/images/postRegistration/email.svg",
      text: "You will recieve an email confirmation of your registration.",
    },
    {
      id: 2,
      imageURL: "/assets/images/postRegistration/people.svg",
      text: "Explore and find mentors based on your interests and goals.",
    },
    {
      id: 3,
      imageURL: "/assets/images/postRegistration/request.svg",
      text: "Send a request to connect with mentors you like. Be specific about what you are looking for.",
    },
    {
      id: 4,
      imageURL: "/assets/images/postRegistration/find.svg",
      text: "Sit tight, the mentors will have one week to accept your request.",
    },
    {
      id: 5,
      imageURL: "/assets/images/postRegistration/connect.svg",
      text: "Connect with your mentor. Make it count!",
    },
  ],
  mentorGuidelines: [
    {
      id: 1,
      imageURL: "/assets/images/postRegistration/email.svg",
      text: "You will recieve an email confirmation of your registration.",
    },
    {
      id: 2,
      imageURL: "/assets/images/postRegistration/people.svg",
      text: "Mentees will find you and send a connection request based on your profile and their goals (Ps: You can mentor upto 3 people at a time)",
    },
    {
      id: 3,
      imageURL: "/assets/images/postRegistration/find.svg",
      text: "You will have 1 week from the time of the request to review and respond. (Ps: Don't leave them hanging)",
    },
    {
      id: 4,
      imageURL: "/assets/images/postRegistration/connect.svg",
      text: "Connect with your mentee. Time to be a sherpa!",
    },
  ],
});
