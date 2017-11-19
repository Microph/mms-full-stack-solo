const FacebookStrategy = require('passport-facebook').Strategy;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
let jwt = require('jsonwebtoken');

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
    done(null, user)
  });

  passport.use(new FacebookStrategy({
      clientID: options.facebookConfig.clientID,
      clientSecret: options.facebookConfig.clientSecret,
      callbackURL: options.facebookConfig.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        options.repository.findUserByID(profile.id, 'facebook').then((result) => {
          if(result) {
            return done(null, {registStatus: true, accountType: 'facebook', accountID: profile.id, displayName: profile.displayName})
          } else {
            return done(null, {registStatus: false, accountType: 'facebook', accountID: profile.id, displayName: profile.displayName})
          }
        })
      })
    }
  ));

  app.get('/api/auth/facebook', passport.authenticate('facebook'));

  app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: options.homepage }),
    (req, res) => {
      // Successful authentmote resource at https://www.facebook.com/dialog/oauth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8123%2Fapi%2Fauth%2Ffacebook%2Fcallback&client_id=1585083688215887. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).ication
      res.redirect(options.homepage);
    }
  );

  passport.use(new OAuth2Strategy({
      authorizationURL: options.lineConfig.authorizationURL,
      tokenURL: options.lineConfig.tokenURL,
      clientID: options.lineConfig.clientID,
      clientSecret: options.lineConfig.clientSecret,
      state: options.lineConfig.state,
      scope: options.lineConfig.scope,
      callbackURL: options.lineConfig.callbackURL
    },
    function(accessToken, refreshToken, profile, _, done) {
      let decoded = jwt.decode(profile.id_token, {complete: true});
      let accountID = decoded.payload.sub
      let displayName = decoded.payload.name
      let profilePic = decoded.payload.picture

      process.nextTick(() => {
        options.repository.findUserByID(profile.id, 'line').then((result) => {
          if(result) {
            return done(null, {registStatus: true, accountType: 'line', accountID:accountID, displayName: displayName, profilePic: profilePic})
          } else {
            return done(null, {registStatus: false, accountType: 'line', accountID:accountID, displayName: displayName, profilePic: profilePic})
          }
        })
      })
    }
  ));

  app.get('/api/auth/line', passport.authenticate('oauth2'));

  app.get('/api/auth/line/callback', 
    passport.authenticate('oauth2', { failureRedirect: options.homepage})
    ,(req, res) => {
      res.redirect(options.homepage);
    });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      process.nextTick(() => {
        if(username && password) {
          options.repository.adminLogin(username, password).then((admin) => {
            if(admin) {
              return done(null, {registStatus: true, accountType: 'admin', accountID: admin.username, displayName: admin.username});
            } else {
              return done(null, false, { message: 'username or password was wrong' });
            }
          })
        } else {
          return done(null, false, { message: 'username or password is missing' });
        }
      })
    }
  ));

  app.post('/api/auth/admin',
    passport.authenticate('local', { failureRedirect: options.adminHomepage })
    ,(req, res) => {
      res.redirect(options.adminHomepage);
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

      options.repository.register(userInfo).then(() => {
        req.session.passport.user.registStatus = true;
        res.status(200).send({ success: true })
      })
      .catch(next);
    }
  })

  app.get('/api/logout', (req, res, next) => {
    req.session.destroy((err) => {
      res.redirect(options.homepage);
    })
  })

  app.get('/api/current-login-session', (req, res, next) => {
    if(req.user) {
      res.status(200).send({ success: true, user: req.user}) 
    } else {
      res.status(200).send({ success: false, msg: 'User is not login, yet'})
    }
  });

};
