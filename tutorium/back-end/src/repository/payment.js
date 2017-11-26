'use strict'

let Schema = require('./schema')

module.exports = {
    getCard: (studentID) => {
        return new Promise((resolve, reject) => {
            Schema.CreditCard.findAndCountAll({
                attributes: [
                    'studentID',
                    'cardNO',
                    'cardHolder',
                    'CVV',
                    'expireMonth',
                    'expireYear'
                ],
                where: {
                    studentID: studentID
                }
            }).then(result => {
                resolve(result)
            })
        })
    },
    addCard: (studentID, userInput) => {
        return new Promise((resolve, reject) => {
            Schema.CreditCard.findOrCreate({
                where: {
                    studentID: studentID,
                    cardNO: userInput.cardNO
                },
                defaults: {
                    studentID: studentID,
                    cardNO: userInput.cardNO,
                    cardHolder: userInput.cardHolder,
                    CVV: userInput.CVV,
                    expireMonth: userInput.expireMonth,
                    expireYear: userInput.expireYear
                }
            }).spread((card, created) => {
                resolve({
                    created: created,
                    card: card.dataValues
                })
            })
        })
    },
    updateCard: (studentID, updateData) => {
        return new Promise((resolve, reject) => {
            Schema.CreditCard.update({
                cardNO: updateData.cardNO,
                cardHolder: updateData.cardHolder,
                CVV: updateData.CVV,
                expireMonth: updateData.expireMonth,
                expireYear: updateData.expireYear
            }, {
                where: {
                    studentID: studentID,
                    cardNO: updateData.cardNO
                }
            }).then(result => {
                resolve(result[0])
            })

        })
    },
    deleteCard: (studentID, cardNO) => {
        return new Promise((resolve, reject) => {
            Schema.CreditCard.destroy({
                where: {
                    studentID: studentID,
                    cardNO: cardNO
                }
            }).then(result => {
                resolve(result)
            })
        })
    }
}