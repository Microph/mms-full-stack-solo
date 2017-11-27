'use strict'
let match = require('../repository/match')

module.exports = (app, passport, options) => {
    app.get('/api/match/request/bystudent', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let studentID = req.user.studentID

            match.getTutorRequestByStudentID(studentID).then(result => {
                if(result.count > 0) {
                    res.status(200).send({ 
                        success: true, 
                        requests: result.rows, 
                        count: result.count
                    })
                } else {
                    res.status(200).send({ 
                        success: false,
                        msg: 'Request not found'
                    })
                }
            })
        } else {
            res.status(403).send({
                success: false,
                msg: 'You should login to get your request'
            })
        }
    })

    app.get('/api/match/request/bytutor', (req, res, next) => {
        if(req.user && req.user.isTutor) {
            let tutorID = req.user.studentID

            match.getTutorRequestByTutorID(tutorID).then(result => {
                if(result.count > 0) {
                    res.status(200).send({ 
                        success: true, 
                        requests: result.rows, 
                        count: result.count
                    })
                } else {
                    res.status(200).send({ 
                        success: false,
                        msg: 'Request not found'
                    })
                }
            })
        } else {
            res.status(403).send({
                success: false,
                msg: 'You should be a tutor to get your request'
            })
        }
    })

    app.get('/api/match/offer/bystudent', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let studentID = req.user.studentID

            match.getOfferByStudentID(studentID).then((result) => {
                if(result.count > 0) {
                    res.status(200).send({ 
                        success: true, 
                        offers: result.rows, 
                        count: result.count
                    })
                } else {
                    res.status(200).send({ 
                        success: false,
                        msg: 'Offer not found'
                    })
                }
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should login to get the offer' 
            })
        }
    })

    app.get('/api/match/offer/bytutor', (req, res, next) => {
        if(req.user && req.user.isTutor) {
            let tutorID = req.user.studentID

            match.getOfferByTutorID(tutorID).then((result) => {
                if(result.count > 0) {
                    res.status(200).send({ 
                        success: true, 
                        offers: result.rows, 
                        count: result.count
                    })
                } else {
                    res.status(200).send({ 
                        success: false,
                        msg: 'Offer not found'
                    })
                }
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should be a tutor to get tutor offer' 
            })
        }
    })

    app.post('/api/match/offer', (req, res, next) => {
        if(req.user && req.user.isTutor) {
            let tutorID = req.user.studentID
            let userInput = req.body

            match.offer(tutorID, userInput).then(result => {
                if(result.created) {
                    res.status(200).send({
                        success: true,
                        msg: 'Offer to a student complete'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'You used to send an offer to this student'
                    })
                }
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should be a tutor to send offer to student' 
            })
        }
    })
    app.post('/api/match/offer/accept', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let studentID = req.user.studentID
            let tutorID = req.body.tutorID

            match.acceptOffer(studentID, tutorID).then(result => {
                if(result) {
                    res.status(200).send({
                        success: true,
                        msg: 'Confirm complete'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'There is no any offers'
                    })
                }
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should be a student to accept course offer' 
            })
        }
    })

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