export default (sequelize, DataTypes) => {
  const CharacterSkill = sequelize.define('CharacterSkill', {
    skillId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    characterId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    isSpecialised: {
      defaultValue: false,
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  });

  CharacterSkill.associate = models => {
    CharacterSkill.belongsTo(models.Skill, {
      as: 'skill',
      foreignKey: 'skillId',
    });

    CharacterSkill.belongsTo(models.Character, {
      as: 'skills',
      foreignKey: 'characterId',
    });
  };

  return CharacterSkill;
};
