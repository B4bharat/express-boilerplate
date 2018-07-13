const _ = require('lodash');
const AerospikeDB = require('./wrappers/aerospikeDb');
const MongoDB = require('./wrappers/mongoDb');

let aerospikeInstance = null, mongoInstance = null;

class DatabaseFactory {
	constructor(params) {

		if (_.isNull(params.dbName) || _.isUndefined(params.dbName) || !_.isString(params.dbName)) {
			return new Error('dbms name is missing. Cannot instantiate a valid database');
		}
		if (_.isNull(params.details) || _.isUndefined(params.details)) {
			return new Error('connection string is missing. Cannot connect to the database');
		}

		switch(params.dbName) {

			case "aerospike":
				if(!aerospikeInstance) {
					aerospikeInstance = new AerospikeDB(params.details);
				} 
				return aerospikeInstance;

			case "mongo":
				if(!mongoInstance) { 
					mongoInstance = new MongoDB(params.details);	
				}
				return mongoInstance;
			
			default:
				return new Error(`${params.dbName} is currently not supported by the database engine`);
				
		}

	}

}

module.exports = DatabaseFactory;