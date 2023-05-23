type Filters = {
  label: string;
  id: string;
  key: string;
}[];

// Area of Interest
const areaOfInterest: Filters = [
  {
    label: "Software",
    id: "filter_interest_software",
    key: "filter_interest_software",
  },
  {
    label: "Design",
    id: "filter_interest_design",
    key: "filter_interest_design",
  },
];

// Goals
const goals: Filters = [
  {
    label: "Career Advice",
    id: "filter_goals_career_advice",
    key: "filter_goals_career_advice",
  },
  {
    label: "Resume Review",
    id: "filter_goals_resume_review",
    key: "filter_goals_resume_review",
  },
  {
    label: "Mock Interview",
    id: "filter_goals_mock_interview",
    key: "filter_goals_mock_interview",
  },
  {
    label: "Project Review",
    id: "filter_goals_project_review",
    key: "filter_goals_project_review",
  },
  {
    label: "Collaboration",
    id: "filter_goals_collaboration",
    key: "filter_goals_collaboration",
  },
];

// Frequency
const frequency: Filters = [
  {
    label: "Weekly",
    id: "filter_frequency_weekly",
    key: "filter_frequency_weekly",
  },
  {
    label: "Bi-Weekly",
    id: "filter_frequency_bi_weekly",
    key: "filter_frequency_bi_weekly",
  },
  {
    label: "Once a month",
    id: "filter_frequency_once_a_month",
    key: "filter_frequency_once_a_month",
  },
];

// Preferences
const preferences: Filters = [
  {
    label: "Phone Call",
    id: "filter_preferences_phone_call",
    key: "filter_preferences_phone_call",
  },
  {
    label: "Video Call",
    id: "filter_preferences_video_call",
    key: "filter_preferences_video_call",
  },
  {
    label: "Chat or Message",
    id: "filter_preferences_chat_or_message",
    key: "filter_preferences_chat_or_message",
  },
];

export { areaOfInterest, goals, frequency, preferences };
