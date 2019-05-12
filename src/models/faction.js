import safeString from '../helpers/strings/safeString';

export default (sequelize, DataTypes) => {
  const Faction = sequelize.define('Faction', {
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
    safeName: {
      type: DataTypes.VIRTUAL,
      get() {
        return safeString(this.name);
      },
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

  Faction.associate = models => {
    Faction.hasMany(models.Character, {
      foreignKey: 'factionId',
    });
  };

  return Faction;
};
