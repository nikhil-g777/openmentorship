// Pages
export const PAGES = {
  HOME: "",
  REGISTER: "register",
  PROFILE: "profile",
  MATCHES: "matches",
  EXPLORE: "explore",
  CONFIRM_USER_REGISTRATION: "confirmUserRegistration",
  CHAT: "chat",
  ADMIN: {
    DASHBOARD: "dashboard",
    SESSIONS: "sessions",
  },
} as const;

// Tabs
export const TABS = {
  MATCHES: {
    ACTIVE: "active",
    PENDING: "pending",
    CLOSED: "closed",
  },
  ADMIN: {
    DASHBOARD: {
      ANALYTICS: "analytics",
      USERS: "users",
    },
    SESSIONS: {
      ACTIVE: "active",
      CLOSED: "closed",
    },
  },
  GUIDELINES: {
    DESKTOP: "",
    MOBILE: "mobile",
  },
} as const;

// User Types
export const USER_TYPE = {
  MENTEE: "mentee",
  MENTOR: "mentor",
  ADMIN: "admin",
} as const;

// Success Alert Messages
export const SUCCESS_ALERT = {
  SIGN_IN: "Successfully signed in!",
  CHAT_CONNECTED: "Connected!",
  REDIRECT_DASHBOARD: "Redirecting you to dashboard...",
  REDIRECT_MATCHES: "Redirecting you to matches...",
  PROFILE_UPDATED: "Profile updated successfully",
  CONFIRM_EMAIL: "Please check your email to confirm your account",
  REGISTRATION_COMPLETED: "Registration completed successfully",
  SESSION_ENDED: "You have ended the session!",
  REQUEST_WITHDRAWN: "Your request has been withdrawn!",
  REQUEST_APPROVED: "You have approved the request!",
  REQUEST_DECLINED: "You have declined the request!",
  REQUEST_SENT: "Your request has been sent!",
  ACCOUNT_APPROVED: "You have approved the account!",
  ACCOUNT_DENIED: "You have denied the account!",
  DISABLE_ACCOUNT: "You have disabled the account!",
  ACCOUNT_SETUP:
    "Tell us more about yourself so we can fully setup your account!",
  REVIEW_SUBMITTED: "Your review has been submitted!",
} as const;

// Error Alert Messages
export const ERROR_ALERT = {
  REDIRECT_HOMEPAGE: "Error getting data! Redirecting you to homepage.",
  NOT_AUHTORIZED:
    "You are not authorized to access this page! Redirecting you to homepage.",
  CHAT_ESTABLISH: "Error establishing chat connection, Try reloading the page",
  SESSION_TIMEOUT:
    "Your sign-in session has timed out. Please refresh the page and try again.",
  NO_ATTACHMENT: "No attachment found!",
  ERROR_SENDING_ATTACHMENT: "Error sending attachment!",
  ERROR_SENDING_MESSAGE: "Error sending message!",
  MEDIA_RESOURCE_FAILED:
    "Media resource failed to load! Try reloading the page.",
  SOMETHING_WRONG: "Something went wrong, please try again later",
  MESSAGE_LENGTH_800: "Message should be less than 800 characters",
  FILE_SIZE_10MB: "File size should be less than 10MB",
  REVIEW_SUBMIT_ERROR: "Error submitting review! Please try again later",
} as const;
