// Package Imports

// Local Imports
const Match = require('../models/match');
const Session = require('../models/session');
const User = require('../models/user');

/*
  Get platform statistics like number of mentors, mentees, matches, etc for the admin dashboard
*/
const statistics = async (req, res) => {
  try {
    const menteeCount = await User.count({ userType: 'mentee' });
    const mentorCount = await User.count({ userType: 'mentor' });

    const matchCounts = {
      active: await Match.count({ status: 'active' }),
      pending: await Match.count({ status: 'pending' }),
      closed: await Match.count({ status: 'closed' }),
    };

    return res.json({
      success: true,
      menteeCount,
      mentorCount,
      matchCounts,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Could not process the request',
    });
  }
};

/*
  List of users with pagination and different filters
  Query Params : 
  - page: <int>, page number to fetch
  - limit: <int>, number of records in each query
  - status: <string>, filter by status of the user
  - userType: <string>, filter by type of the user
*/
const userList = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { registrationStatus, userType } = req.query;

    const userFilter = {
      ...(registrationStatus && { registrationStatus }),
      ...(userType && { userType }),
    };
    // execute query with page and limit values
    const users = await User.find(userFilter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // get total documents in the Posts collection
    const count = await User.countDocuments({ userType });

    // return response with posts, total pages, and current page
    return res.json({
      success: true,
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      error: 'Could not process request',
    });
  }
};

/*
  Search for a user based on the search term
  
  TODO : Can improve the search by giving weight to certain

*/
const userSearch = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { searchString } = req.query;

    const users = await User.find({ $text: { $search: searchString } })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // return response with posts, total pages, and current page
    return res.json({
      success: true,
      users,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      error: 'Could not process request',
    });
  }
};

/*
  Fetch user profile with session history
*/
const fetchUserProfile = async (req, res) => {
  try {
    const { userId } = req.query;
    const sessions = [];

    // execute query with page and limit values
    const userProfile = await User.findById(userId).exec();

    const { userType } = userProfile;
    const matches = await Match.find({ [userType]: userId })
      .populate('mentee')
      .populate('mentor');

    for (let i = 0; i < matches.length; i += 1) {
      const match = matches[i];

      // Get associated sessions for each match
      const matchSessions = await Session.find({ match: match._id }) // eslint-disable-line no-await-in-loop
        .populate({
          path: 'match',
          populate: { path: 'mentee mentor' },
        })
        .lean();

      sessions.push(...matchSessions);
    }

    // return response with posts, total pages, and current page
    res.json({
      success: true,
      userProfile,
      sessions,
    });
  } catch (err) {
    console.error(err.message);
  }
};

/*
  List of all sessions with pagination and different filters
  Query Params : 
  - status: <int>, filter by status
*/
const sessionList = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { status } = req.query;

    const sessionFilter = {
      ...(status && { status }),
    };

    const sessions = await Session.find(sessionFilter)
      .populate({
        path: 'match',
        populate: { path: 'mentee mentor' },
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    return res.json({
      success: true,
      sessions,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Could not process request',
    });
  }
};

/*
  search for sessions based on user id / name

  Query Params : 
  - searchString: <str>
*/
const sessionSearch = async (req, res) => {
  try {
    const { page = 1, limit = 20, searchString } = req.query;

    // find based on _id or firstName or lastName
    const sessions = await Session.find({
      $or: [
        { _id: searchString },
        { firstName: searchString },
        { lastName: searchString },
      ],
    })
      .populate({
        path: 'match',
        populate: { path: 'mentee mentor' },
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    return res.json({
      success: true,
      sessions,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Could not process request',
    });
  }
};

/*
  Update status of mentor applications
  request body :  

  {
    mentorId : "",
    registrationStatus: "" // complete, denied, disabled
  }

*/
const updateMentorRegistration = async (req, res) => {
  try {
    const { mentorId, registrationStatus } = req.body;

    const response = await User.findByIdAndUpdate(
      mentorId,
      { registrationStatus },
      { new: true },
    );

    if (response == null) {
      return res.status(404).json({
        success: false,
        error: 'No user found for the given id',
      });
    }

    return res.json({
      success: true,
      mentor: response,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: 'Could not process the request',
    });
  }
};

module.exports = {
  statistics,
  userList,
  userSearch,
  fetchUserProfile,
  sessionList,
  sessionSearch,
  updateMentorRegistration,
};
