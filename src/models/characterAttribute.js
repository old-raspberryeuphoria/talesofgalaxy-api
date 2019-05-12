export default (sequelize, DataTypes) => {
  const CharacterAttribute = sequelize.define('CharacterAttribute', {
    attributeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    characterId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    value: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  CharacterAttribute.associate = models => {
    CharacterAttribute.belongsTo(models.Attribute, {
      as: 'attribute',
      foreignKey: 'attributeId',
    });

    CharacterAttribute.belongsTo(models.Character, {
      as: 'attributes',
      foreignKey: 'characterId',
    });

    // CharacterAttribute.hasMany(models.Skill, {
    //   foreignKey: 'CharacterAttributeId',
    // });
  };

  return CharacterAttribute;
};
