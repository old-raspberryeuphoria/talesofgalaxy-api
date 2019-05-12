module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Attribute',
      [
        {
          name: 'Physique',
          description: 'Lorem Ipsum',
          color: '#f41e1e',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Dextérité',
          description: 'Lorem Ipsum',
          color: '#4cb262',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Constitution',
          description: 'Lorem Ipsum',
          color: '#ae707d',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Charisme',
          description: 'Lorem Ipsum',
          color: '#d1aa42',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Instincts',
          description: 'Lorem Ipsum',
          color: '#5242d1',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Sagesse',
          description: 'Lorem Ipsum',
          color: '#5f8fbc',
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('Attribute', null, {}),
};
