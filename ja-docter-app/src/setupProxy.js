const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      // target: 'https://server.ja-doctor.net',
      target: 'http://127.0.0.1:8000',
      secure: false,
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware('/swagger', {
      target: 'https://server.ja-doctor.net',
      // target: 'http://13.125.159.168',
      // target: 'http://43.200.184.226',
      // target: 'http://127.0.0.1:8000',
      secure: false,
      changeOrigin: true,
    }),
  );
};
