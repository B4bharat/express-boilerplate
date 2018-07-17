// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

/**
 X* Logging
 X* Routing/Folder Structure
 * Eslint from shetty's config, prettier and husky[pre-commit hooks]
 * Flow
 * Express JWT for Authentication
 * Configuration Environment
 * MongoDB Connection
 * Error handling middleware
 * Error Logging using Winston
 * Express Validation middleware
 * Documentation [Swagger]
 * Unit Testing
 * Node Best Practices Github
 * Security Best Practices
 * Performance Best Practices
 * npm scripts
 * ReadME
 * GraphQL
 */

// listen to requests
app.listen(port, () => console.info(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;
