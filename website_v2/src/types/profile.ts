import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Education, WorkExperience} from "./regsiter";

type User = {
  role: string;
  profileImageUrls: {
    [key: string]: string;
  };
  skills: string[];
  interests: string[];
  communicationPreferences: string[];
  active: boolean;
  registrationStatus: string;
  _id: string;
  firstName: string;
  lastName: string;
  linkedInId: string;
  linkedInProfileUrl: string;
  email: string;
  experiences: WorkExperience[];
  education: Education[];
  goals: {[key: string]: boolean};
  createdAt: string;
  updatedAt: string;
  __v: number;
  communicationFrequency: string;
  areasOfInterest: {
    software: boolean;
    design: boolean;
    other: boolean;
  };
  careerStatus: string;
  userType: string;
  bio: string;
  headline: string;
  socialLinks: {
    twitter: string;
    medium: string;
    behance: string;
    github: string;
    portfolio: string;
    other: string;
  };
  matches: {
    // Matches
    _id: string;
    initialMessage: string;
    requestMessage?: string;
    status: string;
    latestSession: {
      status: string;
      _id: string;
      match: string;
      requestMessage: string;
      startDate: string;
      twilioConversationSid: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
};

type UserProfile = {
  success?: boolean;
  user: User;
};

// Button args type
type buttonArgs = {
  currentPage: string;
  currentTab: string;
  userType: string;
};

// Profile Confirmation Action Type
type PerformConfirmationAction = {
  currentPage: string;
  confirmationButtonText: string;
  setConfirmationText: (text: string) => void;
  setLoading: (loading: boolean) => void;
  chatId: string;
  token: string;
  setSuccessAlert: (text: string, time: number) => void;
  setErrorAlert: (text: string, time: number) => void;
  router: AppRouterInstance;
};

// Profile action type
type PerformProfileAction = {
  currentPage: string;
  currentTab: string;
  router: AppRouterInstance;
  chatId?: string;
  buttonText?: string;
  secondaryButtonText?: string;
  setLoading: (type: boolean) => void;
  token: string;
  isProfileModal?: boolean;
  setIsProfileModal?: (type: boolean) => void;
  message?: string;
  setMessage?: (message: string) => void;
  menteeId?: string;
  mentorId?: string;
  confirmationText?: string;
  setConfirmationText?: (confirmationText: string) => void;
  setSuccessAlert?: (successAlert: string, time: number) => void;
  setErrorAlert?: (errorAlert: string, time: number) => void;
  requestMessage?: string;
};

export type {
  UserProfile,
  buttonArgs,
  PerformConfirmationAction,
  PerformProfileAction,
};
