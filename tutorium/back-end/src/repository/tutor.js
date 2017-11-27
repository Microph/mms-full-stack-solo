'use strict'
let Schema = require('./schema')

module.exports = {
    studentSearch: (filter = undefined) => {
        return new Promise((resolve, reject) => {
            if(filter) {
                Schema.Student.findAndCountAll({
                    where: filter,
                    include: [{
                        model: Schema.Account,
                        as: 'account',
                        attributes: ['isTutor']
                    }]
                }).then(result => {
                    resolve(result)
                })
            } else {
                Schema.Student.findAndCountAll({
                    include: [{
                        model: Schema.Account,
                        as: 'account',
                        attributes: ['isTutor']
                    }]
                }).then(result => {
                    resolve(result)
                })
            }
        })
    },
    register: (studentID, userInput) => {
        return new Promise((resolve, reject) => {
            Schema.Tutor.findOrCreate({
                where: {
                    studentID: studentID
                },
                defaults: {
                    studentID: studentID,
                    education: userInput.education,
                    teachList: userInput.teachList,
                    place: userInput.place,
                    time: userInput.time,
                    uploadEvidence: userInput.uploadEvidence,
                    isApproved: false
                }
            }).spread((tutor, created) => {
                resolve({
                    created: created,
                    studentID: tutor.dataValues.studentID
                })
            })
        })
    },
    updateTeachList: (studentID, updateData) => {
        return new Promise((resolve, reject) => {
            Schema.Tutor.update({
                teachList: updateData.teachList
            }, {
                where: {
                    studentID: studentID
                }
            }).then((result) => {
                resolve(result[0])
            })
        })
    },
    updatePlace: (studentID, updateData) => {
        return new Promise((resolve, reject) => {
            Schema.Tutor.update({
                place: updateData.place
            }, {
                where: {
                    studentID: studentID
                }
            }).then((result) => {
                resolve(result[0])
            })
        })
    },
    updateTime: (studentID, updateData) => {
        return new Promise((resolve, reject) => {
            Schema.Tutor.update({
                time: updateData.time
            }, {
                where: {
                    studentID: studentID
                }
            }).then((result) => {
                resolve(result[0])
            })
        })
    }
}