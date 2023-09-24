// Confirmation Prompts
export const CONFIRMATION_PROMPTS = {
  END_SESSION: "Are you sure that you would like to end the session?",
  DECLINE_REQUEST: "Are you sure that you would like to decline the request?",
  WITHDRAW_REQUEST: "Are you sure you want to withdraw your request?",
  APPROVE_REQUEST: "Are you sure you want to approve this request?",
  APPROVE_ACCOUNT: "Are you sure you want to approve this account?",
  DENY_ACCOUNT: "Are you sure you want to deny this account?",
  DISABLE_ACCOUNT: "Are you sure you want to disable this account?",
  ENABLE_ACCOUNT: "Are you sure you want to enable this account?",
} as const;

// Statuses
export const STATUS = {
  ALL: {
    label: "All",
    value: "",
  },
  COMPLETE: {
    label: "Complete",
    value: "complete",
  },
  INCOMPLETE: {
    label: "Incomplete",
    value: "incomplete",
  },
  DENIED: {
    label: "Denied",
    value: "denied",
  },
  DISABLED: {
    label: "Disabled",
    value: "disabled",
  },
  PENDING_CONFIRMATION: {
    label: "Pending Confirmation",
    value: "pendingConfirmation",
  },
  PENDING_APPROVAL: {
    label: "Pending Approval",
    value: "pendingApproval",
  },
} as const;

// User Types
export const USER_TYPE = {
  MENTEE: {
    label: "Mentee",
    value: "mentee",
  },
  MENTOR: {
    label: "Mentor",
    value: "mentor",
  },
} as const;
