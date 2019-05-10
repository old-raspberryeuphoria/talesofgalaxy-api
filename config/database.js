require('dotenv').config();

module.exports = {
  development: {
    database: 'talesofgalaxy_dev',
    dialect: 'postgres',
    host: '127.0.0.1',
    password: process.env.POSTGRES_PASSWORD,
    operatorsAliases: false,
    port: 5432,
    username: 'talesofgalaxy_admin',
    /* eslint-disable no-console */
    logging: process.env.DATABASE_LOGGING === 'true' && console.log,
    define: {
      // prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
  },
  test: {
    database: `talesofgalaxy_test_${process.env.GIT_SHA}`,
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    logging: false,
    password: null,
    operatorsAliases: false,
    port: 5432,
    username: 'postgres',
  },
  production: {
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    logging: false,
    operatorsAliases: false,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    define: {
      // prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
  },
};
