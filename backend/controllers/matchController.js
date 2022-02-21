/* eslint no-unused-vars: 0 */

const moment = require('moment');

const { createChatConversation } = require('../config/twilio');

const Match = require('../models/match');
const Session = require('../models/session');
const User = require('../models/user');

const constructExploreFilter = (query) => {
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

  if (communicationFrequency) {
    filter.communicationFrequency = communicationFrequency;
  }

  if (communicationPreferences) {
    const preferences = communicationPreferences.split(',');
    console.log(preferences);
    filter.communicationPreferences = { $all: preferences };
  }

  return filter;
};

// Created when there is a request from a mentee
const createMatch = (req, res) => {
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

  const { menteeId, mentorId, requestMessage } = body.match;

  Match.exists({ mentee: menteeId, mentor: mentorId })
    .then((exists) => {
      if (exists) {
        return res
          .status(500)
          .json({ success: false, error: 'Match already exists' });
      }
      return Match.create({
        mentee: menteeId,
        mentor: mentorId,
        requestMessage,
      });
    })
    .then((createdMatch) => {
      return res.status(200).json({
        success: true,
        match: createdMatch,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json({ success: false });
    });
};

const updateMatch = (req, res) => {
  // inputs : matchId

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

  Match.findById(matchId)
    .exec()
    .then((match) => {
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

        createChatConversation(mentee, mentor)
          .then((chatResult) => {
            return Session.create({
              match: match._id,
              requestMessage,
              startDate: moment.utc().toDate().toUTCString(),
              status: 'active',
              twilioConversationSid: chatResult.conversationSid,
            }).then((session) => {
              return Match.findByIdAndUpdate(
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
            });
          })
          .then((updatedMatch) => {
            console.log(updatedMatch);
            return res.status(200).json({
              success: true,
              updatedMatch,
            });
          })
          .catch((e) => {
            console.log(e);
            return res.status(500).json({ success: false });
          });
      } else if (
        (match.status == 'active' || match.status == 'pending') &&
        status == 'closed'
      ) {
        const results = {};
        return Match.findByIdAndUpdate(
          matchId,
          {
            status,
          },
          { new: true },
        )
          .exec()
          .populate('mentor')
          .populate('mentee')
          .populate('latestSession')
          .then((updatedMatch) => {
            results.updatedMatch = updatedMatch;
            return Session.findByIdAndUpdate(updatedMatch.latestSession, {
              status,
              emdDate: moment.utc().toDate().toUTCString(),
            });
          })
          .then((updatedSession) => {
            return res.status(200).json({
              success: true,
              updatedMatch: results.updatedMatch,
            });
          })
          .catch((e) => {
            console.log(e);
            return res.status(500).json({ success: false });
          });
      } else {
        throw new Error('Invalid Request');
      }
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json({ success: false });
    });
};

const userRecommendations = async (req, res) => {
  try {
    // Improve recommendations based on users profile
    const recommendations = await User.find({ userType: 'mentor' }, null, {
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

  if (!page || !limit) {
    return res.status(400).json({
      success: false,
      error: 'page and limit needs to be sent',
    });
  }

  try {
    let results = [];

    const filter = constructExploreFilter(req.query);

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
