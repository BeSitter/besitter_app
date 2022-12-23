const path = require('path');
const { config } = require('process');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    console.log('=========== DEVELOPMENT MODE ===========');
    Object.assign(dbConfig, {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    console.log('=========== TEST MODE ===========');
    Object.assign(dbConfig, {
      type: 'postgres',
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
    });
    break;
  case 'production':
    console.log('=========== PRODUCTION MODE ===========');
    Object.assign(dbConfig, {
      type: 'postgres',
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
    });
    break;
  default:
    throw new Error('NODE_ENV is not set');
}

module.exports = dbConfig;
