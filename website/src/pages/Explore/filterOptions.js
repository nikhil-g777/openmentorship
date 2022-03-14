const filterOptions = {
  areaInterest: [
    { id: 101, name: "Software", type: "areaOfInterest", text: "software" },
    { id: 102, name: "Design", type: "areaOfInterest", text: "design" },
  ],
  goals: [
    { id: 103, name: "Career Advice", type: "goals", text: "careerAdvice" },
    { id: 104, name: "Resume Review", type: "goals", text: "resumeReview" },
    { id: 114, name: "Mock Interview", type: "goals", text: "mockInterview" },
    { id: 105, name: "Project Review", type: "goals", text: "projectReview" },
    { id: 115, name: "Collaboration", type: "goals", text: "collaboration" },
    {
      id: 115,
      name: "Business Advice ",
      type: "goals",
      text: "businessAdvice",
    },
    {
      id: 107,
      name: "Skill ",
      type: "goals",
      text: "skillDevelopment",
    },
  ],
  frequency: [
    { id: 108, name: "Weekly", type: "frequency", text: "weekly" },
    { id: 109, name: "Bi-weekly", type: "frequency", text: "biweekly" },
    { id: 110, name: "Once a month", type: "frequency", text: "onceamonth" },
  ],
  prefernces: [
    { id: 111, name: "phone call", type: "prefernces", text: "phoneCall" },
    { id: 112, name: "video call", type: "prefernces", text: "videoCall" },
    {
      id: 113,
      name: "chat or message",
      type: "prefernces",
      text: "chatOrMessaging",
    },
  ],
};

export default filterOptions;
