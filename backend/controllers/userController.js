const _ = require('lodash');

const User = require('../models/user');
const Match = require('../models/match');


registerUser = (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({ success: false, error: 'request body is empty'});
    }

    if(!body.user) {
        return res.status(400).json({ success: false, error: 'request body does not have user object'});
    }


    User.findOneAndUpdate({linkedInId: body.user.linkedInId}, body.user, {upsert: true, new: true}, function(err, user) {
        if (err) res.status(500).json({ success: false, error: 'register user failed'});
        console.log(user);
        return res.status(200).json({
            success: true,
            _id: user['_id'],
            linkedInId: user.linkedInId,
            message: 'User Registered'
        })

    });
}

updateUser = (req, res) => {

    console.log('Got update user request');
    _id = req.params._id

    const body = req.body

    if(!body) {
        return res.status(400).json({ success: false, error: 'request body is empty'});
    }

    if(!body.user) {
        return res.status(400).json({ success: false, error: 'request body does not have user object'});
    }

    User.findByIdAndUpdate(_id, body.user, {new: true}, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, error: err});
        } else if (!user) {
            return res.status(404).json({ success: false, error: 'user not found'})
        }
        
        return res.status(200).json({
            success: true,
            message: 'User Updated',
            user: user
        })

    });
}

userInfo = (req, res) => {

    console.log('Got user info request');
    let _id = req.params._id

    if(!_id) {
        return res.status(400).json({ success: false, error: 'id not sent'});
    }


    User.findById(_id, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, error: err});
        } else if (!user) {
            return res.status(404).json({ success: false, error: 'user not found'})
        }
        
        return res.status(200).json({
            success: true,
            user: user
        })

    });
}

matches = (req, res) => {

    console.log('Got user matches request');
    let _id = req.params._id

    if(!_id) {
        return res.status(400).json({ success: false, error: '_id not sent'});
    }


    User.findByIdAndUpdate(_id)
        .exec(function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, error: err});
        } else if (!user) {
            return res.status(404).json({ success: false, error: 'user not found'});
        }

        let userType = user.userType;

        findQuery = {}
        if(user.userType == 'mentee') {
            findQuery.menteeId = _id;
        } else if (user.userType == 'mentor') {
            findQuery.mentorId = _id;
        } else {
            return res.status(404).json({ success: false, error: 'user type in invalid'});      
        }

        Match.find(findQuery)
            .populate('mentorId')
            .populate('menteeId')
            .exec(function(err, matches) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ success: false, error: err});
                } 

                result = {pending: [], active: [], closed: []};
                _.forEach(matches, function(match) {
                    switch(userType) {
                        case 'mentor':
                            result[match.status].push(match.menteeId);
                            break;
                        case 'mentee':
                            result[match.status].push(match.mentorId);
                            break;
                        default:
                            console.log('Invalid user type');
                    }
                })

                return res.status(200).json({
                    success: true,
                    matches: result
                })
            })
    });
}

module.exports = {
    registerUser,
    updateUser,
    userInfo,
    matches
}