'use strict'

let Schema = require('./schema')

function adminDashboard() {

}

function adminSearchTutorRequest() {
    return new Promise((resolve, reject) => {
        Schema.Tutor.findAndCountAll({
            where: {
                isApproved: 0
            },
            include: [{
                model: Schema.Student,
                as: 'student',
                attributes: ['name', 'surname']
            }]
        }).then(result => {
            resolve(result)
        })
    })
}

function adminAcceptTutorRequest(SID) {
    return new Promise((resolve, reject) => {
        Schema.Tutor.update({
            isApproved: 1
        }, {
            where: {
                studentID: SID
            }
        }).then(result => {
            resolve(result[0])
        })
    })
}

function adminDeleteTutorRequest(SID) {
    return new Promise((resolve, reject) => {
        Schema.Tutor.destroy({
            where: {
                studentID: SID
            }
        }).then(result => {
            resolve(result)
        })
    })
}

function adminSearchAllReport() {
    return new Promise((resolve, reject) => {
        Schema.Report.findAndCountAll().then(result => {
            resolve(result)
        })
    })
}

module.exports = {
    adminSearchTutorRequest: adminSearchTutorRequest,
    adminAcceptTutorRequest: adminAcceptTutorRequest,
    adminDeleteTutorRequest:adminDeleteTutorRequest,
    adminSearchAllReport: adminSearchAllReport
}