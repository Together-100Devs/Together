const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/auth/discord',
    createProxyMiddleware({
      target: 'http://localhost:2121',
      changeOrigin: true,
    })
  );
};