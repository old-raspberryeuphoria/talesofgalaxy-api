module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Forum',
      [
        {
          title: 'Les combats',
          forumId: 2,
          authorId: 'd99dead3-923c-583e-96fe-4e18e8299a54',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          title: 'Ajouter des micro transactions ?',
          forumId: 3,
          authorId: '07f94576-41d7-51f2-88ff-b8b60d9648b8',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          title: 'Absent en mai',
          forumId: 4,
          authorId: '07f94576-41d7-51f2-88ff-b8b60d9648b8',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('Forum', null, {}),
};
