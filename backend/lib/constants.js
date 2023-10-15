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
    incomplete: {
      name: 'incomplete',
      loginMessage: 'Login failed, profile registration is not complete'
    },
    pendingConfirmation: {
      name: 'pendingConfirmation',
      loginMessage: 'Login failed, pending user confirmation',
    },
    pendingApproval: {
      name: 'pendingApproval',
      loginMessage: 'Login failed, pending account approval'
    },
    complete: {
      name: 'complete',
      loginMessage: 'Successful'
    },
    denied: {
      name: 'denied',
      loginMessage: 'Login failed, account is denied'
    },
    disabled: {
      name: 'disabled',
      loginMessage: 'Login failed, account is diabled'
    }
  },
  linkedInURL: {
    auth: 'https://www.linkedin.com/',
    api: 'https://api.linkedin.com/',
  },
  linkedInAuthUrlConfig: {
    url: '/oauth/v2/accessToken',
    grantType: 'authorization_code',
    profileUrl: '/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))',
    emailUrl: `/v2/emailAddress?q=members&projection=(elements*(handle~))`,
  }
};
