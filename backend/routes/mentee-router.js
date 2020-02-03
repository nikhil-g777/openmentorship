const express = require('express')

const MenteeCtrl = require('../controllers/mentee-ctrl')

const router = express.Router()

router.post('/createMentee', MenteeCtrl.createMentee)

module.exports = router