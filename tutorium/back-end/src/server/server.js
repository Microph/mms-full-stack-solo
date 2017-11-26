//  server.js

let bodyParser = require("body-parser")
let cookieParser = require('cookie-parser')
let express = require('express')
let expressSession = require('express-session')
let flash = require('connect-flash')
let morgan = require('morgan')
let passport = require('passport')
let repository = require('../repository/schema')

module.exports.start = (options) => {

  return new Promise((resolve, reject) => {

    //  Make sure we have a repository and port provided.
    if(!options.port) throw new Error("A server must be started with a port.")

    //  Create the app, add some logging.
    let app = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(flash())
    app.use(cookieParser('anything'))
    app.use(expressSession({
      secret: 'anything', 
      resave: true,
      saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    //  Add the APIs to the app.
    require('../api/admin')(app, passport, options)
    require('../api/payment')(app, passport, options)
    require('../api/report')(app, passport, options)
    require('../api/user')(app, passport, options)
    require('../api/student')(app, passport, options)
    require('../api/tutor')(app, passport, options)

    //  Start the app, creating a running server which we return.
    let server = app.listen(options.port, () => {
      resolve(server)
    })

  })
}