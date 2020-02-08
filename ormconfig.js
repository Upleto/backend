const path = require('path');
require('dotenv').config({ path: path.join(__dirname, `.env/${process.env.NODE_ENV}.env`) });

module.exports = {
  type: 'mysql',
  synchronize: process.env.NODE_ENV === 'dev',
  dropSchema: process.env.NODE_ENV === 'dev',
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },

  // mysql specific options
  host: process.env.db_host,
  port: process.env.db_port,
  username: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_database,
  debug: process.env.DEBUG || false,
};
