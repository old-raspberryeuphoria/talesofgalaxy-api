module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Character', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rank: {
        type: Sequelize.STRING,
      },
      health: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
      },
      birthdate: {
        type: Sequelize.INTEGER,
      },
      factionId: {
        type: Sequelize.INTEGER,
      },
      isArchived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('Character');
  },
};
