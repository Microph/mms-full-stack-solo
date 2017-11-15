//  config.js
//
//  Simple application configuration. Extend as needed.
module.exports = {
	port: process.env.PORT || 8123,
  db: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    database: 'tutorium',
    user: 'tutorium',
    password: '123',
    port: 3306
  },
  facebookStrategy: {
    clientID: '1585083688215887',
    clientSecret: 'ee917ac7f9a30c4feda943772380509b',
    callbackURL: "http://localhost:8123/api/auth/facebook/callback"
  },
  homePage: 'http://localhost:3000/'
};
