const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const config = require('./config/environment');

// Setup src
const app = express();
const server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);
const logger = require('./components/logger');

// Connect to MongoDB
const mongooseConnectionPromise = mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1); // eslint-disable-line no-process-exit
});

// Start src
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, () => {
    // eslint-disable-next-line no-console
    console.log(
      'Server listening on %d, in %s mode',
      config.port,
      app.get('env'),
    );
  });
}

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException', err);
});

setImmediate(startServer);

// Expose app
module.exports = app;
