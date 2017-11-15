const FacebookStrategy = require('passport-facebook').Strategy;

//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, passport, options) => {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    options.repository.findUserByID(user.id, 'facebook').then((studentID) => {
      if(studentID) {
        return done(null, {registStatus: true, accountType: 'facebook', accountID:user.accountID})
      } else {
        return done(null, {registStatus: false, accountType: 'facebook', accountID:user.accountID})
      }
    })
  });

  passport.use(new FacebookStrategy({
      clientID: '1585083688215887',
      clientSecret: 'ee917ac7f9a30c4feda943772380509b',
      callbackURL: "http://localhost:8123/api/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        options.repository.findUserByID(profile.id, 'facebook').then((studentID) => {
          if(studentID) {
            return done(null, {registStatus: true, accountType: 'facebook', accountID:profile.id})
          } else {
            return done(null, {registStatus: false, accountType: 'facebook', accountID:profile.id})
          }
        })
      })
    }
  ));

  app.get('/api/auth/facebook', passport.authenticate('facebook'));

  app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentmote resource at https://www.facebook.com/dialog/oauth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8123%2Fapi%2Fauth%2Ffacebook%2Fcallback&client_id=1585083688215887. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).ication
      // res.status(200).send(req.user)
      res.redirect('http://localhost:3000/');
    }
  );

  app.post('/api/register', function (req, res, next) {
    if(req.body.agree) {
      var userInfo = {accountType: req.body.accountType,
                      accountID: req.body.accountID,
                      name: req.body.name,
                      surname: req.body.surname,
                      gender: req.body.gender,
                      educationLevel: req.body.educationLevel,
                      facebookUrl: req.body.facebookUrl,
                      lineID: req.body.lineID,
                      email: req.body.email,
                      mobile: req.body.mobile}

      options.repository.register(userInfo).then((success) => {

      })
      .catch(next);
      // if(req.body.registerType == 'facebook') {
      //   options.repository.registerByFacebook(userInfo).then((user) => {
      //     if(!user) { 
      //       res.status(200).send({
      //         success: false,
      //         msg: 'register incomplete'
      //       });
      //     } else {
      //       res.status(200).send({
      //         success: true,
      //         studentID: 's-123456',
      //         accountType: 'facebook',
      //         accountID: '123456'
      //       });
      //     }
      //   })
      //   .catch(next);
      // } else {
      //   options.repository.registerByLine(userInfo).then((user) => {
      //     if(!user) { 
      //       res.status(200).send({
      //         success: false,
      //         msg: 'register incomplete'
      //       });
      //     } else {
      //       res.status(200).send({
      //         success: true,
      //         studentID: 's-123456',
      //         accountType: 'line',
      //         accountID: '654321'
      //       });
      //     }
      //   })
      //   .catch(next);
      // }
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
