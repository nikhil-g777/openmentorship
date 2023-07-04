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

export type {
  WorkExperience,
  Education,
  CurrentType,
  CommunicationPreferences,
  SocialLinks,
  RegisterBody,
};