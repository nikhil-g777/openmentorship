const config = require('./config');

describe('config test', () => {
  test('should be an object', () => {
    expect(typeof config).toBe('object');
  });

  test('should have a sendgrid property', () => {
    expect(config).toHaveProperty('sendgrid');
  });

  test('should have a sendgrid.templates property', () => {
    expect(config.sendgrid).toHaveProperty('templates');
  });

  test('should have correct sendgrid templates keys', () => {
    const expectedTemplates = [
      'mentee_signup',
      'mentor_signup',
      'connection_request',
    ];
    expect(Object.keys(config.sendgrid.templates)).toEqual(expectedTemplates);
  });
});
