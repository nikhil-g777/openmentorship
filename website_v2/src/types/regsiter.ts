type WorkExperience = {
  _id: string;
  organization: string;
  title: string;
};

type Education = {
  _id: string;
  school: string;
  degree: string;
};

type CurrentType = {
  _id: string;
  organization?: string;
  school?: string;
  title?: string;
  degree?: string;
};

type CommunicationPreferences = {
  phone?: string;
  video?: string;
  chat?: string;
  message?: string;
}[];

export type {WorkExperience, Education, CurrentType, CommunicationPreferences};
