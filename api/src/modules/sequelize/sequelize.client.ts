import { Sequelize } from 'sequelize-typescript';
import { Logger } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { PROVIDER_SEQUELIZE_CLIENT } from '../config/config.constants';

export const sequelizeClientFactory = async (
  configService: ConfigService,
): Promise<Sequelize> => {
  const logger = new Logger('SequelizeClientFactory');
  const sequelize = new Sequelize({
    database: configService.get('DB_NAME'),
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    host: configService.get('DB_HOST'),
    logging: false,
    modelPaths: [__dirname + '/../../**/*.model.{ts,js}'],
    password: configService.get('DB_PASSWORD'),
    port: Number.parseInt(configService.get('DB_PORT'), 10),
    username: configService.get('DB_USER'),
    pool: {
      max: Number(configService.get('DB_POOL_MAX') || 20),
      min: Number(configService.get('DB_POOL_MIN') || 0),
      acquire: Number(configService.get('DB_POOL_ACQUIRE') || 10000),
      idle: Number(configService.get('DB_POOL_IDLE') || 10000),
    },
    query: {
      nest: true,
    },
  });

  await sequelize.authenticate();

  logger.log('Connected to database');

  return sequelize;
};

export const sequelizeClientProvider = {
  provide: PROVIDER_SEQUELIZE_CLIENT,
  useFactory: sequelizeClientFactory,
  inject: [ConfigService],
};
