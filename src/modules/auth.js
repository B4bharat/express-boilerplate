const _ = require('lodash');
const DatabaseFactory = require('../db/databaseFactory');

const config = require(`../config/${process.env.NODE_ENV}.json`);

class Auth {
  
  constructor() {    
    try {
      this.db = new DatabaseFactory({ dbName: 'aerospike', details: config.db.aerospike });
		} catch (e) {
      console.log('Failed to connect to aerospike', e);
			process.exit(1);
    }
  }

  /**
   * app auth token generation
   *
   * @param {Object} params User's login details
   * @param {String} params.phone User's phone no
   * @return {Object} < JWT token {String} >
   */

  async generateToken(params) {
    try {
      return "hello";
    } catch(err) {
      console.log(`Caught error while generating user token for ${params.phone}`);
      throw err;
    }
  }
  
}

module.exports = Auth;
