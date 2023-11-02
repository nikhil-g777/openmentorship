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

const createChatConversation = async (menteeId, mentorId) => {
  const result = {
    menteeParticipationId: null,
    mentorParicipationId: null,
    conversationSid: null,
  };

  try {
    const conversation = await client.conversations
      .services(twilioConfig.serviceSid)
      .conversations.create({ friendlyName: `${mentorId}-${menteeId}` });
    result.conversationSid = conversation.sid;

    const mentee = await client.conversations
      .services(twilioConfig.serviceSid)
      .conversations(result.conversationSid)
      .participants.create({ identity: menteeId.toString() });
    result.menteeParticipationId = mentee.sid;

    const mentor = await client.conversations
      .services(twilioConfig.serviceSid)
      .conversations(result.conversationSid)
      .participants.create({ identity: mentorId.toString() });
    result.mentorParicipationId = mentor.sid;

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  generateTwilioToken,
  createChatConversation,
};
