import { Sequelize, Model } from 'sequelize-typescript';
import * as path from 'path';
import { sync as globSync } from 'glob';
import createLogger from '../util/logger';

const logger = createLogger('SQL');
const env: string = process.env.NODE_ENV;
const config: any = require(`../../config/${env}.json`);
const logging = config.db.logging ? (sql) => { logger.info(sql); } : false;
const matcher: string = path.resolve(__dirname, '../api/models') + '/*.js';
const modelPathArr: Array<typeof Model> = globSync(matcher).map((modelPath: string) => {
  return require(modelPath).default;
});

const sequelize = new Sequelize({
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op as any,
  database: config.postgres.database,
  username: 'postgres',
  password: 'passwd',
  logging,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize.addModels(modelPathArr);

export { sequelize };
