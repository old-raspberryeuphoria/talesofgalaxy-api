module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'CharacterSkill',
      [
        {
          characterId: 1,
          skillId: 1,
          isSpecialised: false,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          characterId: 1,
          skillId: 2,
          isSpecialised: true,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          characterId: 1,
          skillId: 3,
          isSpecialised: false,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          characterId: 2,
          skillId: 2,
          isSpecialised: true,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('CharacterSkill', null, {}),
};
