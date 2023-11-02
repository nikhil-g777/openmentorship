/* eslint no-unused-vars: 0 */

const moment = require('moment');

const { createChatConversation } = require('../config/twilio');

const Match = require('../models/match');
const Session = require('../models/session');
const User = require('../models/user');
const constants = require('../lib/constants');
const config = require('../config/config');
const { getActiveMentorIds } = require('../helpers/matches');
const { sendMail } = require('../lib/mailer');

const constructExploreFilter = (query, mentorIds) => {
  const {
    areasOfInterest,
    goals,
    communicationFrequency,
    communicationPreferences,
  } = query;

  const filter = { userType: 'mentor' };
  if (areasOfInterest && areasOfInterest.length > 0) {
    areasOfInterest.split(',').forEach((val) => {
      filter[`areasOfInterest.${val}`] = true;
    });
  }

  if (goals && goals.length > 0) {
    goals.split(',').forEach((val) => {
      filter[`goals.${val}`] = true;
    });
  }

  if (communicationFrequency && communicationFrequency.length > 0) {
    const frequencies = communicationFrequency.split(',');
    filter.communicationFrequency = { $in: frequencies };
  }

  if (communicationPreferences && communicationPreferences.length > 0) {
    const preferences = communicationPreferences.split(',');
    console.log(preferences);
    filter.communicationPreferences = { $in: preferences };
  }

  // Mentor Ids
  filter._id = { $nin: mentorIds };

  return filter;
};

// Created when there is a request from a mentee
const createMatch = async (req, res) => {
  // inputs : menteeId, mentorId

  const { body } = req;

  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: 'request body is empty' });
  }

  if (!body.match) {
    return res.status(400).json({
      success: false,
      error: 'request body does not have match object',
    });
  }

  try {
    const { menteeId, mentorId, requestMessage } = body.match;

    // Check if there is an existing match.
    const existingMatch = await Match.findOne({
      mentee: menteeId,
      mentor: mentorId,
    });
    if (existingMatch) {
      return res
        .status(500)
        .json({ success: false, error: 'Match already exists' });
    }

    // Create a new match.
    const createdMatch = await Match.create({
      mentee: menteeId,
      mentor: mentorId,
      requestMessage,
      status: constants.matchStatuses.pending,
    });

    const match = await Match.findById(createdMatch._id).populate({
      path: 'mentor',
      select: 'email',
    });
    // Send connection_request email to mentor.
    await sendMail(
      match.mentor.email,
      'Openmentorship: New Mentee Request',
      {},
      config.sendgrid.templates.connection_request,
    );

    return res.status(200).json({
      success: true,
      match,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { body } = req;

    if (!body) {
      return res
        .status(400)
        .json({ success: false, error: 'request body is empty' });
    }

    const { matchId, status } = body;

    if (!matchId || !status) {
      return res.status(400).json({
        success: false,
        error: 'request body does not have the required parameters',
      });
    }

    const match = await Match.findById(matchId).exec();
    const { mentee, mentor } = match;

    if (
      (match.status == 'pending' || match.status == 'closed') &&
      status === 'active'
    ) {
      let requestMessage = '';
      if (match.status == 'closed') {
        // reconnecting
        requestMessage = body.requestMessage;
      } else {
        requestMessage = match.requestMessage;
      }

      const chatResult = await createChatConversation(mentee, mentor);
      const session = await Session.create({
        match: match._id,
        requestMessage,
        startDate: moment.utc().toDate().toUTCString(),
        status: 'active',
        twilioConversationSid: chatResult.conversationSid,
      });

      const updatedMatch = await Match.findByIdAndUpdate(
        matchId,
        {
          status,
          latestSession: session._id,
          requestMessage,
        },
        { new: true },
      )
        .populate('mentor')
        .populate('mentee')
        .populate('latestSession')
        .exec();

      console.log(updatedMatch);
      return res.status(200).json({
        success: true,
        updatedMatch,
      });
    }
    if (
      (match.status == 'active' || match.status == 'pending') &&
      status == 'closed'
    ) {
      const updatedMatch = await Match.findByIdAndUpdate(
        matchId,
        {
          status,
        },
        { new: true },
      )
        .populate('mentor')
        .populate('mentee')
        .populate('latestSession')
        .exec();

      await Session.findByIdAndUpdate(updatedMatch.latestSession, {
        status,
        emdDate: moment.utc().toDate().toUTCString(),
      });

      return res.status(200).json({
        success: true,
        updatedMatch,
      });
    }
    throw new Error('Invalid Request');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
};

const userRecommendations = async (req, res) => {
  const { _id } = req.user;

  try {
    // Get mentors Ids & filter
    const mentorIds = await getActiveMentorIds(_id);
    const filter = {
      userType: constants.userTypes.mentor,
      _id: { $nin: mentorIds },
    };

    // Improve recommendations based on users profile
    const recommendations = await User.find(filter, null, {
      limit: 10,
    });

    return res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: 'Could not process request',
    });
  }
};

const searchMentors = async (req, res) => {
  const { page, limit } = req.query;
  const { _id } = req.user;

  if (!page || !limit) {
    return res.status(400).json({
      success: false,
      error: 'page and limit needs to be sent',
    });
  }

  try {
    let results = [];

    // Get mentors Ids
    const mentorIds = await getActiveMentorIds(_id);

    // filter
    const filter = constructExploreFilter(req.query, mentorIds);

    results = await User.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // get total documents in the Posts collection
    const count = await User.countDocuments(filter);

    return res.status(200).json({
      success: true,
      mentors: results,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: 'Could not process request',
    });
  }
};

module.exports = {
  createMatch,
  updateMatch,
  searchMentors,
  userRecommendations,
};
