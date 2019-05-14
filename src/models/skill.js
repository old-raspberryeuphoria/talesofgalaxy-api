export default (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    attributeId: {
      allowNull: false,
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

  Skill.associate = models => {
    Skill.belongsTo(models.Attribute, {
      as: 'attribute',
      foreignKey: 'attributeId',
    });

    Skill.belongsToMany(models.Character, {
      as: 'skills',
      through: 'CharacterSkill',
      foreignKey: 'skillId',
      otherKey: 'characterId',
    });
  };

  return Skill;
};
