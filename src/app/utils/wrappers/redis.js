const redis = require('redis');
const { promisify } = require('util');

const CustomError = require('../customError');
const status = require('../statusCodes');

promisify(redis);
let instance = null;

class Redis {
	constructor(config) {
		if (!instance) {
			instance = this;
		}
		this.db = this.connect(config);

		return instance;
	}

	connect(config) {
		return redis.createClient(config);
	}

	async insert(key, value) {
		try {
			await this.db.set(key, value);

			return key;
		} catch (err) {
			throw new CustomError(status.DATABASE_FAILURE);
		}
	}

	async find(key) {
		try {
			return await this.db.get(key);
		} catch (err) {
			throw new CustomError(status.DATABASE_FAILURE);
		}
	}
}

module.exports = Redis;
