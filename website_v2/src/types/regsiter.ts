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

export type {WorkExperience, Education, CurrentType};
