import {Education, WorkExperience} from "./regsiter";

type UserProfile = {
  success: boolean;
  user: {
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
  };
};

export type {UserProfile};
