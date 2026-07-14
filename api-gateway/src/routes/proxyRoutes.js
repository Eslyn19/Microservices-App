import { createProxyMiddleware } from 'http-proxy-middleware';
import config from '../config/env.js';

function createServiceProxy(target, prefix) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^${prefix}`]: '' },
  });
}

export function registerProxyRoutes(app) {
  app.use('/users', createServiceProxy(config.services.users, '/users'));
  app.use('/orders', createServiceProxy(config.services.orders, '/orders'));
  app.use('/payments', createServiceProxy(config.services.payments, '/payments'));
  app.use('/catalogs', createServiceProxy(config.services.catalogs, '/catalogs'));
}
