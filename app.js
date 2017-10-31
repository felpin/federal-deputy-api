require('dotenv').config();

const bodyParser = require('body-parser');
const debug = require('debug')('server');
const express = require('express');
const fs = require('fs');
const https = require('https');
const database = require('./config/database');

const app = express();
app.use(bodyParser.json());

const httpsOptions = {
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_CRT),
};

const port = process.env.SERVER_PORT;

database.initialize()
  .then(() => https.createServer(httpsOptions, app).listen(port, () => {
    debug(`Server listening on port ${port}`);
  }))
  .catch(() => {
    debug('Could not start application');
  });
