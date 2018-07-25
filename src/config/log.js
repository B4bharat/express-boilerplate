const winston = require('winston');
const morgan = require('morgan');
const expressWinston = require('express-winston');
const status = require('../app/utils/statusCodes');

class Winstonlogger {
	log() {
		morgan('dev');
		expressWinston.requestWhitelist.push('body');
		expressWinston.responseWhitelist.push('body');
		expressWinston.logger({
			statusLevels: false, // default value
			level(req, res) {
				let level = '';

				if (res.statusCode >= status.CONTINUE.code) {
					level = 'info';
				}

				if (res.statusCode >= status.BAD_REQUEST.code) {
					level = 'warn';
				}

				if (res.statusCode >= status.INTERNAL_FAILURE.code) {
					level = 'error';
				}

				// Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
				if (
					res.statusCode === status.UNAUTHORIZED_ACCESS.code ||
					res.statusCode === status.FORBIDDEN_ACCESS.code
				) {
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
			msg:
				'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
			colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
		});
	}
}

module.exports = Winstonlogger;
