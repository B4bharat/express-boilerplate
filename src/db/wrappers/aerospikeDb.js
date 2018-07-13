const Aerospike = require('aerospike');

let instance = null;

class AerospikeDb {

	constructor(config) {
		
		if (!instance) {
			instance = this;
		}

		this.db = this.connect(config);
		return instance;

	}

	connect(hosts) {
		
		const db = Aerospike.client( { hosts } );
		
		db.connect((error) => {
			console.log('Aerospike connection error => ', error);
		});

		return db;

	}

	async find(namespace, set, pk) {

		const key = new Aerospike.Key(namespace, set, pk);
		const result = await this.db.get(key);

		// console.log(`Find result for namespace: ${namespace}, set: ${set}, pk: ${pk} => `, result, '\ntype => ', typeof result);
		
		return result.bins ? result.bins : result;

	}

	async findBatch(namespace, keyObjArray, readAll) {

		let readKeys = [];
		
		for(const keyObj of keyObjArray) {
			
			readKeys.push({
				key: new Aerospike.Key(namespace, keyObj.set, keyObj.pk),
				read_all_bins: readAll ? readAll : true
			});

		}

		return await this.db.batchRead(readKeys);

	}

	async insert(namespace, set, pk, value) {
		
		const key = new Aerospike.Key(namespace, set, pk);
		value.pk = pk;
		return await this.db.put(key, value, null);

	}

	async isExists(namespace, set, pk) {
		
		const key = new Aerospike.Key(namespace, set, pk);
		return await this.db.exists(key);

	}

	findAll(namespace, set, options) {

		return new Promise((resolve, reject) => {
			
			let resultArray = [];
			
			try {
				
				const result = this.db.scan(namespace, set, options);
				const stream = result.foreach();
				
				stream.on('data', (record) => {
					resultArray.push(record.bins);
				});

				stream.on('end', ()=> {
					return resolve(resultArray);
				});

			} catch(err) {

				console.log(`Error in scan operation for namespace: ${namespace}, set: ${set} => `, err);
				return reject(err);

			}

		});
	
	}

}

module.exports = AerospikeDb;