//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

let mysql = require('mysql');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connectionSettings) {
    this.connectionSettings = connectionSettings;
    this.connection = mysql.createConnection(this.connectionSettings);
  }

  adminLogin(username, password) {
    return new Promise((resolve, reject) => {
      let passHash = require('crypto')
                      .createHash('sha256')
                      .update(password)
                      .digest("hex");
      let sql = "SELECT * FROM admin WHERE username = ? AND password = ?";

      this.connection.query(sql, [username, passHash], (err, results) => {
        if(err) {
          return reject(new Error('An error occured getting the users: ' + err));
        }
        
        if(results.length === 0) {
          resolve(undefined);
        } else {
          resolve({
            username: results[0]
          });
        }
      });
    });
  }

  findUserByID(id, loginType) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT tutorID FROM account WHERE accountID = ? AND accountType = ?"

      this.connection.query(sql, [id, loginType], (err, results) => {
        if(err) {
          return reject(new Error('An error occured getting the users: ' + err));
        }

        if(results.length === 0) {
          resolve(undefined);
        } else {
          resolve(results[0])
        }
      })
    })
  }

  register(userInput) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO account (accountType, accountID) " +
                "SELECT ?, ? " +
                "WHERE NOT EXISTS(SELECT accountType, accountID " +
                                  "FROM account " +
                                  "WHERE accountType = ? " +
                                    "AND accountID = ? )"

      this.connection.query(sql, [userInput.accountType, userInput.accountID, userInput.accountType, userInput.accountID], (err, results) => {
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

  searchForStudent(filters = undefined) {
    return new Promise((resolve, reject) => {
      if(filters) {
        let sql = "SELECT * FROM student WHERE "
        let condition = undefined

        Object.keys(filters).forEach((key) => {
          if(condition) {
            condition += " AND " + key + " = " + "'" + filters[key] + "'"
          } else {
            condition = key + " = " + "'" + filters[key] + "'"
          }
        })

        sql += condition

        this.connection.query(sql, (err, results) => {
          if(err) {
            return reject(new Error('An error occured getting the users: ' + err));
          }

          resolve(results)
        })
      } else {
        let sql = "SELECT * FROM student"

        this.connection.query(sql, (err, results) => {
          if(err) {
            return reject(new Error('An error occured getting the users: ' + err));
          }

          resolve(results)
        })
      }
    })
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
