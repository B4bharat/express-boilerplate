const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();

// Security Best Practice: secure apps by setting various HTTP headers
app.use(helmet());
app.use(compress());
// Security Best Practice: enable CORS - Cross Origin Resource Sharing
app.use(cors());

// parse body params and attach them to req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(
    expressWinston.logger({
      statusLevels: false, // default value
      level: function(req, res) {
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
        if (res.statusCode == 401 || res.statusCode == 403) {
          level = 'critical';
        }
        return level;
      },
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ],
      meta: true, // optional: log meta data about request (defaults to true)
      msg:
        'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    })
  );
}

// mount all routes on /api path
// app.use('/api', routes);

// app.use(
//   expressWinston.errorLogger({
//     transports: [
//       new winston.transports.Console({
//         json: true,
//         colorize: true
//       })
//     ]
//   })
// );

module.exports = app;
