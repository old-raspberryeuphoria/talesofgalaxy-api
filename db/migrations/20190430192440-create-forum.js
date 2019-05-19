module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Forum', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      parentId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Forum',
          key: 'id',
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
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
    return queryInterface.dropTable('Forum');
  },
};
