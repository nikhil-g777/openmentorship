require('dotenv').config();
const fs = require('fs');
const {
  headerTokenExtractor,
  options,
  verify,
} = require('./passportJWT');

const PUBLIC_KEY = fs.readFileSync(`${__dirname}/../keys/public.pem`);

// Header token extractor
describe('header token extractor', () => {
  test('return null if no authorization header', () => {
    const req = {
      headers: {},
    };
    expect(headerTokenExtractor(req)).toBe(null);
  });

  test('return null if authorization header is not Bearer', () => {
    const req = {
      headers: {
        authorization: 'Basic abc123',
      },
    };
    expect(headerTokenExtractor(req)).toBe(null);
  });

  test('return token if authorization header is Bearer', () => {
    const req = {
      headers: {
        authorization: 'Bearer abc123',
      },
    };
    expect(headerTokenExtractor(req)).toBe('abc123');
  });
});

// Options object
describe('Options object', () => {
  let currentOptions;

  // Reset currentOptions before each test for fresh instance
  beforeEach(() => {
    currentOptions = {
      secretOrKey: PUBLIC_KEY,
      jwtFromRequest: headerTokenExtractor,
      algorithms: 'RS256',
    };
  });

  describe('secretOrKey property', () => {
    test('should be equal to PUBLIC_KEY', () => {
      expect(currentOptions.secretOrKey).toEqual(options.secretOrKey);
    });
  });

  describe('jwtFromRequest property', () => {
    test('equal to headerTokenExtractor', () => {
      expect(currentOptions.jwtFromRequest).toEqual(options.jwtFromRequest);
    });
  });

  describe('algorithms property', () => {
    test('equal to RS256', () => {
      expect(currentOptions.algorithms).toEqual(options.algorithms);
    });
  });
});

// Verify function
const User = require('../models/user');

jest.mock('../models/User');

describe('Verify function', () => {
  test('return user if user exists', async () => {
    const mockUser = { _id: '123', name: 'Test User' };
    User.findById.mockResolvedValue(mockUser);

    const payload = { _id: '123' };
    const done = jest.fn();

    await verify(payload, done);

    expect(done).toHaveBeenCalledWith(null, mockUser);
  });

  test('return false on user not exist', async () => {
    User.findById.mockResolvedValue(null);

    const payload = { _id: '123' };
    const done = jest.fn();

    await verify(payload, done);

    expect(done).toHaveBeenCalledWith(null, false);
  });

  test('return error on database error', () => {
    const mockError = new Error('Database error');
    User.findById.mockRejectedValue(mockError);

    const payload = { _id: '123' };
    const done = jest.fn();

    verify(payload, done).catch((err) => {
      expect(err).toEqual(mockError);
    });
  });
});
