import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

type WorkExperience = {
  key?: string;
  organization: string;
  title: string;
};

type Education = {
  key?: string;
  school: string;
  degree: string;
};

type CurrentType = {
  _id?: string;
  key?: string;
  organization?: string;
  school?: string;
  title?: string;
  degree?: string;
};

type CommunicationPreferences = string[];

type SocialLinks = {
  twitter: string;
  medium: string;
  behance: string;
  github: string;
  portfolio: string;
  other: string;
};

type RegisterBody = {
  type?: string;
  _id?: string;
  register?: boolean;
  user?: {
    linkedInProfileUrl?: string;
    active?: boolean;
    headline?: string;
    bio?: string;
    userType?: string;
    careerStatus?: string;
    areasOfInterest?: {
      software: boolean;
      design: boolean;
      other: boolean;
    };
    experiences?: WorkExperience[];
    education?: Education[];
    skills?: string[];
    interests?: string[];
    goals?: {[key: string]: boolean};
    communicationFrequency?: string;
    communicationPreferences?: CommunicationPreferences;
    socialLinks?: {
      twitter: string;
      medium: string;
      behance: string;
      github: string;
      portfolio: string;
      other: string;
    };
    registrationStatus?: string;
  };
};

type UserConfirmation = {
  success: boolean;
  err: string;
  msg: string;
};

type HandleUserRegistration = {
  user: {
    success: boolean;
    newUser: boolean;
    errorCode: string;
    messsage: string;
    registrationStatus: string;
    token: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      linkedInId: string;
      email: string;
    };
  };
  setSuccessAlert: (message: string, duration: number) => void;
  setToken: (token: string) => void;
  setUserId: (userId: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  router: AppRouterInstance;
};

export type {
  WorkExperience,
  Education,
  CurrentType,
  CommunicationPreferences,
  SocialLinks,
  RegisterBody,
  UserConfirmation,
  HandleUserRegistration,
};
