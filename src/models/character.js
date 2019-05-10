import safeString from '../helpers/strings/safeString';

export default (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUIDV4,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    safeName: {
      type: DataTypes.VIRTUAL,
      get() {
        return safeString(this.fullName);
      },
    },
    rank: {
      type: DataTypes.STRING,
    },
    health: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
    birthdate: {
      type: DataTypes.INTEGER,
    },
    factionId: {
      type: DataTypes.INTEGER,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  Character.associate = function(models) {
    Character.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });

    Character.belongsTo(models.Faction, {
      as: 'faction',
      foreignKey: 'factionId',
    });
  };

  return Character;
};
