import bcrypt from 'bcrypt';
import config from 'config';
import diacritics from 'diacritics';

import safeString from '../helpers/strings/safeString';
import { ROLE_ADMIN } from '../helpers/constants/roles';

const hiddenProperties = ['password'];

function normalizeEmail(value, key) {
  if (value) {
    this.setDataValue(key, diacritics.remove(value.toLowerCase()));
  } else {
    this.setDataValue(key, null);
  }
}

function setSafeName(user) {
  if (user.changed('name')) {
    user.safeName = safeString(user.name);
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
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: { args: true, msg: { message: 'Name unique violation' } },
      },
      /*
        The User model is the only model where the safeName is a real property
        instead of a virtual. This is because we don't want to expose the id
        in our public requests: instead, we'll use the safeName.
      */
      safeName: {
        allowNull: false,
        type: DataTypes.STRING,
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
        beforeCreate: user => {
          hashPassword(user);
          setSafeName(user);
        },
        beforeUpdate: user => {
          hashPassword(user);
          setSafeName(user);
        },
      },
    },
  );

  User.associate = models => {
    User.hasMany(models.Character, {
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
