module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Skill',
      [
        {
          name: 'Pilotage',
          description: 'Lorem Ipsum',
          attributeId: 2,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('Skill', null, {}),
};
