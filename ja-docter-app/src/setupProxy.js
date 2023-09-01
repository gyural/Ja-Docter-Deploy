const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      // target: 'http://43.200.184.226',
      target: 'http://127.0.0.1:8000/',
      secure: false,
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware('/swagger', {
      // target: 'http://43.200.184.226',
      target: 'http://127.0.0.1:8000',
      secure: false,
      changeOrigin: true,
    }),
  );
};
