import { Forum } from '../../src/models';
import { ROLE_ADMIN, ROLE_GAME_MASTER, ROLE_GUEST } from '../../src/helpers/constants/roles';

module.exports = {
  up: async queryInterface => {
    const forums = await Forum.findAll();

    const permissions = {
      "Tour d'administration": ROLE_ADMIN,
      'Temple des Maîtres du Jeu': ROLE_GAME_MASTER,
    };

    return queryInterface.bulkInsert(
      'ForumPermission',
      forums.map(forum => ({
        forumId: forum.id,
        read: permissions[forum.name] || ROLE_GUEST,
        createdAt: '2018-05-14T09:54:16.723Z',
        updatedAt: '2018-05-15T12:12:53.504Z',
      })),
      {},
    );
  },
  down: queryInterface => queryInterface.bulkDelete('ForumPermission', null, {}),
};
