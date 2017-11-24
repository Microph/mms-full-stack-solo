//	index.js
//
//  Entrypoint to the application. Opens a repository to the MySQL
//  server and starts the server.
let server = require('./server/server')
let config = require('../config/config')

//  Lots of verbose logging when we're starting up...
console.log("---Tutorium Service---")
// console.log("Connecting to customer repository...")

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {
  console.error('Unhandled Exception', err)
})
process.on('unhandledRejection', function(err, promise){
  console.error('Unhandled Rejection', err)
})

server.start({
  port: config.port,
  facebookConfig: config.facebookStrategy,
  lineConfig: config.lineStrategy,
  homepage: config.homepage,
  adminHomepage: config.adminHomepage
}).then(() => {
  console.log("Server started successfully, running on port " + config.port + ".")
})