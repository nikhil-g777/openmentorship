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
    status: string;
    latestSession: {
      status: string;
      _id: string;
      match: string;
      requestMessage: string;
      startDate: string;
      twilioConversationId: string;
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

export type {UserProfile};
