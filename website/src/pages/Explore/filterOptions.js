const filterOptions = [
  {
    key: "areaInterest",
    values: [
      { id: 101, name: "Software", type: "areaOfInterest", text: "software" },
      { id: 102, name: "Design", type: "areaOfInterest", text: "design" },
    ],
  },
  {
    key: "goals",
    values: [
      { id: 103, name: "Career Advice", type: "goals", text: "careerAdvice" },
      { id: 104, name: "Resume Review", type: "goals", text: "resumeReview" },
      { id: 114, name: "Mock Interview", type: "goals", text: "mockInterview" },
      { id: 105, name: "Project Review", type: "goals", text: "projectReview" },
      { id: 115, name: "Collaboration", type: "goals", text: "collaboration" },
    ],
  },
  {
    key: "frequency",
    values: [
        { id: 108, name: "Weekly", type: "communicationFrequency", text: "weekly" },
        { id: 109, name: "Bi-weekly", type: "communicationFrequency", text: "biweekly" },
        { id: 110, name: "Once a month", type: "communicationFrequency", text: "onceamonth" },
    ]
  },
  {
    key: "prefernces",
    values: [
      { id: 111, name: "phone call", type: "communicationPreferences", text: "phoneCall" },
      { id: 112, name: "video call", type: "communicationPreferences", text: "videoCall" },
      {
        id: 113,
        name: "chat or message",
        type: "communicationPreferences",
        text: "chatOrMessaging",
      },
    ],
  },
];

export default filterOptions;
