import { Forum } from '../../src/models';

module.exports = {
  up: async queryInterface => {
    const forums = await Forum.findAll();

    return queryInterface.bulkInsert(
      'ForumPermission',
      forums.map(forum => ({
        forumId: forum.id,
      })),
      {},
    );
  },
  down: queryInterface => queryInterface.bulkDelete('ForumPermission', null, {}),
};
