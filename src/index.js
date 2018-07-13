const app = require('./app');

/**
 * Logging
 * Routing
 * Configuration Environment
 * Eslint, prettier and husky[pre-commit hooks]
 * MongoDB Connection
 * Error Logging using Winston
 * Error handling middleware
 * Express Validation middleware
 * Authentication
 * Documentation [Swagger]
 * Unit Testing
 * Node Best Practices Github
 * Security Best Practices
 * Performance Best Practices
 * npm scripts
 * ReadME
 * GraphQL
 */
// const config = require(`./config/${process.env.NODE_ENV}.json`);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
