'use strict'
let Schema = require('./schema')

module.exports = {
    getOfferByStudentID: (studentID) => {
        return new Promise((resolve, reject) => {
            Schema.Match.findAndCountAll({
                where: {
                    studentID: studentID
                }
            }).then(result => {
                resolve(result)
            })
        })
    },
    getOfferByTutorID: (tutorID) => {
        return new Promise((resolve, reject) => {
            Schema.Match.findAndCountAll({
                where: {
                    tutorID: tutorID
                }
            }).then(result => {
                resolve(result)
            })
        })
    },
    acceptOffer: (studentID, userInput) => {
        return new Promise((resolve, reject) => {
            Schema.Match.update({
                studentConfirm: true
            }, {
                where: {
                    studentID: studentID,
                    tutorID: userInput.tutorID,
                    subject: userInput.subject
                }
            }).then(result => {
                resolve(result[0])
            })
        })
    },
    offer: (tutorID, userInput) => {
        return new Promise((resolve, reject) => {
            Schema.Match.findOrCreate({
                where: {
                    tutorID: tutorID,
                    studentID: userInput.studentID,
                    subject: userInput.subject
                },
                defaults: {
                    tutorID: tutorID,
                    studentID: userInput.studentID,
                    subject: userInput.subject,
                    price: userInput.price,
                    studentConfirm: false
                }
            }).spread((offer, created) => {
                resolve({
                    created: created,
                    offer: offer.dataValues
                })
            })
        })
    },
    getTutorRequestByStudentID: (studentID) => {
        return new Promise((resolve, reject) => {
            Schema.TutorRequest.findAndCountAll({
                where: {
                    studentID: studentID
                }
            }).then(result => {
                resolve(result)
            })
        })
    },
    getTutorRequestByTutorID: (tutorID) => {
        return new Promise((resolve, reject) => {
            Schema.TutorRequest.findAndCountAll({
                where: {
                    tutorID: tutorID
                }
            }).then(result => {
                resolve(result)
            })
        })
    },
    tutorRequest: (studentID, userInput) => {
        return new Promise((resolve, reject) => {
            Schema.TutorRequest.findOrCreate({
                where: {
                    studentID: studentID,
                    tutorID: userInput.tutorID,
                    subject: userInput.subject
                },
                defaults: {
                    studentID: studentID,
                    tutorID: userInput.tutorID,
                    subject: userInput.subject
                }
            }).spread((tutorRequest, created) => {
                resolve({
                    created: created,
                    tutorRequest: tutorRequest.dataValues
                })
            })
        })
    },
    deleteTutorRequest: (tutorID, studentID) => {
        return new Promise((resolve, reject) => {
            Schema.TutorRequest.destroy({
                where: {
                    tutorID: tutorID,
                    studentID: studentID
                }
            }).then(result => {
                resolve(result)
            })
        })
    }
}