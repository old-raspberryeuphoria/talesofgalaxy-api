import { ROLE_ADMIN, ROLE_USER, ROLE_GUEST } from '../../src/helpers/constants/roles';

export default (sequelize, DataTypes) => {
  const ForumPermission = sequelize.define('ForumPermission', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    forumId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    read: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: ROLE_GUEST,
    },
    write: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: ROLE_USER,
    },
    manage: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: ROLE_ADMIN,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  ForumPermission.associate = models => {
    ForumPermission.belongsTo(models.Forum, {
      as: 'forum',
      foreignKey: 'forumId',
    });
  };

  return ForumPermission;
};
