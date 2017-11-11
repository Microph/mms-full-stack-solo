//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {
  // POST method route
  app.post('/login', function (req, res, next) {
    if(req.body.loginType == "facebook") {
      options.repository.getUserByFacebook(req.body.id).then((user) => {
        if(!user) { 
          res.status(200).send({
            success: false
          });
        } else {
          res.status(200).send({
            success: true
          });
        }
      })
      .catch(next);
    } else {
      options.repository.getUserByLine(req.body.id).then((user) => {
        if(!user) { 
          res.status(200).send({
            success: false
          });
        } else {
          res.status(200).send({
            success: true
          });
        }
      })
      .catch(next);
    }
  })
};
