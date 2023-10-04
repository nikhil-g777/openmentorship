module.exports = {
  roles: {
    admin: 'admin',
    mentee: 'mentee',
    mentor: 'mentor',
  },
  matchStatuses: {
    active: 'active',
    pending: 'pending',
    closed: 'closed',
  },
  userTypes: {
    mentee: 'mentee',
    mentor: 'mentor',
  },
  registrationStatus: {
    incomplete: 'incomplete',
    pendingConfirmation: 'pendingConfirmation',
    pendingApproval: 'pendingApproval',
    complete: 'complete',
    denied: 'denied',
    disabled: 'disabled',
  },
  loginMessageByStatus: {
    incomplete: 'Login failed, profile registration is not complete',
    pendingConfirmation: 'Login failed, pending user confirmation',
    pendingApproval: 'Login failed, pending account approval',
    complete: 'complete',
    denied: 'Login failed, account is denied',
    disabled: 'Login failed, account is diabled',
  },
  linkedInURL: {
    auth: 'https://www.linkedin.com/',
    api: 'https://api.linkedin.com/',
  }
};
