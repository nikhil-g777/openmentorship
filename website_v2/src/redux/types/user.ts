export type UserLogin = {
  message: string;
  success: boolean;
  token: string;
};

export type UserInfo = {
  success: true;
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
    workExperiences: {
      currentlyWorking: boolean;
      _id: string;
      company: string;
      location: {
        city: string;
        state: string;
        country: string;
      };
      industry: string;
      startDate: string;
      endDate: string;
    }[];
    goals: {
      careerAdvice: boolean;
      resumeReview: boolean;
      collaboration: boolean;
      businessAdvice: boolean;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
    userType: string;
    communicationFrequency: string;
    areasOfInterest: {
      [key: string]: boolean;
    };
    education: {
      _id: string;
      school: string;
      degree: string;
    }[];
    email: string;
    experiences: {
      _id: string;
      organization: string;
      title: string;
    }[];
    careerStatus: string;
    bio: string;
    headline: string;
  };
};

export type UpdateUser = {
  type: string;
  user: {
    role: string;
    skills: string[];
    interests: string[];
    communicationPreferences: string[];
    active: boolean;
    registrationStatus: string;
    _id: string;
    firstName: string;
    lastName: string;
    linkedInId: string;
    goals: {
      careerAdvice: boolean;
      resumeReview: boolean;
    };
    socialLinks: {
      [key: string]: string;
    };
    userType: string;
    communicationFrequency: string | null;
    areasOfInterest: {
      [key: string]: boolean;
    };
    education: {
      _id: string;
      school: string;
      degree: string;
    }[];
    email: string;
    experiences: {
      _id: string;
      organization: string;
      title: string;
    }[];
    careerStatus: string;
  };
};
