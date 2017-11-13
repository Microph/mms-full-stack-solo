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

  registerByFacebook(userInfo) {
    return new Promise((resolve, reject) => {
      resolve({
        studentID: 's-123456',
        accountType: 'facebook',
        accountID: '123456'
      })
    })
  }
  
  registerByLine(userInfo) {
    return new Promise((resolve, reject) => {
      resolve({
        studentID: 's-123456',
        accountType: 'line',
        accountID: '123456'
      })
    })
  }

  getUserByFacebook(id) {
    return new Promise((resolve, reject) => {
      if(id == '123456') {
        resolve({
          studentID: 's-123456',
          accountType: 'facebook',
          accountID: '123456'
        })
      } else {
        resolve(undefined)
      }
    })
  }

  getUserByLine(id) {
    return new Promise((resolve, reject) => {
      if(id == '654321') {
        resolve({
          studentID: 's-123456',
          accountType: 'line',
          accountID: '654321'
        })
      } else {
        resolve(undefined)
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
