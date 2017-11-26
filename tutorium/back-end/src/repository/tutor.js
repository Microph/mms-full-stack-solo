'use strict'
let Schema = require('./schema')

module.exports = {
    studentSearch: (filter = undefined) => {
        return new Promise((resolve, reject) => {
            if(filter) {
                Schema.Student.findAndCountAll({
                    where: filter
                }).then(result => {
                    resolve(result)
                })
            } else {
                Schema.Student.findAndCountAll().then(result => {
                    resolve(result)
                })
            }
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