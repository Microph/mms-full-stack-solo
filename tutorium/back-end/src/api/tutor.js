'use strict'
let tutor = require('../repository/tutor')

module.exports = (app, passport, options) => {
    app.get('/api/search/student', (req, res, next) => {
        if(req.user && req.user.isTutor){
            let filter = req.query

            if(Object.keys(filter).length === 0) {
                tutor.studentSearch().then(result => {
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
                tutor.studentSearch(filter).then(result => {
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
                msg: 'You should be a tutor to searching' 
            })
        }
    })

    app.post('/api/tutor/register', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let userInput = req.body
            let studentID = req.user.studentID

            tutor.register(studentID, userInput).then(result => {
                if(result.studentID) {
                    if(result.created) {
                      res.status(200).send({
                        success: true,
                        msg: 'Register complete'
                      })
                    } else {
                      res.status(200).send({
                        success: true,
                        msg: 'Account is already register'
                      })
                    }
                  } else {
                    res.status(400).send({
                      success: false,
                      msg: 'Registration incomplete' 
                    })
                  }
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should be a student, or login first' 
            })
        }
    })

    app.put('/api/tutor/teachList/update', (req, res, next) => {
        if(req.user && req.user.isTutor) {
            let updateData = req.body
            let studentID = req.user.studentID
        
            tutor.updateTeachList(studentID, updateData).then((result) => {
                if(result) {
                    res.status(200).send({
                        success: true,
                        msg: 'Updated Complete'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'Teacn list hasn\'t been update, please correct your input'
                    })
                }       
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should be a tutor to update your teach list' 
            })
        }
    })
    
    app.put('/api/tutor/place/update', (req, res, next) => {
        if(req.user && req.user.isTutor) {
            let updateData = req.body
            let studentID = req.user.studentID
    
            tutor.updatePlace(studentID, updateData).then((result) => {
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
                msg: 'You should be a tutor to update your place' 
            })
        }
    })
    
    app.put('/api/tutor/time/update', (req, res, next) => {
        if(req.user && req.user.isTutor) {
            let updateData = req.body
            let studentID = req.user.studentID
    
            tutor.updateTime(studentID, updateData).then((result) => {
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
                msg: 'You should be a tutor to update your place' 
            })
        }
    })
}