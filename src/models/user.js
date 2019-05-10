import bcrypt from 'bcrypt';
import config from 'config';
import diacritics from 'diacritics';

import { ROLE_ADMIN } from '../helpers/constants/roles';

const hiddenProperties = ['password'];

function normalizeEmail(value, key) {
  if (value) {
    this.setDataValue(key, diacritics.remove(value.toLowerCase()));
  } else {
    this.setDataValue(key, null);
  }
}

async function hashPassword(user) {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, config.bcrypt.saltRounds);
  }
}

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUIDV4,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: { args: true, msg: { message: 'Username unique violation' } },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        set: normalizeEmail,
        unique: { msg: { message: 'Email unique violation', code: 'USR_DAT_02_00' } },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        api: {
          editable: [ROLE_ADMIN],
        },
      },
      avatar: {
        type: DataTypes.STRING,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    },
  );

  User.associate = function(models) {
    User.hasOne(models.Character, {
      foreignKey: 'userId',
      onUpdate: 'cascade',
    });
  };

  User.prototype.toJSON = function() {
    const user = Object.assign({}, this.get());

    hiddenProperties.forEach(property => {
      delete user[property];
    });

    return user;
  };

  return User;
};
