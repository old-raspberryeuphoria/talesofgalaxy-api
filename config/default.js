require('@babel/register');
require('dotenv').config();

import routes from './routes';
const { version } = require('../package.json');

module.exports = {
  port: 3000,
  appName: 'Tales of Galaxy API',
  version,
  localPath: 'file://',
  maxFileSize: 10000000,
  frontendUrl: 'http://localhost:8080',
  adminUrl: 'http://localhost:8081',
  passwordExpiredTime: 86400000,
  allowOrigins: [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:7070',
    'http://www.talesofgalaxy.fr',
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
    passthrough: false,
    expiresIn: '730h',
    mailExpiresIn: '730h',
  },
  acl: routes,
  request: {
    sizeLimit: '15mb',
    ratelimit: {
      duration: 1000,
      max: 500,
    },
  },
  tmpFolder: '/tmp/talesofgalaxy',
  bcrypt: {
    saltRounds: 11,
  },
  acceptedFileTypes: ['.jpg', '.jpeg', '.png'],
  acceptedFileMimeTypes: ['image/jpeg', 'image/png'],
};
