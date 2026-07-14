const config = {
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET,
  redisUrl: process.env.REDIS_URL,
  services: {
    users: process.env.USERS_SERVICE_URL,
    orders: process.env.ORDERS_SERVICE_URL,
    payments: process.env.PAYMENTS_SERVICE_URL,
    catalogs: process.env.CATALOGS_SERVICE_URL,
  },
};

export default config;
