/* eslint no-process-env:0 */
const path = require('path');
const dotenv = require('dotenv');
const _ = require('lodash');
const shared = require('./shared');

const root = path.normalize(`${__dirname}/../../..`);

const env = dotenv.config({ path: path.join(root, '.env') }).parsed;
const { DOMAIN, PREFIX, MONGO_URI } = env;

const all = {
  env: env.NODE_ENV,
  root,
  port: process.env.PORT || 3302,
  ip: process.env.IP || '0.0.0.0',
  URLS_API: `${PREFIX}api.${DOMAIN}`,
   // Secret for session, you will want to change this and make it an environment variable
   secrets: {
    session: 'af-mongo-secret'
  },

// MongoDB connection options
  mongo: {
      useMongoClient: true,
      uri: process.env.MONGO_URI  ,
      options: {
          db: {
              safe: true
          }
      }
  }
};

module.exports = _.merge(
  all,
  env,
  shared || {},
);
