const express = require('express');
const User = require('../models/user');


registerUser = (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({ success: false, error: 'request body is empty'});
    }

    if(!body.user) {
        return res.status(400).json({ success: false, error: 'request body does not have user object'});
    }

    User.findOneAndUpdate({linkedInId: body.user.linkedInId}, body.user, {upsert: true}, function(err, user) {
        if (err) res.status(500).json({ success: false, error: 'register user failed'});
        
        return res.status(200).json({
            success: true,
            // id: user['_id'],
            linkedInId: user.linkedInId,
            message: 'User Registered'
        })

    });

    // mentee
    //     .save()
    //     .then(() => {
    //         return res.status(201).json({
    //             success: true,
    //             id: mentee._id,
    //             message: 'Mentee Created'
    //         })
    //     })
    //     .catch(error => {
    //         return res.status(400).json({
    //             success: false,
    //             error,
    //             message: 'Mentee not created'
    //         })
    //     });
}

updateUser = (req, res) => {

    console.log('Got update user request');

    const body = req.body

    if(!body) {
        return res.status(400).json({ success: false, error: 'request body is empty'});
    }

    if(!body.linkedInId) {
        return res.status(400).json({ success: false, error: 'request body does not have linkedInId'});
    }

    if(!body.user) {
        return res.status(400).json({ success: false, error: 'request body does not have user object'});
    }

    User.findOneAndUpdate({linkedInId: body.user.linkedInId}, body.user, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, error: err});
        }
        
        return res.status(200).json({
            success: true,
            message: 'User Updated'
        })

    });
}


module.exports = {
    registerUser,
    updateUser
}