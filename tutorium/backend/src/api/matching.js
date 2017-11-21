//  matching.js
//
//  Defines the users api. Add to a server by calling:
//  require('./matching')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, passport, options) => {
    app.get('/api/search/student', (req, res, next) => {
        if(req.user){
            let filters = req.query

            if(Object.keys(filters).length === 0) {
                options.repository.searchForStudent().then((students) => {
                    res.status(200).send({ success: true, students: students, count: students.length })
                })
            } else {
                options.repository.searchForStudent(filters).then((students) => {
                    res.status(200).send({ success: true, students: students, count: students.length})
                })
            }

        } else {
            res.status(403).send({ success: false, msg: 'You should login before searching' })
        }
    })

    app.get('/api/search/tutor', (req, res, next) => {
        let filters = req.query

        if(Object.keys(filters).length === 0) {
            options.repository.searchForTutor().then((students) => {
                res.status(200).send({ success: true, students: students, count: students.length })
            })
        } else {
            options.repository.searchForTutor(filters).then((students) => {
                res.status(200).send({ success: true, students: students, count: students.length})
            })
        }
    })
}