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
    experiences: {[key: string]: string}[];
    education: {[key: string]: string}[];
    goals: {
      careerAdvice: boolean;
      skillDevelopment: boolean;
    };
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
  };
};

export type {UserProfile};
