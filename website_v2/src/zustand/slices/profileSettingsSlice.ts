import {StateCreator} from "zustand";

// Types
export type ProfileSettingsSlice = {
  // States
  // Main
  isProfilePage: boolean;
  profileImage: {
    [key: string]: string;
  };
  linkedInUrlError: string;
  headlineError: string;
  bioError: string;
  loading: boolean;
  isEditable: boolean;
  // Step1
  areasOfInterestError: string;
  // Step2
  experienceError: {experience: string; education: string};
  // Step3
  skillsInterestsError: {skills: string; interests: string};
  // Step4
  mentorshipErrors: {
    goals: string;
    frequency: string;
    preferences: string;
  };
  // Step5
  socialLinksErrors: {
    twitter: string;
    medium: string;
    behance: string;
    github: string;
    portfolio: string;
    other: string;
  };

  // Actions
  // Main
  setisProfilePage: (isProfilePage: boolean) => void;
  setProfileImage: (profileImage: {[key: string]: string}) => void;
  setLinkedInUrlError: (linkedInURLError: string) => void;
  setHeadlineError: (headlineError: string) => void;
  setBioError: (bioError: string) => void;
  setLoading: (loading: boolean) => void;
  setIsEditable: (isEditable: boolean) => void;
  // Step1
  setAreasOfInterestError: (areasOfInterestError: string) => void;
  // Step2
  setExperienceError: (experienceError: {
    experience: string;
    education: string;
  }) => void;
  // Step3
  setSkillsInterestsError: (skillsInterestsError: {
    skills: string;
    interests: string;
  }) => void;
  // Step4
  setMentorshipErrors: (mentorshipErrors: {
    goals: string;
    frequency: string;
    preferences: string;
  }) => void;
  // Step5
  setSocialLinksErrors: (socialLinksErrors: {
    twitter: string;
    medium: string;
    behance: string;
    github: string;
    portfolio: string;
    other: string;
  }) => void;
};

// Initial state
const initialState = {
  // Main
  isProfilePage: false,
  profileImage: {},
  linkedInUrlError: "",
  headlineError: "",
  bioError: "",
  loading: false,
  isEditable: false,
  // Step1
  areasOfInterestError: "",
  // Step2
  experienceError: {experience: "", education: ""},
  // Step3
  skillsInterestsError: {skills: "", interests: ""},
  // Step4
  mentorshipErrors: {
    goals: "",
    frequency: "",
    preferences: "",
  },
  // Step5
  socialLinksErrors: {
    twitter: "",
    medium: "",
    behance: "",
    github: "",
    portfolio: "",
    other: "",
  },
};

export const profileSettingsSlice: StateCreator<
  ProfileSettingsSlice,
  [],
  [],
  ProfileSettingsSlice
> = set => ({
  ...initialState,
  // Actions
  // Main
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
  setLinkedInUrlError: (linkedInUrlError: string) => {
    set(() => ({
      linkedInUrlError: linkedInUrlError,
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
  setLoading: (loading: boolean) => {
    set(() => ({
      loading: loading,
    }));
  },
  setIsEditable: (isEditable: boolean) => {
    set(() => ({
      isEditable: isEditable,
    }));
  },
  // Step1
  setAreasOfInterestError: (areasOfInterestError: string) => {
    set(() => ({
      areasOfInterestError: areasOfInterestError,
    }));
  },
  // Step2
  setExperienceError: (experienceError: {
    experience: string;
    education: string;
  }) => {
    set(() => ({
      experienceError: experienceError,
    }));
  },
  // Step3
  setSkillsInterestsError: (skillsInterestsError: {
    skills: string;
    interests: string;
  }) => {
    set(() => ({
      skillsInterestsError: skillsInterestsError,
    }));
  },
  // Step4
  setMentorshipErrors: (mentorshipErrors: {
    goals: string;
    frequency: string;
    preferences: string;
  }) => {
    set(() => ({
      mentorshipErrors: mentorshipErrors,
    }));
  },
  // Step5
  setSocialLinksErrors: (socialLinksErrors: {
    twitter: string;
    medium: string;
    behance: string;
    github: string;
    portfolio: string;
    other: string;
  }) => {
    set(() => ({
      socialLinksErrors: socialLinksErrors,
    }));
  },
});
