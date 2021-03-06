'use strict'

const FacebookStrategy = require('passport-facebook').Strategy
const OAuth2Strategy = require('passport-oauth2').Strategy
const LocalStrategy = require('passport-local').Strategy
let jwt = require('jsonwebtoken')

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
        let user = require('../repository/user')
        let displayName = profile.displayName
        let profilePic = "https://graph.facebook.com/" + profile.id + "/picture"

        user.findUserByAccountID(profile.id, 'facebook').then(result => {
          if(result) {
            return done(null, {
              registStatus: true, 
              studentID: result.studentID,
              accountType: result.accountType, 
              accountID: result.accountID, 
              displayName: displayName, 
              profilePic: profilePic, 
              isTutor: result.isTutor
            })
          } else {
            return done(null, {
              registStatus: false, 
              studentID: null, 
              accountType: 'facebook', 
              accountID: profile.id, 
              displayName: displayName, 
              profilePic: profilePic, 
              isTutor: false
            })
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
        let user = require('../repository/user')
        let decoded = jwt.decode(profile.id_token, {complete: true})
        let accountID = decoded.payload.sub
        let displayName = decoded.payload.name
        let profilePic = decoded.payload.picture
        
        user.findUserByAccountID(accountID, 'line').then(result => {
          if(result) {
            return done(null, {
              registStatus: true, 
              studentID: result.studentID,
              accountType: result.accountType, 
              accountID: result.accountID, 
              displayName: displayName, 
              profilePic: profilePic, 
              isTutor: result.isTutor
            })
          } else {
            return done(null, {
              registStatus: false, 
              studentID: null, 
              accountType: 'line', 
              accountID: accountID, 
              displayName: displayName, 
              profilePic: profilePic, 
              isTutor: false
            })
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
          let user = require('../repository/user')

          user.adminAuthen(username, password).then(result => {
            if(result) {
              return done(null, {
                registStatus: true,
                studentID: null, 
                accountType: 'admin', 
                accountID: result.dataValues.username, 
                displayName: result.dataValues.username, 
                profilePic: null, 
                isTutor: false
              })
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
    passport.authenticate('local', {  
      successRedirect: options.adminHomepage,
      failureRedirect: options.adminHomepage,
      failureFlash: true 
    })
  )

  app.post('/api/register', (req, res, next) => {
    if(req.user && req.body.agree) {
      let user = require('../repository/user')
      let userInput = req.body
      let accountType = req.user.accountType
      let accountID = req.user.accountID

      user.register(accountType, accountID, userInput).then(result => {
        if(result.studentID) {
          req.user.studentID = result.studentID
          req.user.registStatus = true

          if(result.created) {
            res.status(200).send({
              success: true,
              msg: 'Register complete'
            })
          } else {
            res.status(200).send({
              success: true,
              msg: 'Account is already register'
            })
          }
        } else {
          res.status(400).send({
            success: false,
            msg: 'Registration incomplete' 
          })
        }
      }).catch(next)
    } else {
      res.status(403).send({
        success: false,
        msg: 'Authenticate and condition accept need for register'
      })
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
      res.status(200).send({ 
        success: true, 
        user: req.user 
      }) 
    } else {
      res.status(403).send({ 
        success: false, 
        msg: 'User is not login, yet' 
      })
    }
  })

  app.delete('/api/account/delete', (req, res, next) => {
    if(req.user && req.user.studentID) {
      if(req.body.confirm) {
        let user = require('../repository/user')
        let studentID = req.user.studentID
        user.deleteStudentAccount(studentID).then(result => {
          if(result) {
            res.status(200).send({
              success: true,
              msg: 'Delete Account Complete'
            })
          } else {
            res.status(400).send({
              success: false,
              msg: 'Account hasn\'t been delete or already been delete, please correct your input'
            })
          }
        })
      } else {
        res.status(400).send({
          success: false,
          msg: 'You need to confirm for delete account'
        })
      }
    } else {
      res.status(403).send({
        success: false,
        msg: 'You need to authenticate before delete account'
      })
    }
  })
}
