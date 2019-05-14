module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Faction', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isArchived: {
        allowNull: false,
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
    return queryInterface.dropTable('Faction');
  },
};
