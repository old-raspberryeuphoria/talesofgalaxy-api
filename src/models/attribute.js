export default (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    color: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  Attribute.associate = function(models) {
    // Attribute.hasMany(models.Skill, {
    //   foreignKey: 'AttributeId',
    // });
  };

  return Attribute;
};
