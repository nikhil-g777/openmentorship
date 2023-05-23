export type Explore = {
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
  WorkExperiences: {
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
    [key: string]: boolean;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  socialLinks: {
    [key: string]: string;
  };
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
}[];
