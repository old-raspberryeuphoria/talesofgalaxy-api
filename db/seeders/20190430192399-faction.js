module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Faction',
      [
        {
          name: 'République Galactique',
          color: '#ec6216',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Empire Infini',
          color: '#506290',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Hors la loi',
          color: '#6a8463',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('Faction', null, {}),
};
