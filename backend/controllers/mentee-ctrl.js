const Mentee = require('../models/mentee');

createMentee = (req, res) => {
    const body = req.body

    if(!body) {
        res.status(400).json({ success: false, error: 'request body is empty'})
    }

    const mentee = new Mentee(body)

    if(!movie) {
        res.status(400).json({success: false, error: err})
    }

    mentee
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: mentee._id,
                message: 'Mentee Created'
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                error,
                message: 'Mentee not created'
            })
        })
}

module.exports = {
    createMentee
}