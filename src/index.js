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
 X* Eslint from shetty's config, prettier and husky[pre-commit hooks]
 X* Express JWT for Authentication
 * mlab
 X* Documentation [Swagger]
 * Node Best Practices Github
 * Security Best Practices - Later
 * Performance Best Practices - Later
 * joi vs Express Validator
 * Configuration Environment
 * Mongoose Wrapper with Singleton Connection - Pratik
 * Error handling middleware
 * Error Logging using Winston
 * Unit Testing - Pratik
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
