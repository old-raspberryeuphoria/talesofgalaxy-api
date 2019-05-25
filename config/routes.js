const { ROLE_ADMIN, ROLE_GAME_MASTER, ROLE_USER } = require('../src/helpers/constants/roles');

export default [
  ['', ['GET'], '*'],

  ['/auth/sign-in', ['POST'], '*'],
  ['/auth/reset-password', ['POST'], '*'],
  ['/auth/check-token', ['POST'], '*'],

  ['/users', ['GET', 'POST'], '*'],
  ['/users/:safeName', ['GET'], '*'],
  ['/users/:id', ['PUT'], ['self', ROLE_ADMIN]],
  ['/users/:id', ['DELETE'], [ROLE_ADMIN]],

  ['/forums', ['GET'], '*'],
  ['/forums', ['POST'], [ROLE_ADMIN]],
  ['/forums/:id', ['GET'], '*'],
  ['/forums/:id', ['PUT'], [ROLE_GAME_MASTER]],
  ['/forums/:id', ['DELETE'], [ROLE_ADMIN]],

  ['/characters', ['GET'], '*'],
  ['/characters', ['POST'], [ROLE_USER]],
  ['/characters/:id', ['GET'], '*'],
  ['/characters/:id', ['PUT'], [ROLE_USER]],
  ['/characters/:id', ['DELETE'], [ROLE_ADMIN]],

  ['/factions', ['GET'], '*'],
  ['/factions', ['POST'], [ROLE_ADMIN]],
  ['/factions/:id', ['GET'], '*'],
  ['/factions/:id', ['PUT'], [ROLE_GAME_MASTER]],
  ['/factions/:id', ['DELETE'], [ROLE_ADMIN]],

  ['/attributes', ['GET'], '*'],
  ['/attributes', ['POST'], [ROLE_ADMIN]],
  ['/attributes/:id', ['GET'], '*'],
  ['/attributes/:id', ['PUT'], [ROLE_GAME_MASTER]],
  ['/attributes/:id', ['DELETE'], [ROLE_ADMIN]],

  ['/skills', ['GET'], '*'],
  ['/skills', ['POST'], [ROLE_ADMIN]],
  ['/skills/:id', ['GET'], '*'],
  ['/skills/:id', ['PUT'], [ROLE_GAME_MASTER]],
  ['/skills/:id', ['DELETE'], [ROLE_ADMIN]],
];
