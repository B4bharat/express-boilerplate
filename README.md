# Express ES2017 REST API Boilerplate

Boilerplate/Generator/Starter Project for building RESTful APIs and microservices using Node.js, Express and MongoDB

# Best Practices

The boilerplate follows the following best practices and the users are expected to consult the same throughout the development process:
- [Node Best Practices](https://github.com/i0natan/nodebestpractices)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Express Performance Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

## Features

 - No transpilers, just vanilla javascript
 - ES2017 latest features like Async/Await
 - CORS enabled
 - Express + MongoDB ([Mongoose](http://mongoosejs.com/))
 - Consistent coding styles with [editorconfig](http://editorconfig.org)
 - [Docker](https://www.docker.com/) support
 - Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
 - Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
 - Request validation with [joi](https://github.com/hapijs/joi)
 - Gzip compression with [compression](https://github.com/expressjs/compression)
 - Linting with [eslint](http://eslint.org)
 - Tests with [mocha](https://mochajs.org), [chai](http://chaijs.com) and [sinon](http://sinonjs.org)
 - Code coverage with [istanbul](https://istanbul.js.org) and [coveralls](https://coveralls.io)
 - Git hooks with [husky](https://github.com/typicode/husky) 
 - Logging with [winston](https://github.com/winstonjs/winston)
 - API documentation geratorion with [apidoc](http://apidocjs.com)
 - Monitoring with [pm2](https://github.com/Unitech/pm2)

## Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)

## Getting Started

Clone the repo and make it yours:

```bash
git clone https://github.com/B4bharat/express-boilerplate
cd express-boilerplate
rm -rf .git
```

Install dependencies:

Note: DO NOT use npm and yarn alternately, stick with one package manager only because both produce their own '.lock' files and may result in inconsistencies with dependencies

```bash
npm i or npm install
```

Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
npm run dev
yarn dev
```

## Running in Production

```bash
npm start
yarn start
```

## Folder Structure

```bash
+-- docker
+-- src
|   +-- app (contains the application business logic)
|   |   +-- middlewares (expressjs middlewares)
|   |   +-- users (user entity/component of the application)
|   |   |   +-- user.controller.js (controller of the user entity)
|   |   |   +-- user.model.js (MongoDB model of the user entity)
|   |   |   +-- user.route.js (API routes of the user entity)
|   |   |   +-- user.test.js (Unit Tests of the user entity)
|   |   |   +-- user.validation.js (validations for the user entity)
|   |   +-- utils (utitlity methods)
|   +-- config (contains configurations for server, databases, environments etc)
|   |   +-- express.js (configuration for the express server)
|   |   +-- mongoose.js (mongoose configuration)
|   |   +-- vars.js (environment specific variables)
|   +-- index.js (main file, app initialisation)
+-- .editorconfig (configurations for the editors)
+-- .env.example (sample dotenv file)
+-- .eslintrc (eslint configuration)
+-- .gitattributes
+-- .gitignore
+-- .prettierrc (prettier configuration)
+-- .package-lock.json
+-- .package.json
+-- .README.MD
+-- sonar-project.properties
```

## Lint

* Eslint errors that can be [fixed through --fix flag](https://eslint.org/docs/rules/)

```bash
# lint code with ESLint
npm run lint
yarn lint

# try to fix ESLint errors
npm run lint:fix
yarn lint:fix

# lint and watch for changes
npm run lint:watch
yarn lint:watch

# fix formatting issues through prettier
npm run formatting:fix
yarn formatting:fix
```

## Test

```bash
# run all tests with Mocha
npm run test
yarn test

# run unit tests
npm run test:unit
yarn test:unit

# run integration tests
npm run test:integration
yarn test:integration

# run all tests and watch for changes
npm run test:watch
yarn test:watch

# open nyc test coverage reports
npm run coverage
yarn coverage
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
npm run docs
yarn docs
```

## Docker

```bash
# run container locally

# run container in production

# run tests

```

## Deploy

## Inspirations

 - [KunalKapadia/express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api)
 - [diegohaz/rest](https://github.com/diegohaz/rest)
 - [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)

## License

[MIT License](README.md) - [Bharat Poptwani](https://github.com/B4bharat)
