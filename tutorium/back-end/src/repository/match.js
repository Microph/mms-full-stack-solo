'use strict'
let Schema = require('./schema')

module.exports = {
    tutorOffer: (tutorID, studentID, userInput) => {
        return new Promise((resolve, reject) => {
            Schema.Match.findOrCreate({
                where: {
                    tutorID: tutorID,
                    studentID: studentID
                }
            })
        })
    },    
    tutorRequest: (studentID, userInput) => {
        return new Promise((resolve, reject) => {
            Schema.TutorRequest.findOrCreate({
                where: {
                    studentID: studentID,
                    tutorID: userInput.tutorID
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