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
