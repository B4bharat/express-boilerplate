// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const app = require('./config/express');

const DbFactory = require('./app/utils/databaseFactory');

const db = new DbFactory();

db.connectMongo();
// db.connectRedis();

// listen to requests
app.listen(port, () => console.info(`server started on port ${port} (${env})`));

module.exports = app;
