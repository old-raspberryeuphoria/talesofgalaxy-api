module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CharacterSkill', {
      skillId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Skill',
          key: 'id',
        },
      },
      characterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Character',
          key: 'id',
        },
      },
      isSpecialised: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('CharacterSkill');
  },
};
