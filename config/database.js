const debug = require('debug')('database');
const { MongoClient } = require('mongodb');
const util = require('util');

let db;
const mongoClientConnect = util.promisify(MongoClient.connect);

const initialize = () => mongoClientConnect(process.env.CONNECTION_STRING)
  .then((database) => {
    debug('Connection was successfully established with MongoDB');
    db = database;
  })
  .catch((error) => {
    debug(`Error connection to database: ${error}`);
    throw error;
  });

module.exports = {
  db,
  initialize,
};
