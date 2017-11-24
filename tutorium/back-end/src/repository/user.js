'use strict'

let Schema = require('./schema')

function adminAuthen(username, password) {
    return new Promise((resolve, reject) => {
        let passHash = require('crypto')
                        .createHash('sha256')
                        .update(password)
                        .digest("hex")

        Schema.Admin.findOne({
            where: {
                username: username,
                password: passHash
            }
        }).then(result => {
            resolve(result)
        })
    })
}

function findUserByAccountID(accountID, accountType) {
    return new Promise((resolve, reject) => {
        Schema.Account.findOne({
            where: {
                accountID: accountID,
                accountType: accountType
            }
        }).then(result => {
            resolve(result)
        })
    })
}

function register(userInput) {
    return new Promise((resolve, reject) => {
        Schema.Account.findOrCreate({
            where: {
                accountType: userInput.accountType,
                accountID: userInput.accountID
            },
            defaults: {
                accountType: userInput.accountType,
                accountID: userInput.accountID,
                student: [{
                    name: userInput.name,
                    surname: userInput.surname,
                    gender: userInput.gender,
                    educationLevel: userInput.educationLevel,
                    facebookURL: userInput.facebookURL,
                    lineID: userInput.lineID,
                    email: userInput.email,
                    mobile: userInput.mobile    
                }]
            },
            include: [{
                model: Schema.Student,
                as: 'student'
            }]
        }).spread((studentAccount, created) => {
            resolve({
                created: created,
                studentID: studentAccount.dataValues.studentID
            })
        })
    })
}

function updateStudentProfile(studentID, updateData) {
    return new Promise((resolve, reject) => {
        Schema.Student.update({
            name: updateData.name,
            surname: updateData.surname,
            gender: updateData.gender,
            educationLevel: updateData.educationLevel,
            facebookURL: updateData.facebookURL,
            lineID: updateData.lineID,
            email: updateData.email,
            mobile: updateData.mobile
        }, {
            where: {
                studentID: studentID
            }
        }).then((result) => {
            resolve(result[0])
        })
    })
}

module.exports = {
    adminAuthen: adminAuthen,
    findUserByAccountID: findUserByAccountID,
    register: register,
    updateStudentProfile: updateStudentProfile
}
// function adminLogin(username, password) {
//     return new Promise((resolve, reject) => {
        // let passHash = require('crypto')
        //                 .createHash('sha256')
        //                 .update(password)
        //                 .digest("hex")
//         let sql =   "SELECT * " +
//                     "FROM admin " +
//                     "WHERE username = ? " +
//                     "AND password = ?"

//         this.connection.query(sql, [username, passHash], (err, results) => {
//             if(err) {
//                 return reject(new Error('An error occured getting the users: ' + err))
//             }
            
//             if(results.length === 0) {
//                 resolve(undefined)
//             } else {
//                 resolve({
//                     username: results[0]
//                 })
//             }
//         })
//     })
// }

// function findUserByID(id, loginType) {
//     return new Promise((resolve, reject) => {
//         let sql =   "SELECT studentID, isTutor " +
//                     "FROM account " +
//                     "WHERE accountID = ? " +
//                         "AND accountType = ?"

//         this.connection.query(sql, [id, loginType], (err, results) => {
//             if(err) {
//                 return reject(new Error('An error occured getting the users: ' + err))
//             }

//             if(results.length === 0) {
//                 resolve(undefined)
//             } else {
//                 resolve(results[0])
//             }
//         })
//     })
// }

// function register(userInput) {
//     return new Promise((resolve, reject) => {
//         let sql =   "INSERT INTO account (accountType, accountID) " +
//                     "SELECT ?, ? " +
//                     "WHERE NOT EXISTS(SELECT accountType, accountID " +
//                                         "FROM account " +
//                                         "WHERE accountType = ? " +
//                                             "AND accountID = ? )"

//         this.connection.query(sql, [userInput.accountType, userInput.accountID, userInput.accountType, userInput.accountID], (err, result) => {
//             if(err) {
//                 return reject(new Error('An error occured getting the users: ' + err))
//             }
            
//             let createSuccess = result.affectedRows
            
//             if(createSuccess) {
//                 let studentID = result.insertId
//                 let sql =   "INSERT INTO student (studentID, name, surname, gender, educationLevel, facebookURL, lineID, email, mobile) " +
//                             "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"

//                 this.connection.query(sql, [studentID, userInput.name, userInput.surname, userInput.gender, userInput.educationLevel, userInput.facebookURL, userInput.lineID, userInput.email, userInput.mobile]
//                     , (err, result) => {
//                     if(err) {
//                         return reject(new Error('An error occured getting the users: ' + err))
//                     }
        
//                     resolve(studentID)
//                 })
//             } else {
//                 resolve(undefined)
//             }
//         })
//     })
// }