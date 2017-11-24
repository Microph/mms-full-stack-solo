//  matching.js
//
//  Defines the users api. Add to a server by calling:
//  require('./matching')
'use strict'

//  Only export - adds the API to the app with the given options.
module.exports = (app, passport, options) => {
    app.get('/api/search/student', (req, res, next) => {
        if(req.user){
            let matching = require('../repository/matching')
            let filter = req.query

            if(Object.keys(filter).length === 0) {
                matching.studentSearch().then((result) => {
                    if(result.count > 0) {
                        res.status(200).send({ 
                            success: true, 
                            students: result.rows, 
                            count: result.count 
                        })
                    } else {
                        res.status(200).send({ 
                            success: false,
                            msg: 'Student not found'
                        })
                    }
                })
            } else {
                matching.studentSearch(filter).then((result) => {
                    if(result.count > 0) {
                        res.status(200).send({ 
                            success: true, 
                            students: result.rows, 
                            count: result.count 
                        })
                    } else {
                        res.status(200).send({ 
                            success: false, 
                            msg: 'Student not found'
                        })
                    }
                })
            }
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should login before searching' 
            })
        }
    })

    app.get('/api/search/tutor', (req, res, next) => {
        let matching = require('../repository/matching')
        let filter = req.query

        if(Object.keys(filter).length === 0) {
            matching.tutorSearch().then((result) => {
                if(result.count > 0) {
                    res.status(200).send({ 
                        success: true, 
                        tutors: result.rows, 
                        count: result.count
                    })
                } else {
                    res.status(200).send({ 
                        success: false,
                        msg: 'Tutor not found'
                    })
                }
            })
        } else {
            matching.tutorSearch(filter).then((result) => {
                console.log(result)
                if(result.count > 0) {
                    res.status(200).send({ 
                        success: true, 
                        tutors: result.rows, 
                        count: result.count
                    })
                } else {
                    res.status(200).send({ 
                        success: false,
                        msg: 'Tutor not found'
                    })
                }
            })
        }
    })
}