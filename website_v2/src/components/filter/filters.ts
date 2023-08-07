type Filters = {
  label: string;
  text: string;
  id: string;
  key: string;
}[];

// Area of Interest
const areaOfInterest: Filters = [
  {
    label: "Software",
    text: "software",
    id: "filter_interest_software",
    key: "filter_interest_software",
  },
  {
    label: "Design",
    text: "design",
    id: "filter_interest_design",
    key: "filter_interest_design",
  },
];

// Goals
const goals: Filters = [
  {
    label: "Career Advice",
    text: "careerAdvice",
    id: "filter_goals_career_advice",
    key: "filter_goals_career_advice",
  },
  {
    label: "Resume Review",
    text: "resumeReview",
    id: "filter_goals_resume_review",
    key: "filter_goals_resume_review",
  },
  {
    label: "Mock Interview",
    text: "mockInterview",
    id: "filter_goals_mock_interview",
    key: "filter_goals_mock_interview",
  },
  {
    label: "Project Review",
    text: "projectReview",
    id: "filter_goals_project_review",
    key: "filter_goals_project_review",
  },
  {
    label: "Collaboration",
    text: "collaboration",
    id: "filter_goals_collaboration",
    key: "filter_goals_collaboration",
  },
];

// Frequency
const frequency: Filters = [
  {
    label: "Weekly",
    text: "weekly",
    id: "filter_frequency_weekly",
    key: "filter_frequency_weekly",
  },
  {
    label: "Bi-Weekly",
    text: "biweekly",
    id: "filter_frequency_bi_weekly",
    key: "filter_frequency_bi_weekly",
  },
  {
    label: "Once a month",
    text: "onceamonth",
    id: "filter_frequency_once_a_month",
    key: "filter_frequency_once_a_month",
  },
];

// Preferences
const preferences: Filters = [
  {
    label: "Phone Call",
    text: "phone",
    id: "filter_preferences_phone_call",
    key: "filter_preferences_phone_call",
  },
  {
    label: "Video Call",
    text: "video",
    id: "filter_preferences_video_call",
    key: "filter_preferences_video_call",
  },
  {
    label: "Chat",
    text: "chat",
    id: "filter_preferences_chat",
    key: "filter_preferences_chat",
  },
  {
    label: "Message",
    text: "message",
    id: "filter_preferences_message",
    key: "filter_preferences_message",
  },
];

export {areaOfInterest, goals, frequency, preferences};
