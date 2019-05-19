module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Forum',
      [
        {
          name: 'Accueil & Règles du jeu',
          description: 'Lorem Ipsum',
          parentId: null,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Règles du jeu',
          description: 'Lorem Ipsum',
          parentId: 1,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Vos suggestions',
          description: 'Lorem Ipsum',
          parentId: 1,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Vos absences',
          description: 'Lorem Ipsum',
          parentId: 1,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Encyclopédie galactique',
          description: 'Lorem Ipsum',
          parentId: null,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Créer votre personnage',
          description: 'Lorem Ipsum',
          parentId: 5,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Personnage joueurs',
          description: 'Lorem Ipsum',
          parentId: 5,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Personnage non joueurs',
          description: 'Lorem Ipsum',
          parentId: 5,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('Forum', null, {}),
};
