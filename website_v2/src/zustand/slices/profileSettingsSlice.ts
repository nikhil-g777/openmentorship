import {StateCreator} from "zustand";

export type ProfileSettingsSlice = {
  isProfilePage: boolean;
  setisProfilePage: (isProfilePage: boolean) => void;
  profileImage: {
    [key: string]: string;
  };
  setProfileImage: (profileImage: {[key: string]: string}) => void;
  headlineError: string;
  setHeadlineError: (headlineError: string) => void;
  bioError: string;
  setBioError: (bioError: string) => void;
  areasOfInterestError: string;
  setAreasOfInterestError: (areasOfInterestError: string) => void;
  experienceError: {experience: string; education: string};
  setExperienceError: (experienceError: {
    experience: string;
    education: string;
  }) => void;
  skillsInterestsError: {skills: string; interests: string};
  setSkillsInterestsError: (skillsInterestsError: {
    skills: string;
    interests: string;
  }) => void;
  mentorshipErrors: {
    goals: string;
    frequency: string;
    preferences: string;
  };
  setMentorshipErrors: (mentorshipErrors: {
    goals: string;
    frequency: string;
    preferences: string;
  }) => void;
};

const initialState = {
  isProfilePage: false,
  profileImage: {},
  headlineError: "",
  bioError: "",
  areasOfInterestError: "",
  experienceError: {experience: "", education: ""},
  skillsInterestsError: {skills: "", interests: ""},
  mentorshipErrors: {
    goals: "",
    frequency: "",
    preferences: "",
  },
};

export const profileSettingsSlice: StateCreator<
  ProfileSettingsSlice,
  [],
  [],
  ProfileSettingsSlice
> = set => ({
  ...initialState,
  //   Actions
  setisProfilePage: (isProfilePage: boolean) => {
    set(() => ({
      isProfilePage: isProfilePage,
    }));
  },
  setProfileImage: (profileImage: {[key: string]: string}) => {
    set(() => ({
      profileImage: profileImage,
    }));
  },
  setHeadlineError: (headlineError: string) => {
    set(() => ({
      headlineError: headlineError,
    }));
  },
  setBioError: (bioError: string) => {
    set(() => ({
      bioError: bioError,
    }));
  },
  setAreasOfInterestError: (areasOfInterestError: string) => {
    set(() => ({
      areasOfInterestError: areasOfInterestError,
    }));
  },
  setExperienceError: (experienceError: {
    experience: string;
    education: string;
  }) => {
    set(() => ({
      experienceError: experienceError,
    }));
  },
  setSkillsInterestsError: (skillsInterestsError: {
    skills: string;
    interests: string;
  }) => {
    set(() => ({
      skillsInterestsError: skillsInterestsError,
    }));
  },
  setMentorshipErrors: (mentorshipErrors: {
    goals: string;
    frequency: string;
    preferences: string;
  }) => {
    set(() => ({
      mentorshipErrors: mentorshipErrors,
    }));
  },
});
