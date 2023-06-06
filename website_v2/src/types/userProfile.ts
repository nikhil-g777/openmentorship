type profileDetails = {
  role: string;
  profileImageUrls: {
    [size: string]: string;
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
  WorkExperiences: object[];
  goals: {[key: string]: boolean};
  createdAt: string;
  updatedAt: string;
  __v: number;
  socialLinks: {[key: string]: string};
  userType: string;
  communicationFrequency: string;
  areasOfInterest: {[key: string]: boolean};
  education: object[];
  email: string;
  experiences: object[];
  careerStatus: string;
  bio: string;
  headline: string;
};

export type {profileDetails};
