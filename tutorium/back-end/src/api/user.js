const FacebookStrategy = require('passport-facebook').Strategy
const OAuth2Strategy = require('passport-oauth2').Strategy
const LocalStrategy = require('passport-local').Strategy
let jwt = require('jsonwebtoken')

//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict'

//  Only export - adds the API to the app with the given options.
module.exports = (app, passport, options) => {

  passport.serializeUser((user, done) => {
    done(null, user)
  })
  
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use(new FacebookStrategy({
      clientID: options.facebookConfig.clientID,
      clientSecret: options.facebookConfig.clientSecret,
      callbackURL: options.facebookConfig.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        let displayName = profile.displayName
        let profilePic = "https://graph.facebook.com/" + profile.id + "/picture"

        options.repository.findUserByID(profile.id, 'facebook').then((result) => {
          if(result) {
            return done(null, {registStatus: true, studentID: result.studentID ,accountType: 'facebook', accountID: result.id, displayName: displayName , profilePic: profilePic, isTutor: result.isTutor})
          } else {
            return done(null, {registStatus: false, studentID: null, accountType: 'facebook', accountID: profile.id, displayName: profile.displayName, profilePic: profilePic, isTutor: false})
          }
        })
      })
    }
  ))

  app.get('/api/auth/facebook', passport.authenticate('facebook'))

  app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: options.homepage }),
    (req, res) => {
      res.redirect(options.homepage)
    }
  )

  passport.use(new OAuth2Strategy({
      authorizationURL: options.lineConfig.authorizationURL,
      tokenURL: options.lineConfig.tokenURL,
      clientID: options.lineConfig.clientID,
      clientSecret: options.lineConfig.clientSecret,
      state: options.lineConfig.state,
      scope: options.lineConfig.scope,
      callbackURL: options.lineConfig.callbackURL
    },
    (accessToken, refreshToken, profile, _, done) => {
      process.nextTick(() => {
        let decoded = jwt.decode(profile.id_token, {complete: true})
        let accountID = decoded.payload.sub
        let displayName = decoded.payload.name
        let profilePic = decoded.payload.picture
        
        options.repository.findUserByID(accountID, 'line').then((result) => {
          if(result) {
            return done(null, {registStatus: true, studentID: result.studentID, accountType: 'line', accountID:accountID, displayName: displayName, profilePic: profilePic, isTutor: result.isTutor})
          } else {
            return done(null, {registStatus: false, studentID: null, accountType: 'line', accountID:accountID, displayName: displayName, profilePic: profilePic, isTutor: false})
          }
        })
      })
    }
  ))

  app.get('/api/auth/line', passport.authenticate('oauth2'))

  app.get('/api/auth/line/callback', 
    passport.authenticate('oauth2', { failureRedirect: options.homepage})
    ,(req, res) => {
      res.redirect(options.homepage)
    })

  passport.use(new LocalStrategy(
    {passReqToCallback : true},
    (req, username, password, done) => {
      process.nextTick(() => {
        if(username && password) {
          options.repository.adminLogin(username, password).then((admin) => {
            if(admin) {
              return done(null, {registStatus: true, studentID: null, accountType: 'admin', accountID: admin.username, displayName: admin.username, profilePic: null, isTutor: false})
            } else {
              return done(null, false, req.flash('Username or password was wrong'))
            }
          })
        } else {
          return done(null, false, req.flash('Username or password is missing'))
        }
      })
    }
  ))

  app.post('/api/auth/admin',
    passport.authenticate('local', {  successRedirect: options.adminHomepage,
                                      failureRedirect: options.adminHomepage,
                                      failureFlash: true })
  )

  app.post('/api/register', (req, res, next) => {
    if(req.body.agree) {
      let userInfo = req.body

      options.repository.register(userInfo).then((studentID) => {
        if(studentID) {
          req.session.passport.user.studentID = studentID
          req.session.passport.user.registStatus = true
          res.status(200).send({ success: true })
        } else {
          res.status(400).send({ success: false, msg: 'Registration incomplete' })
        }
      })
      .catch(next)
    }
  })

  app.get('/api/logout', (req, res, next) => {
    req.session.destroy((err) => {
      res.redirect(options.homepage)
    })
  })

  app.get('/api/admin/logout', (req, res, next) => {
    req.session.destroy((err) => {
      res.redirect(options.adminHomepage)
    })
  })

  app.get('/api/current-login-session', (req, res, next) => {
    if(req.user) {
      res.status(200).send({ success: true, user: req.user }) 
    } else {
      res.status(400).send({ success: false, msg: 'User is not login, yet' })
    }
  })

}
