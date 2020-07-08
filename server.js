'use strict';

const express = require('express');
const next = require('next');

const config = {
  '/api': {
    target: 'http://localhost:4000/',
    changeOrigin: true,
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const app = next({ dir: '.', dev: env !== 'production' });

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    const { createProxyMiddleware } = require('http-proxy-middleware');
    Object.keys(config).forEach((context) => {
      server.use(createProxyMiddleware(context, config[context]));
    });

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port} [${env}]`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
