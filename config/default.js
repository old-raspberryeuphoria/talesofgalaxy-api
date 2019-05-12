require('@babel/register');
require('dotenv').config();

const { version } = require('../package.json');
const { ROLE_ADMIN, ROLE_GAME_MASTER } = require('../src/helpers/constants/roles');

const guestAllowedRoutes = [
  ['', ['GET'], '*'],
  ['/auth/sign-in', ['POST'], '*'],
  ['/auth/reset-password', ['POST'], '*'],
  ['/auth/check-token', ['POST'], '*'],
  ['/users', ['GET', 'POST'], '*'],
  ['/users/:safeName', ['GET'], '*'],
  ['/factions', ['GET'], '*'],
  ['/factions/:id/:safeName', ['GET'], '*'],
  ['/characters', ['GET'], '*'],
  ['/characters/:id/:safeName', ['GET'], '*'],
  ['/attributes', ['GET'], '*'],
  ['/attributes/:id', ['GET'], '*'],
];

const userAllowedRoutes = [
  ...guestAllowedRoutes,
  ['/users/:id', ['PUT'], ['self', ROLE_ADMIN]],
  ['/characters', ['POST'], '*'],
  ['/characters/:id/:safeName', ['PUT'], ['self', ROLE_ADMIN, ROLE_GAME_MASTER]],
];

const gameMasterAllowedRoutes = [
  ...userAllowedRoutes,
  ['/factions/:id/:safeName', ['PUT'], [ROLE_ADMIN, ROLE_GAME_MASTER]],
  ['/attributes/:id', ['PUT'], [ROLE_ADMIN, ROLE_GAME_MASTER]],
];

const adminAllowedRoutes = [
  ...gameMasterAllowedRoutes,
  ['/characters/:id/:safeName', ['DELETE'], '*'],
  ['/users/:id', ['DELETE'], '*'],
  ['/factions', ['POST'], '*'],
  ['/factions/:id/:safeName', ['DELETE'], '*'],
  ['/attributes', ['POST'], '*'],
  ['/attributes/:id', ['DELETE'], '*'],
];

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
  acl: [
    {
      role: 'guest',
      allows: guestAllowedRoutes,
    },
    {
      role: 'user',
      allows: userAllowedRoutes,
    },
    {
      role: 'gameMaster',
      allows: gameMasterAllowedRoutes,
    },
    {
      role: 'admin',
      allows: adminAllowedRoutes,
    },
  ],
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
