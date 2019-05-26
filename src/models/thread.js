export default (sequelize, DataTypes) => {
  const Thread = sequelize.define(
    'Thread',
    {
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
      userId: {
        allowNull: false,
        type: DataTypes.UUIDV4,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isSticky: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      isLocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      hooks: {
        // afterCreate: async forum =>
        // create a Post
      },
    },
  );

  Thread.associate = models => {
    Thread.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'id',
    });

    Thread.hasMany(models.Thread, {
      as: 'subThreads',
      foreignKey: 'parentId',
    });
  };

  return Thread;
};
