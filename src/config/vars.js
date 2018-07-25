const path = require('path');

// import .env variables
require('dotenv-safe').load({
	path: path.join(__dirname, '../../.env'),
	sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	jwtExpirationInterval: process.env.jwtExpirationInterval,
	jwtSecret: process.env.jwtSecret,
	mongo: {
		uri:
			process.env.NODE_ENV === 'test'
				? process.env.MONGO_URI_TESTS
				: process.env.MONGO_URI,
	},
	logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
