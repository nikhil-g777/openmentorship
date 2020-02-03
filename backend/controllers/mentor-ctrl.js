const Mentor = require('../models/mentor')

createMentor = (req, res) => {
    const body = req.body

    if(!body) {
        res.status(400).json({success: false, error: 'request body is empty'})
    }

    const mentor = new Mentor(body)

    if(!mentor) {
        res.status(400).json({success: false, error: err})
    }

    mentor
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: mentor._id,
                message: 'Mentor created'
            })
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                error,
                message: 'Mentor not created'
            })
        })
}

module.exports = {
    createMentor
}

