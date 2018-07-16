const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const winston = require('winston');
const expressWinston = require('express-winston');
const strategies = require('./passport');
const error = require('../api/middlewares/error');
const { env } = require('./vars');

const userRoutes = require('../api/users/user.route');

/**
 * Express instance
 * @public
 */
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);

// enable detailed API logging in dev env
if (env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    statusLevels: false, // default value
    level(req, res) {
      let level = '';
      if (res.statusCode >= 100) {
        level = 'info';
      }
      if (res.statusCode >= 400) {
        level = 'warn';
      }
      if (res.statusCode >= 500) {
        level = 'error';
      }
      // Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
      if (res.statusCode === 401 || res.statusCode === 403) {
        level = 'critical';
      }
      return level;
    },
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
      }),
    ],
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount api v1 routes
app.use('/api/users', userRoutes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
