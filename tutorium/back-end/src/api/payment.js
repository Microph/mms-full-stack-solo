'use strict'

module.exports = (app, passport, options) => {
    app.post('/api/payment/card/add', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let payment = require('../repository/payment')
            let studentID = req.user.studentID
            let userInput = req.body

            payment.addCard(studentID, userInput).then((result) => {
                if(result.created) {
                    res.status(200).send({
                        success: true,
                        msg: 'Add Credit Card Complete'
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        msg: 'Credit Card had already added'
                    })
                }
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should login before add your credit card' 
            })
        }
    })

    app.put('/api/payment/card/update', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let payment = require('../repository/payment')
            let studentID = req.user.studentID
            let updateData = req.body

            payment.updateCard(studentID, updateData).then((result) => {
                if(result) {
                    res.status(200).send({
                        success: true,
                        msg: 'Update Credit Card Complete'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'Credit card hasn\'t been update, please correct your input'
                    })
                }
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should login before update your credit card' 
            })
        }
    })

    app.delete('/api/payment/card/delete', (req, res, next) => {
        if(req.user && req.user.studentID) {
            let payment = require('../repository/payment')
            let studentID = req.user.studentID
            let cardNO = req.body.cardNO

            payment.deleteCard(studentID, cardNO).then((result) => {
                if(result) {
                    res.status(200).send({
                        success: true,
                        msg: 'Delete Credit Card Complete'
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'Credit card hasn\'t been delete, please correct your input'
                    })
                }
            })
        } else {
            res.status(403).send({ 
                success: false, 
                msg: 'You should login before update your credit card' 
            })
        }
    })
}