import {
  Education,
  SocialLinks,
  UserConfirmation,
  WorkExperience,
} from "@/types/regsiter";
import {CommonSlice} from "@/zustand/slices/commonSlice";
import {Dispatch, SetStateAction} from "react";

// Social links regex patterns
const linkedInPattern =
  /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/i;
const twitterPattern =
  /^(https?:\/\/)?(www\.)?twitter\.com\/(?!.*(?:admin|twitter))[A-Za-z0-9_]{1,15}(?!.*(?:admin|twitter))$/i;
const mediumPattern =
  /^(https?:\/\/)?(www\.)?medium\.com\/@([A-Za-z0-9_]+)(\/)?$/i;
const behancePattern =
  /^(https?:\/\/)?(www\.)?behance\.net\/(?!.*(projects|collections|following|appreciations|followers))(?!.*\/$)([A-Za-z0-9_]+)\/?$/i;
const githubPattern =
  /^(https?:\/\/)?(www\.)?github\.com\/([A-Za-z0-9_]+)\/?$/i;
const otherPattern =
  /^(https?:\/\/)?(www\.)?([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\/?(.*)$/i;

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

// Goals list
const goalsList = [
  {
    id: 1,
    name: "careerAdvice",
    title: "Career Advice",
  },
  {
    id: 2,
    name: "resumeReview",
    title: "Resume Review",
  },
  {
    id: 3,
    name: "mockInterview",
    title: "Mock Interview",
  },
  {
    id: 4,
    name: "projectReview",
    title: "Project Review",
  },
  {
    id: 5,
    name: "collaboration",
    title: "Collaboration on an idea",
  },
  {
    id: 6,
    name: "businessAdvice",
    title: "Business Advice",
  },
  {
    id: 7,
    name: "careerChangeAdvice",
    title: "Career Change Advice",
  },
  {
    id: 8,
    name: "skillDevelopment",
    title: "Skill Development",
  },
];

// Communication preferences list
const communicationPreferencesList = ["phone", "video", "chat", "message"];

// Communication frequency list
const communicationFrequencyList = [
  {
    id: 1,
    value: "weekly",
    title: "Weekly",
  },
  {
    id: 2,
    value: "biweekly",
    title: "Bi-Weekly",
  },
  {
    id: 3,
    value: "onceamonth",
    title: "Once a Month",
  },
  {
    id: 4,
    value: "nopreference",
    title: "No Preference",
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
  setInputError: (experienceError: {
    experience: string;
    education: string;
  }) => void | Dispatch<
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
  setInputError: (experienceError: {
    experience: string;
    education: string;
  }) => void | Dispatch<
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
const checkDuplicateExperienceEducation = (
  experiences: [] | WorkExperience[],
  education: [] | Education[],
  setInputError: (experienceError: {
    experience: string;
    education: string;
  }) => void | Dispatch<
    SetStateAction<{
      experience: string;
      education: string;
    }>
  >
) => {
  // Duplicate Experience
  const uniqueExperience = new Set();
  for (const experience of experiences) {
    const combination = `${experience.title.toLowerCase()}-${experience.organization.toLowerCase()}`;

    if (uniqueExperience.has(combination)) {
      setInputError({
        experience: "Duplicate experience fields found",
        education: "",
      });
      return true;
    }

    uniqueExperience.add(combination);
  }

  // Duplicate Education
  const uniqueEducation = new Set();
  for (const edu of education) {
    const combination = `${edu.degree.toLowerCase()}-${edu.school.toLowerCase()}`;

    if (uniqueEducation.has(combination)) {
      setInputError({
        experience: "",
        education: "Duplicate education fields found",
      });
      return true;
    }

    uniqueEducation.add(combination);
  }

  return false;
};

// Check if experiences and education fields are filled
const checkExperiencesEducationBothFields = (
  experiences: [] | WorkExperience[],
  education: [] | Education[],
  setInputError: (experienceError: {
    experience: string;
    education: string;
  }) => void | Dispatch<
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
  setError: (skillsInterestsError: {
    skills: string;
    interests: string;
  }) => void | React.Dispatch<
    React.SetStateAction<{skills: string; interests: string}>
  >
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

// Step4 validation
// Check goals is empty
const checkGoalsIsEmpty = (
  goals: {
    [key: string]: boolean;
  },
  setError: (mentorshipErrors: {
    goals: string;
    frequency: string;
    preferences: string;
  }) => void | Dispatch<
    SetStateAction<{
      goals: string;
      frequency: string;
      preferences: string;
    }>
  >
) => {
  if (Object.keys(goals).length === 0) {
    setError({
      goals: "Please select at least one goal",
      frequency: "",
      preferences: "",
    });
    return true;
  }

  return false;
};

// Check communication frequency is empty
const checkCommunicationFrequencyIsEmpty = (
  communicationFrequency: string,
  setError: (mentorshipErrors: {
    goals: string;
    frequency: string;
    preferences: string;
  }) => void | Dispatch<
    SetStateAction<{
      goals: string;
      frequency: string;
      preferences: string;
    }>
  >
) => {
  if (communicationFrequency === "") {
    setError({
      frequency: "Please select a frequency",
      preferences: "",
      goals: "",
    });
    return true;
  }

  return false;
};

// Check communication preferences is empty
const checkCommunicationPreferencesIsEmpty = (
  communicationPreferences: string[],
  setError: (mentorshipErrors: {
    goals: string;
    frequency: string;
    preferences: string;
  }) => void | Dispatch<
    SetStateAction<{
      goals: string;
      frequency: string;
      preferences: string;
    }>
  >
) => {
  if (communicationPreferences.length === 0) {
    setError({
      preferences: "Please select at least one preference",
      goals: "",
      frequency: "",
    });
    return true;
  }

  return false;
};

// Step5 validation
// Atleast one social link is required
const checkAtleastOneSocialLinkProvided = (
  socialLinks: SocialLinks,
  error: SocialLinks,
  setError:
    | ((value: SetStateAction<SocialLinks>) => void)
    | ((socialLinksErrors: SocialLinks) => void)
) => {
  if (
    socialLinks &&
    socialLinks.twitter === "" &&
    socialLinks.medium === "" &&
    socialLinks.behance === "" &&
    socialLinks.github === "" &&
    socialLinks.portfolio === "" &&
    socialLinks.other === ""
  ) {
    setError({
      ...error,
      other: "Atleast one link is required",
    });
    return true;
  }

  return false;
};

// Validate social links with regex
const validateSocialLinks = (
  socialLinks: SocialLinks,
  error: SocialLinks,
  setError:
    | ((value: SetStateAction<SocialLinks>) => void)
    | ((socialLinksErrors: SocialLinks) => void)
) => {
  if (socialLinks.twitter.length && !twitterPattern.test(socialLinks.twitter)) {
    setError({...error, twitter: "Invalid twitter url"});
    return true;
  }
  if (socialLinks.medium.length && !mediumPattern.test(socialLinks.medium)) {
    setError({...error, medium: "Invalid medium url"});
    return true;
  }
  if (socialLinks.behance.length && !behancePattern.test(socialLinks.behance)) {
    setError({...error, behance: "Invalid behance url"});
    return true;
  }
  if (socialLinks.github.length && !githubPattern.test(socialLinks.github)) {
    setError({...error, github: "Invalid github url"});
    return true;
  }
  if (
    socialLinks.portfolio.length &&
    !otherPattern.test(socialLinks.portfolio)
  ) {
    setError({...error, portfolio: "Invalid portfolio url"});
    return true;
  }
  if (socialLinks.other.length && !otherPattern.test(socialLinks.other)) {
    setError({...error, other: "Invalid url"});
    return true;
  }

  return false;
};

// Handle User Confirmation
const handleUserConfirmation = (
  data: UserConfirmation,
  setUserConfirmation: (data: CommonSlice["userConfirmation"]) => void
) => {
  // Missing confirmation token
  if (!data.success && data.err === "Missing confirmation token") {
    setUserConfirmation({
      heading: "Oops!",
      subHeading: "Missing Confirmation Token",
      message:
        "Sorry, we cannot confirm your email address as the confirmation token is missing. Please check your inbox for an email from us containing the confirmation token. If it's not there, please contact our support team for assistance.",
    });
  }

  // Invalid confirmation token
  else if (!data.success && data.err === "Invalid Token") {
    setUserConfirmation({
      heading: "Oops!",
      subHeading: "Invalid Confirmation Token",
      message:
        "Sorry, we cannot confirm your email address as the confirmation token is invalid. Please check your inbox for an email from us containing the confirmation token. If it's not there, please contact our support team for assistance.",
    });
  }

  // Invalid user
  else if (!data.success && data.err === "Invalid User") {
    setUserConfirmation({
      heading: "Oops!",
      subHeading: "Invalid User",
      message:
        "Sorry, we cannot confirm your email address as the user is invalid. Please check your inbox for an email from us containing the confirmation token. If it's not there, please contact our support team for assistance.",
    });
  }

  // Invalid user type
  else if (!data.success && data.err === "Invalid user type") {
    setUserConfirmation({
      heading: "Oops!",
      subHeading: "Invalid User Type",
      message:
        "Sorry, we cannot confirm your email address as the user type is invalid. Please check your inbox for an email from us containing the confirmation token. If it's not there, please contact our support team for assistance.",
    });
  }

  // Registration successful
  else if (data.success && data.msg === "Registration Confirmed") {
    setUserConfirmation({
      heading: "Congratulations!",
      subHeading: "Registration Confirmed",
      message:
        "Congratulations! Your email address has been confirmed. You can now login to your account.",
    });
  }

  // Confirmation failed
  else {
    setUserConfirmation({
      heading: "Oops!",
      subHeading: "Confirmation Failed",
      message: "Sorry, we cannot confirm your email address at this time.",
    });
  }
};

export {
  linkedInPattern,
  twitterPattern,
  mediumPattern,
  behancePattern,
  githubPattern,
  otherPattern,
  menteeGuidelines,
  mentorGuidelines,
  goalsList,
  communicationFrequencyList,
  communicationPreferencesList,
  socialSites,
  checkExperiencesEducationLength,
  checkDuplicateCurrentFields,
  checkDuplicateExperienceEducation,
  checkExperiencesEducationBothFields,
  addExperienceEducation,
  updateExperienceEducation,
  checkSkillsInterestsDuplicate,
  addSkillsInterests,
  checkGoalsIsEmpty,
  checkCommunicationFrequencyIsEmpty,
  checkCommunicationPreferencesIsEmpty,
  checkAtleastOneSocialLinkProvided,
  validateSocialLinks,
  handleUserConfirmation,
};
