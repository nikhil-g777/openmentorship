const { AccessToken } = require('twilio').jwt;

const { ChatGrant } = AccessToken;

const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  apiKey: process.env.TWILIO_API_KEY,
  apiSecret: process.env.TWILIO_API_SECRET,
  serviceSid: process.env.TWILIO_SERVICE_SID,
};

const chatGrant = new ChatGrant({
  serviceSid: twilioConfig.serviceSid,
});

const client = require('twilio')(
  twilioConfig.accountSid,
  twilioConfig.authToken,
);

const generateTwilioToken = (identity) => {
  const token = new AccessToken(
    twilioConfig.accountSid,
    twilioConfig.apiKey,
    twilioConfig.apiSecret,
    { identity: identity.toString() },
  );
  token.addGrant(chatGrant);
  console.log(twilioConfig.serviceSid);
  return token.toJwt();
};

const createChatConversation = (menteeId, mentorId) => {
  const result = {
    menteeParticipationId: null,
    mentorParicipationId: null,
    conversationSid: null,
  };

  return new Promise((resolve, reject) => {
    client.conversations
      .services(twilioConfig.serviceSid)
      .conversations.create({ friendlyName: `${mentorId}-${menteeId}` })
      .then((conversation) => {
        result.conversationSid = conversation.sid;
        return client.conversations
          .services(twilioConfig.serviceSid)
          .conversations(result.conversationSid)
          .participants.create({ identity: menteeId.toString() });
      })
      .then((mentee) => {
        result.menteeParticipationId = mentee.sid;
        return client.conversations
          .services(twilioConfig.serviceSid)
          .conversations(result.conversationSid)
          .participants.create({ identity: mentorId.toString() });
      })
      .then((mentor) => {
        result.mentorParicipationId = mentor.sid;
        resolve(result);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
};

module.exports = {
  generateTwilioToken,
  createChatConversation,
};
