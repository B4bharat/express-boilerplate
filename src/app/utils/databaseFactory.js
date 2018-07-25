const MongoDB = require('./wrappers/mongoDb');
// const Redis = require('./wrappers/redis');

let mongoInstance = null;
// const redisInstance = null;

class DbFactory {
	connectMongo() {
		if (!mongoInstance) {
			mongoInstance = new MongoDB();
		}

		return mongoInstance;
	}

	// connectRedis() {
	// 	try {
	// 		if (!redisInstance) {
	// 			redisInstance = new Redis();
	// 		}

	// 		return redisInstance;
	// 	} catch (err) {
	// 		console.error(`Redis connection error: ${err}`);
	// 		process.exit(-1); // eslint-disable-line no-magic-numbers
	// 		throw new CustomError(status.INTERNAL_FAILURE);
	// 	}
	// }
}

module.exports = DbFactory;
