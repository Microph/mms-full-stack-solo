'use strict'
let student = require('../repository/student')

module.exports = (app, passport, options) => {
    app.get('/api/search/tutor', (req, res, next) => {
        let filter = req.query

        if(Object.keys(filter).length === 0) {
            student.tutorSearch().then((result) => {
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
            student.tutorSearch(filter).then((result) => {
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

    app.put('/api/student/profile/update', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let updateData = req.body
            let studentID = req.user.studentID
          
            student.updateProfile(studentID, updateData).then((result) => {
                if(result) {
                    res.status(200).send({
                        success: true,
                        msg: 'Updated Complete'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'Profile hasn\'t been update, please correct your input'
                    })
                }       
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should login before update your profile' 
            })
        }
    })
    
    app.put('/api/student/wantList/update', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let updateData = req.body
            let studentID = req.user.studentID
        
            student.updateWantList(studentID, updateData).then((result) => {
                if(result) {
                    res.status(200).send({
                        success: true,
                        msg: 'Updated Complete'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'Want list hasn\'t been update, please correct your input'
                    })
                }       
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should login before update your want list' 
            })
        }
    })
    
    app.put('/api/student/place/update', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let updateData = req.body
            let studentID = req.user.studentID
    
            student.updatePlace(studentID, updateData).then((result) => {
                if(result) {
                res.status(200).send({
                    success: true,
                    msg: 'Updated Complete'
                })
                } else {
                res.status(400).send({
                    success: false,
                    msg: 'Place hasn\'t been update, please correct your input'
                })
                }       
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should login before update your place' 
            })
        }
    })
    
    app.put('/api/student/time/update', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let updateData = req.body
            let studentID = req.user.studentID
    
            student.updateTime(studentID, updateData).then((result) => {
                if(result) {
                    res.status(200).send({
                        success: true,
                        msg: 'Updated Complete'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'Time hasn\'t been update, please correct your input'
                    })
                }       
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should login before update your place' 
            })
        }
    })
}