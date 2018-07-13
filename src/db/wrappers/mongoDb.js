const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let instance = null;

class MongoDb {

	constructor(config) {
		if (!instance) {
			instance = this;
		}
		this.db = this.connect(config);
		return instance;
	}

	connect(config) {
		const db = mongoose.createConnection(config.connectionString, { server: { auto_reconnect: true }});
		// console.log("Mongo connect success=>", db);
		return db;
	}

	async find(schema, query, exclude) {
		const model = this.db.model(schema.options.collection, schema);
		const result = await model.findOne(query, exclude);
		return result;
	}

	async findAll(schema, query, exclude, options) {
		const model = this.db.model(schema.options.collection, schema);
		const result = await model.find(query, exclude, options);
		return result;
	}

	async update(schema, query, update, options) {
		const model = this.db.model(schema.options.collection, schema);
		const result = await model.update(query, update, options);
		return result;
	}

	async findDistinct(schema, field, exclude) {
		const model = this.db.model(schema.options.collection, schema);
		const result = await model.distinct(field);
		return result;
	}
	
}

module.exports = MongoDb;
