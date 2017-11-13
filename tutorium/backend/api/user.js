//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {
  
  app.post('/api/register', function (req, res, next) {
    if(req.body.agree) {
      var userInfo = {
                      accountID: req.body.id,
                      name: req.body.name,
                      surname: req.body.surname,
                      gender: req.body.gender,
                      educationLevel: req.body.educationLevel,
                      facebookUrl: req.body.facebookUrl,
                      lineID: req.body.lineID,
                      email: req.body.email,
                      mobile: req.body.mobile}

      if(req.body.registerType == 'facebook') {
        options.repository.registerByFacebook(userInfo).then((user) => {
          if(!user) { 
            res.status(200).send({
              success: false,
              msg: 'register incomplete'
            });
          } else {
            res.status(200).send({
              success: true,
              studentID: 's-123456',
              accountType: 'facebook',
              accountID: '123456'
            });
          }
        })
        .catch(next);
      } else {
        options.repository.registerByLine(userInfo).then((user) => {
          if(!user) { 
            res.status(200).send({
              success: false,
              msg: 'register incomplete'
            });
          } else {
            res.status(200).send({
              success: true,
              studentID: 's-123456',
              accountType: 'line',
              accountID: '654321'
            });
          }
        })
        .catch(next);
      }
    }
  })
  
  app.post('/api/login', function (req, res, next) {
    if(req.body.loginType == "facebook") {
      options.repository.getUserByFacebook(req.body.id).then((user) => {
        if(!user) { 
          res.status(200).send({
            success: false,
            msg: 'login incomplete'
          });
        } else {
          res.status(200).send({
            success: true,
            studentID: 's-123456',
            accountType: 'facebook',
            accountID: '123456'
          });
        }
      })
      .catch(next);
    } else {
      options.repository.getUserByLine(req.body.id).then((user) => {
        if(!user) { 
          res.status(200).send({
            success: false,
            msg: 'login incomplete'
          });
        } else {
          res.status(200).send({
            success: true,
            studentID: 's-123456',
            accountType: 'line',
            accountID: '654321'
          });
        }
      })
      .catch(next);
    }
  })
};
