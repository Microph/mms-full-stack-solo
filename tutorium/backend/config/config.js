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
    callbackURL: 'http://localhost:8123/api/auth/facebook/callback'
  },
  lineStrategy: {
    authorizationURL: 'https://access.line.me/oauth2/v2.1/authorize',
    tokenURL: 'https://api.line.me/oauth2/v2.1/token',
    clientID: '1546704245',
    clientSecret: '2ac1a4a09e176e7444141373f1c7bb8b',
    state: '2',
    scope: ['profile', 'openid'],
    callbackURL: 'http://localhost:8123/api/auth/line/callback'
  },
  homepage: 'http://localhost:3000/',
  adminHomepage: 'http://localhost:3000/admin/dashboard'
};
