module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'CharacterAttribute',
      [
        {
          characterId: 1,
          attributeId: 1,
          value: 5,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          characterId: 1,
          attributeId: 2,
          value: 5,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          characterId: 1,
          attributeId: 3,
          value: 5,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          characterId: 2,
          attributeId: 2,
          value: 5,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('CharacterAttribute', null, {}),
};
