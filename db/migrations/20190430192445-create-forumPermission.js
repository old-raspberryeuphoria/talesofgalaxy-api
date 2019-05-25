import { ROLE_ADMIN, ROLE_USER, ROLE_GUEST } from '../../src/helpers/constants/roles';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ForumPermission', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      forumId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Forum',
          key: 'id',
        },
      },
      read: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ROLE_GUEST,
      },
      write: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ROLE_USER,
      },
      manage: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ROLE_ADMIN,
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
    return queryInterface.dropTable('ForumPermission');
  },
};
