const Joi = require('joi');
const User = require('./user.model');

const minPage = 1;
const maxPerPage = 100;
const minPasswordLen = 6;
const maxPasswordLen = 128;
const maxNameLen = 128;

module.exports = {
	// GET /v1/users
	listUsers: {
		query: {
			page: Joi.number().min(minPage),
			perPage: Joi.number()
				.min(minPage)
				.max(maxPerPage),
			name: Joi.string(),
			email: Joi.string(),
			role: Joi.string().valid(User.roles),
		},
	},

	// POST /v1/users
	createUser: {
		body: {
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string()
				.min(minPasswordLen)
				.max(maxPasswordLen)
				.required(),
			name: Joi.string().max(maxNameLen),
			role: Joi.string().valid(User.roles),
		},
	},

	// PUT /v1/users/:userId
	replaceUser: {
		body: {
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string()
				.min(minPasswordLen)
				.max(maxPasswordLen)
				.required(),
			name: Joi.string().max(maxNameLen),
			role: Joi.string().valid(User.roles),
		},
		params: {
			userId: Joi.string()
				.regex(/^[a-fA-F0-9]{24}$/)
				.required(),
		},
	},

	// PATCH /v1/users/:userId
	updateUser: {
		body: {
			email: Joi.string().email(),
			password: Joi.string()
				.min(minPasswordLen)
				.max(maxPasswordLen),
			name: Joi.string().max(maxNameLen),
			role: Joi.string().valid(User.roles),
		},
		params: {
			userId: Joi.string()
				.regex(/^[a-fA-F0-9]{24}$/)
				.required(),
		},
	},
};
