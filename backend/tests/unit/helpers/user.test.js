require('dotenv').config();
const db = require('../../../db');

const {
  fetchUserToken,
  sendRegistrationMail,
  getLinkedInProfile,
  handleUserRegistration,
} = require('../../../helpers/user');

// FetchUserToken tests
describe('fetchUserToken tests', () => {
  // Close connection after test
  afterAll(() => {
    db.close();
  });

  // should be a function
  test('should be a function', () => {
    expect(typeof fetchUserToken).toBe('function');
  });

  // check if user is provided
  test('check if user is provided', () => {
    expect(() => {
      fetchUserToken().toThrow('User not provided');
    });
  });

  // wrong argument type
  test('wrong argument type', () => {
    expect(() => {
      fetchUserToken(123).toThrow('User not provided');
    });
  });

  // successful token fetch
  test('successful token fetch', async () => {
    const user = {
      _id:
        process.env.JEST_ACCOUNT_TYPE === 'mentee'
          ? process.env.JEST_MENTEE_ID
          : process.env.JEST_MENTOR_ID,
    };
    const token = await fetchUserToken(user);
    expect(typeof token).toBe('object');
    expect(token.token).toBeDefined();
    expect(token.token).not.toBeNull();
  });
});

// SendRegistrationMail tests
describe('sendRegistrationMail tests', () => {
  // Close connection after test
  afterAll(() => {
    db.close();
  });

  // should be a function
  test('should be a function', () => {
    expect(typeof sendRegistrationMail).toBe('function');
  });

  // No user provided
  test('No user provided', () => {
    expect(() => {
      sendRegistrationMail().toThrow('User not provided');
    });
  });

  // Invalid user type
  test('Invalid user type', () => {
    expect(() => {
      sendRegistrationMail(123).toThrow('User not provided');
    });
  });

  // User _id not defined
  test('User _id not defined', () => {
    expect(() => {
      sendRegistrationMail({}).toThrow('User not provided');
    });
  });

  // Invalid userType
  test('Invalid userType', () => {
    expect(() => {
      sendRegistrationMail({ _id: 'abc123', userType: 'abc123' }).toThrow(
        'Invalid user type for sending registration mail',
      );
    });
  });

  // Unsuccessful response (email not provided)
  test('Unsuccessful response (email not provided)', async () => {
    const user = {
      _id:
        process.env.JEST_ACCOUNT_TYPE === 'mentee'
          ? process.env.JEST_MENTEE_ID
          : process.env.JEST_MENTOR_ID,
      userType: process.env.JEST_ACCOUNT_TYPE,
      firstName: 'Jest',
      lastName: 'Test',
    };
    const response = await sendRegistrationMail(user);
    expect(response.success).toBe(false);
    expect(response.response).toBe(null);
  });

  // Successful response
  test('Successful response', async () => {
    const user = {
      _id:
        process.env.JEST_ACCOUNT_TYPE === 'mentee'
          ? process.env.JEST_MENTEE_ID
          : process.env.JEST_MENTOR_ID,
      userType: process.env.JEST_ACCOUNT_TYPE,
      firstName: 'Jest',
      lastName: 'Test',
      email: process.env.JEST_EMAIL,
    };
    const response = await sendRegistrationMail(user);
    expect(response.success).toBe(false);
    expect(response.response).toBe(null);
  });
});

// getLinkedInProfile tests
describe('getLinkedInProfile tests', () => {
  // Close connection after test
  afterAll(() => {
    db.close();
  });

  // should be a function
  test('should be a function', () => {
    expect(typeof getLinkedInProfile).toBe('function');
  });

  // No authCode provided
  test('authCode not provided', () => {
    expect(() => {
      getLinkedInProfile().toThrow('authCode is missing');
    });
  });

  // Error getting linkedInProfile
  test('Error getting linkedInProfile', () => {
    expect(() => {
      getLinkedInProfile('abc123').toThrow('Error in getLinkedInProfile');
    });
  });

  // TODO: add successful linkedInProfile response
});

// handleUserRegistration tests
// TODO: add tests for handleUserRegistration
describe('handleUserRegistration tests', () => {
  // Close connection after test
  afterAll(() => {
    db.close();
  });

  // should be a function
  test('should be a function', () => {
    expect(typeof handleUserRegistration).toBe('function');
  });

  // No 'linkedInSignup' type provided in body
  test('No linkedInSignup type provided in body', async () => {
});

  // No 'authCode' provided in body
  test('No authCode provided in body', async () => {});
});
