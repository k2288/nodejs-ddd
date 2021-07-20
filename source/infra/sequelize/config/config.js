require('dotenv').config()
const Sequelize = require('sequelize');

const { 
  DB_USERNAME, 
  DB_PASSWORD, 
  DB_HOST,
  DB_DATABASE,
  NODE_ENV
} = process.env;

const databaseCredentials = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "seederStorage": "sequelize",
    "dialect": "mysql"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "mysql"
  }
};

const { username, password, database, host, dialect } = databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;
module.exports.connection = new Sequelize(database, username, password, {
  host,
  dialect,
  port: 3306,
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: NODE_ENV!=="production"
});
