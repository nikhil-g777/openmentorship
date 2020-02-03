const express = require('express')

const MentorCtrl = require('../controllers/mentor-ctrl')

const router = express.Router()

router.post('/createMentor', MentorCtrl.createMentor)

module.exports = router