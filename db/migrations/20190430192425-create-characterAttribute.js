module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CharacterAttribute', {
      attributeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Attribute',
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
      value: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('CharacterAttribute');
  },
};
