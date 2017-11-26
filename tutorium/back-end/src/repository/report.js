'use strict'

let Schema = require('./schema')

function userWriteReport(reporter, reported, reportTopic, reportDetail) {
    return new Promise((resolve, reject) => {
        Schema.Report.create({
            reporterStudentID: reporter,
            reportedDtudentID: reported,
            topic: reportTopic,
            detail: reportDetail
        }).then(result => {
            resolve(result)
        })
    })
}

module.exports = {
    userWriteReport: userWriteReport
}