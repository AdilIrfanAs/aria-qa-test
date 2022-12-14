export type EnvKeys =
  | 'NODE_ENV'
  | 'LOG_LEVEL'
  | 'PORT'
  | 'DB_NAME'
  | 'DB_HOST'
  | 'DB_PASSWORD'
  | 'DB_POOL_ACQUIRE'
  | 'DB_POOL_IDLE'
  | 'DB_POOL_MAX'
  | 'DB_POOL_MIN'
  | 'DB_PORT'
  | 'DB_ROOT_PASSWORD'
  | 'DB_USER'
  | 'JWT_SECRET_KEY';

export type Env = Record<EnvKeys, string>;
