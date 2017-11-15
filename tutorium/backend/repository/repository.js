//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

var mysql = require('mysql');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connectionSettings) {
    this.connectionSettings = connectionSettings;
    this.connection = mysql.createConnection(this.connectionSettings);
  }

  findUserByID(id, loginType) {
    return new Promise((resolve, reject) => {
      var sql = "SELECT account_studentID FROM account WHERE accountID = ? AND accountType = ?"

      this.connection.query(sql, [id, loginType], (err, results) => {
        if(err) {
          return reject(new Error('An error occured getting the users: ' + err));
        }

        if(results.length === 0) {
          resolve(undefined);
        } else {
          resolve({
            studentID: results[0].account_studentID,
          });
        }
      })
    });
  }

  register(userInput) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO account (accountType, accountID) VALUES(?, ?)";
      this.connection.query(sql, [userInput.accountType, userInput.accountID], (err, results) => {
        if(err) {
          return reject(new Error('An error occured getting the users: ' + err));
        }
        
        let studentID = results.insertId
        let sql = "INSERT INTO student (studentID, name, surname, gender, educationLevel, facebookURL, lineID, email, mobile) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"

        this.connection.query(sql, [studentID, userInput.name, userInput.surname, userInput.gender, userInput.educationLevel, userInput.facebookURL, userInput.lineID, userInput.email, userInput.mobile]
          , (err, results) => {
          if(err) {
            return reject(new Error('An error occured getting the users: ' + err));
          }
          resolve();
        });
      });
    });
  }

  disconnect() {
    this.connection.end();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("A host must be specified.");
    if(!connectionSettings.user) throw new Error("A user must be specified.");
    if(!connectionSettings.password) throw new Error("A password must be specified.");
    if(!connectionSettings.port) throw new Error("A port must be specified.");

    resolve(new Repository(connectionSettings));
  });
};
