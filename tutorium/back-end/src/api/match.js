'use strict'
let match = require('../repository/match')

module.exports = (app, passport, options) => {
    app.post('/api/match/request', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let studentID = req.user.studentID
            let userInput = req.body

            match.tutorRequest(studentID, userInput).then(result => {
                if(result.created) {
                    res.status(200).send({
                        success: true,
                        msg: 'Request for a tutor complete'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'You used to send a request to this tutor'
                    })
                }
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should login to request tutor' 
            })
        }
    })

    app.delete('/api/match/request/delete', (req, res, next) => {
        if(req.user && req.user.isTutor) {
            let tutorID = req.user.studentID
            let studentID = req.body.studentID

            match.deleteTutorRequest(tutorID, studentID).then(result => {
                if(result) {
                    res.status(200).send({
                        success: true,
                        msg: 'The request has already been delete'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'There is no row affected'
                    })
                }
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should be a tutor to delete the request' 
            })
        }
    })
}