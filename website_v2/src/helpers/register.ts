import {Education, WorkExperience} from "@/types/regsiter";
import {Dispatch, SetStateAction} from "react";

// Social links regex patterns
const twitterPattern =
  /^(https?:\/\/)?(www\.)?twitter\.com\/(?!.*(?:admin|twitter))[A-Za-z0-9_]{1,15}(?!.*(?:admin|twitter))$/i;
const mediumPattern =
  /^(https?:\/\/)?(www\.)?medium\.com\/@([A-Za-z0-9_]+)(\/)?$/i;
const behancePattern =
  /^(https?:\/\/)?(www\.)?behance\.net\/(?!.*(projects|collections|following|appreciations|followers))(?!.*\/$)([A-Za-z0-9_]+)\/?$/i;
const githubPattern =
  /^(https?:\/\/)?(www\.)?github\.com\/([A-Za-z0-9_]+)\/?$/i;
const otherPattern =
  /^(https?:\/\/)?(www\.)?([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\/?$/i;

// Post regsitration mentee & mentor guidelines
const menteeGuidelines = [
  {
    id: 1,
    imageURL: "/assets/images/postRegistration/email.svg",
    text: "You will recieve an email confirmation of your registration.",
  },
  {
    id: 2,
    imageURL: "/assets/images/postRegistration/people.svg",
    text: "Explore and find mentors based on your interests and goals.",
  },
  {
    id: 3,
    imageURL: "/assets/images/postRegistration/request.svg",
    text: "Send a request to connect with mentors you like. Be specific about what you are looking for.",
  },
  {
    id: 4,
    imageURL: "/assets/images/postRegistration/find.svg",
    text: "Sit tight, the mentors will have one week to accept your request.",
  },
  {
    id: 5,
    imageURL: "/assets/images/postRegistration/connect.svg",
    text: "Connect with your mentor. Make it count!",
  },
];

const mentorGuidelines = [
  {
    id: 1,
    imageURL: "/assets/images/postRegistration/email.svg",
    text: "You will recieve an email confirmation of your registration.",
  },
  {
    id: 2,
    imageURL: "/assets/images/postRegistration/people.svg",
    text: "Mentees will find you and send a connection request based on your profile and their goals (Ps: You can mentor upto 3 people at a time)",
  },
  {
    id: 3,
    imageURL: "/assets/images/postRegistration/find.svg",
    text: "You will have 1 week from the time of the request to review and respond. (Ps: Don't leave them hanging)",
  },
  {
    id: 4,
    imageURL: "/assets/images/postRegistration/connect.svg",
    text: "Connect with your mentee. Time to be a sherpa!",
  },
];

// Social sites
const socialSites = [
  "twitter",
  "medium",
  "behance",
  "github",
  "portfolio",
  "other",
];

// Screen2 validation
// Check experience and education length
const checkExperiencesEducationLength = (
  experiences: [] | WorkExperience[],
  education: [] | Education[],
  setInputError: Dispatch<
    SetStateAction<{
      experience: string;
      education: string;
    }>
  >
) => {
  if (experiences.length === 0) {
    setInputError({
      experience: "Please add at least one experience",
      education: "",
    });
    return true;
  }
  if (education.length === 0) {
    setInputError({
      experience: "",
      education: "Please add at least one education",
    });
    return true;
  }

  return false;
};

// Check duplicate organization + title and duplicate school + degree
const checkDuplicateCurrentFields = (
  experiences: [] | WorkExperience[],
  education: [] | Education[],
  setInputError: Dispatch<
    SetStateAction<{
      experience: string;
      education: string;
    }>
  >
) => {
  for (const experience of experiences) {
    if (
      experience.organization.toLowerCase() === experience.title.toLowerCase()
    ) {
      setInputError({
        experience: "Organization and title cannot be same",
        education: "",
      });
      return true;
    }
  }

  for (const single of education) {
    if (single.school.toLowerCase() === single.degree.toLowerCase()) {
      setInputError({
        experience: "",
        education: "School and degree cannot be same",
      });
      return true;
    }
  }

  return false;
};

// Check duplicate title and degree
const checkDuplicateTitleDegree = (
  experiences: [] | WorkExperience[],
  education: [] | Education[],
  setInputError: Dispatch<
    SetStateAction<{
      experience: string;
      education: string;
    }>
  >
) => {
  const exp = experiences.map(field => field.title.toLowerCase());
  const edu = education.map(field => field.degree.toLowerCase());
  if (exp.length !== new Set(exp).size) {
    setInputError({experience: "Duplicate title fields found", education: ""});
    return true;
  }
  if (edu.length !== new Set(edu).size) {
    setInputError({experience: "", education: "Duplicate degree fields found"});
    return true;
  }

  return false;
};

// Check if experiences and education fields are filled
const checkExperiencesEducationBothFields = (
  experiences: [] | WorkExperience[],
  education: [] | Education[],
  setInputError: Dispatch<
    SetStateAction<{
      experience: string;
      education: string;
    }>
  >
) => {
  for (const experience of experiences) {
    if (experience.organization === "" || experience.title === "") {
      setInputError({experience: "Please fill all fields", education: ""});
      return true;
    }
  }
  for (const single of education) {
    if (single.school === "" || single.degree === "") {
      setInputError({experience: "", education: "Please fill all fields"});
      return true;
    }
  }

  return false;
};

// Add experience and education
const addExperienceEducation = (
  type: string,
  experiences: [] | WorkExperience[],
  education: [] | Education[],
  setExperiences: (type: [] | WorkExperience[]) => void,
  setEducation: (type: [] | Education[]) => void
) => {
  if (type === "experiences") {
    setExperiences([
      ...experiences,
      {key: crypto.randomUUID(), organization: "", title: ""},
    ]);
  } else {
    setEducation([
      ...education,
      {key: crypto.randomUUID(), school: "", degree: ""},
    ]);
  }
};

// Update experience and education input fields
const updateExperienceEducation = (
  type: string,
  index: number,
  e: React.ChangeEvent<HTMLInputElement>,
  experiences: [] | WorkExperience[],
  education: [] | Education[],
  setExperiences: (type: [] | WorkExperience[]) => void,
  setEducation: (type: [] | Education[]) => void
) => {
  // Update input fields
  if (type === "experiences") {
    if (e.target.name === "organization") {
      experiences[index].organization = e.target.value;
    } else {
      experiences[index].title = e.target.value;
    }
    setExperiences([...experiences]);
  } else {
    if (e.target.name === "school") {
      education[index].school = e.target.value;
    } else {
      education[index].degree = e.target.value;
    }
    setEducation([...education]);
  }
};

// Screen3 validation
// Check if input value is already included
const checkSkillsInterestsDuplicate = (
  type: string,
  skills: string[],
  interests: string[],
  inputValue: string,
  setInputValue: Dispatch<SetStateAction<string>>
) => {
  if (type === "skills") {
    for (const skill of skills) {
      if (skill.toLowerCase() === inputValue.toLowerCase()) {
        setInputValue("");
        return true;
      }
    }
  } else {
    for (const interest of interests) {
      if (interest.toLowerCase() === inputValue.toLowerCase()) {
        setInputValue("");
        return true;
      }
    }
  }

  return false;
};

// Add skills and interests tags
const addSkillsInterests = (
  type: string,
  skills: string[],
  setSkills: (type: string[]) => void,
  interests: string[],
  setInterests: (type: string[]) => void,
  inputValue: string,
  setInputValue: (value: SetStateAction<string>) => void,
  setError: (
    value: SetStateAction<{
      skills: string;
      interests: string;
    }>
  ) => void
) => {
  if (type === "skills") {
    setSkills([...skills, inputValue]);
    setInputValue("");
    setError({skills: "", interests: ""});
  } else {
    setInterests([...interests, inputValue]);
    setInputValue("");
    setError({skills: "", interests: ""});
  }
};

export {
  twitterPattern,
  mediumPattern,
  behancePattern,
  githubPattern,
  otherPattern,
  menteeGuidelines,
  mentorGuidelines,
  socialSites,
  checkExperiencesEducationLength,
  checkDuplicateCurrentFields,
  checkDuplicateTitleDegree,
  checkExperiencesEducationBothFields,
  addExperienceEducation,
  updateExperienceEducation,
  checkSkillsInterestsDuplicate,
  addSkillsInterests,
};
