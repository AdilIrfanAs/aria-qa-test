import Joi from '@hapi/joi';

export const ConfigSchema = Joi.object({
  PORT: Joi.number().optional(),
  NODE_ENV: Joi.string().optional(),
  LOG_LEVEL: Joi.string().optional(),

  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_POOL_ACQUIRE: Joi.string().optional(),
  DB_POOL_IDLE: Joi.string().optional(),
  DB_POOL_MAX: Joi.string().optional(),
  DB_POOL_MIN: Joi.string().optional(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),

  JWT_SECRET_KEY: Joi.string().required(),
}).options({ abortEarly: false, stripUnknown: true });
