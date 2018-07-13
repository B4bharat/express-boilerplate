const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const members = new Schema({
	_id	: Number,
	email : [String],
	gender : String,
	phone : {
		mob : String
	},
	name : {
		f : String,
		l : String
	}
}, { collection: 'members' });

module.exports.schema = members;
