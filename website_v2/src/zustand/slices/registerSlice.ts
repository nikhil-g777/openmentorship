import {Education, WorkExperience} from "@/types/regsiter";
import {StateCreator} from "zustand";

export type RegisterSlice = {
  token: string;
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
};

export const registerSlice: StateCreator<
  RegisterSlice,
  [],
  [],
  RegisterSlice
> = set => ({
  token: "",
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
});
