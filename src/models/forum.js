export default (sequelize, DataTypes) => {
  const Forum = sequelize.define('Forum', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    parentId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: { args: true, msg: { message: 'Name unique violation' } },
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  Forum.associate = models => {
    Forum.hasOne(models.ForumPermission, {
      as: 'permissions',
      foreignKey: 'id',
    });

    Forum.hasMany(models.Forum, {
      as: 'subForums',
      foreignKey: 'parentId',
    });

    Forum.belongsTo(models.Forum, {
      as: 'parentForum',
      foreignKey: 'parentId',
    });
  };

  return Forum;
};
