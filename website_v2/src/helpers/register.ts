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

const socialSites = [
  "twitter",
  "medium",
  "behance",
  "github",
  "portfolio",
  "other",
];

export {
  twitterPattern,
  mediumPattern,
  behancePattern,
  githubPattern,
  otherPattern,
  menteeGuidelines,
  mentorGuidelines,
  socialSites,
};
