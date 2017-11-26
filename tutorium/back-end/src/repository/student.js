'use strict'
let Schema = require('./schema')

module.exports = {
    tutorSearch: (filter = undefined) => {
        return new Promise((resolve, reject) => {
            if(filter) {
                Schema.Tutor.findAndCountAll({
                    where: filter,
                    include: [{
                        model: Schema.Student,
                        as: 'student',
                        attributes: ['name', 'surname', 'gender']
                    }]
                }).then(result => {
                    resolve(result)
                })
            } else {
                Schema.Tutor.findAndCountAll({
                    include: [{
                        model: Schema.Student,
                        as: 'student',
                        attributes: ['name', 'surname', 'gender']
                    }]
                }).then(result => {
                    resolve(result)
                })
            }
        })
    },
    updateProfile: (studentID, updateData) => {
        return new Promise((resolve, reject) => {
            Schema.Student.update({
                name: updateData.name,
                surname: updateData.surname,
                gender: updateData.gender,
                educationLevel: updateData.educationLevel,
                facebookURL: updateData.facebookURL,
                lineID: updateData.lineID,
                email: updateData.email,
                mobile: updateData.mobile
            }, {
                where: {
                    studentID: studentID
                }
            }).then((result) => {
                resolve(result[0])
            })
        })
    },
    updateWantList: (studentID, updateData) => {
        return new Promise((resolve, reject) => {
            Schema.Student.update({
                wantList: updateData.wantList
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
            Schema.Student.update({
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
            Schema.Student.update({
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