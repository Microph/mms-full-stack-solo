'use strict'

let Schema = require('./schema')

function adminSearchTutorRequest() {
    return new Promise((resolve, reject) => {
        Schema.Tutor.findAndCountAll({
            where: {
                isApproved: false
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

module.exports = {
    adminSearchTutorRequest: adminSearchTutorRequest
}