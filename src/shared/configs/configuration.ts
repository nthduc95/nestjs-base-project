export default () => ({
  apiPrefix: process.env.API_PREFIX,
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    logging: process.env.DB_LOGGING === 'true',
  },
  cacheManagement: {
    useRedis: process.env.USE_REDIS,
    ttl: process.env.TTL,
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: process.env.REDIS_DB,
      db_socket: process.env.REDIS_DB_SOCKET,
      username:
        !process.env.REDIS_USERNAME || process.env.REDIS_USERNAME === 'default'
          ? ''
          : process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      channel: process.env.REDIS_ABT_CHANNEL,
    },
  },
  googleOAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenExpiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
});
