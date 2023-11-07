require('dotenv').config();
const client = require('twilio');

const { AccessToken } = client.jwt;

const { ChatGrant } = AccessToken;
const {
  twilioConfig,
  generateTwilioToken,
  createChatConversation,
} = require('../../../config/twilio');

describe('twilioConfig test', () => {
  test('should have a valid accountSid', () => {
    expect(twilioConfig.accountSid).toBeTruthy();
  });

  test('should have a valid authToken', () => {
    expect(twilioConfig.authToken).toBeTruthy();
  });

  test('should have a valid apiKey', () => {
    expect(twilioConfig.apiKey).toBeTruthy();
  });

  test('should have a valid apiSecret', () => {
    expect(twilioConfig.apiSecret).toBeTruthy();
  });

  test('should have a valid serviceSid', () => {
    expect(twilioConfig.serviceSid).toBeTruthy();
  });

  test('should contain all the keys', () => {
    const keys = Object.keys(twilioConfig);
    const expectedKeys = [
      'accountSid',
      'authToken',
      'apiKey',
      'apiSecret',
      'serviceSid',
    ];
    expect(keys).toEqual(expectedKeys);
  });

  test('should have all the required keys value', () => {
    expect(twilioConfig).toEqual({
      accountSid: expect.any(String),
      authToken: expect.any(String),
      apiKey: expect.any(String),
      apiSecret: expect.any(String),
      serviceSid: expect.any(String),
    });
  });
});

// Chat Grant
describe('ChatGrant instantiation', () => {
  test('should create a new ChatGrant with the correct serviceSid', () => {
    const chatGrant = new ChatGrant({
      serviceSid: twilioConfig.serviceSid,
    });

    expect(chatGrant).toBeInstanceOf(ChatGrant);
    expect(chatGrant.serviceSid).toBe(twilioConfig.serviceSid);
  });
});

// Generate Twilio Token
describe('generateTwilioToken function', () => {
  test('should be a function', () => {
    expect(typeof generateTwilioToken).toBe('function');
  });

  test('should return a string', () => {
    const token1 = generateTwilioToken(1);
    expect(typeof token1).toBe('string');
    const token2 = generateTwilioToken('abc');
    expect(typeof token2).toBe('string');
  });

  test('should return a error if no identity is passed', () => {
    expect(() => generateTwilioToken()).toThrow();
  });
});

// Create Chat Conversation
describe('createChatConversation function', () => {
  test('should be a function', () => {
    expect(typeof createChatConversation).toBe('function');
  });

  test('should return a promise', () => {
    const promise = createChatConversation(1, 2);
    expect(promise).toBeInstanceOf(Promise);
  });

  test('should return a error if no identity is passed', () => {
    expect(() => createChatConversation()).toThrow();
  });
});
