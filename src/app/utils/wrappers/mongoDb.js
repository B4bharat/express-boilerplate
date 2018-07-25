const mongoose = require('mongoose');
const { mongo } = require('../../../config/vars');

const CustomError = require('../customError');
const status = require('../statusCodes');

let instance = null;

// Promisify mongoose response
mongoose.Promise = global.Promise;

mongoose.connection.on('error', err => {
	console.log(`MongoDB connection error: ${err}`);
	process.exit(-1); // eslint-disable-line no-magic-numbers
});

class MongoDb {
	constructor() {
		// If connection is already there, then return same instance
		if (!instance) {
			instance = this;
		}
		// Else create new connection
		this.db = this.connect(mongo.uri);

		return instance;
	}

	/**
	 * Create connection with DB
	 *
	 * @param {Object} config DB connection config
	 * @param {String} config.connectionString DB connection string
	 * @returns {Object} DB connection instance
	 * @memberof MongoDb
	 */

	connect(connectionString) {
		mongoose.createConnection(connectionString, {
			server: { auto_reconnect: true },
		});

		return mongoose.connection;
	}

	/**
	 * Find first record
	 *
	 * @param {Object} schema collection schema
	 * @param {Object} query query to be made
	 * @param {Object} exclude fields to exclude
	 * @returns {Object} matching record
	 * @memberof MongoDb
	 */

	async findOne(schema, query, exclude = {}) {
		try {
			const model = this.db.model(schema.options.collection, schema);

			return await model.findOne(query, exclude);
		} catch (err) {
			throw new CustomError(status.DATABASE_FAILURE, err.message);
		}
	}

	/**
	 * Find all records
	 *
	 * @param {Object} schema collection schema
	 * @param {Object} query query to be made
	 * @param {Object} exclude fields to exclude
	 * @param {Object} options additional options eg. sort
	 * @returns {Array} list of matching records
	 * @memberof MongoDb
	 */

	async findAll(schema, query, exclude = {}, options = {}) {
		try {
			const model = this.db.model(schema.options.collection, schema);

			return await model.find(query, exclude, options);
		} catch (err) {
			throw new CustomError(status.DATABASE_FAILURE, err.message);
		}
	}

	/**
	 * Find records count
	 *
	 * @param {Object} schema collection schema
	 * @param {Object} query query to be made
	 * @returns {Number} count of matching records
	 * @memberof MongoDb
	 */

	async count(schema, query) {
		try {
			const model = this.db.model(schema.options.collection, schema);

			return await model.countDocuments(query);
		} catch (err) {
			throw new CustomError(status.DATABASE_FAILURE, err.message);
		}
	}

	/**
	 * Find distinct values for field in records
	 *
	 * @param {Object} schema collection schema
	 * @param {String} field field whose distinct values are required
	 * @param {Object} exclude fields to exclude
	 * @returns {Array} list of distinct values
	 * @memberof MongoDb
	 */

	async findDistinct(schema, field) {
		try {
			const model = this.db.model(schema.options.collection, schema);

			return await model.distinct(field);
		} catch (err) {
			throw new CustomError(status.DATABASE_FAILURE, err.message);
		}
	}

	/**
	 * Update a record
	 *
	 * @param {Object} schema collection schema
	 * @param {Object} query query to be made
	 * @param {Object} update fields with values for updating
	 * @param {Object} options additional options eg. multi
	 * @returns {Object} no of modified records
	 * @memberof MongoDb
	 */

	async update(schema, query, update, options = {}) {
		try {
			const model = this.db.model(schema.options.collection, schema);

			return await model.update(query, update, options);
		} catch (err) {
			throw new CustomError(status.DATABASE_FAILURE, err.message);
		}
	}

	/**
	 * Insert new record
	 *
	 * @param {Object} schema collection schema
	 * @param {Object} data data to be inserted
	 * @returns {Object} success params
	 * @memberof MongoDb
	 */

	async insert(schema, data) {
		try {
			const model = this.db.model(schema.options.collection, schema);

			return await model.create(data);
		} catch (err) {
			throw new CustomError(status.DATABASE_FAILURE, err.message);
		}
	}
}

module.exports = MongoDb;
