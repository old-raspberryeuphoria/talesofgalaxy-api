module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Character',
      [
        {
          userId: 'd99dead3-923c-583e-96fe-4e18e8299a54',
          lastName: 'Qemi',
          firstName: 'Mira',
          factionId: 1,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          userId: '09b3153d-0925-5632-928f-71e06af292f9',
          lastName: 'Sevirian',
          firstName: 'Tibèr',
          factionId: 1,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          userId: '07f94576-41d7-51f2-88ff-b8b60d9648b8',
          lastName: 'Gendja',
          firstName: 'le Hutt',
          factionId: 1,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('Character', null, {}),
};
