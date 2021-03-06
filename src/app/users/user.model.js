const mongoose = require('mongoose');
const status = require('../utils/statusCodes');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const CustomError = require('../utils/customError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

/**
 * User Roles
 */
const roles = ['user', 'admin'];

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			match: /^\S+@\S+\.\S+$/,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 128,
		},
		name: {
			type: String,
			maxlength: 128,
			index: true,
			trim: true,
		},
		role: {
			type: String,
			enum: roles,
			default: 'user',
		},
		picture: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
userSchema.pre('save', async function(next) {
	try {
		if (!this.isModified('password')) return next();
		const testEnvSaltRounds = 1;
		const devEnvSaltRounds = 10;

		const rounds = env === 'test' ? testEnvSaltRounds : devEnvSaltRounds;

		const hash = await bcrypt.hash(this.password, rounds);

		this.password = hash;

		return next();
	} catch (error) {
		return next(error);
	}
});

/**
 * Methods
 */
userSchema.method({
	transform() {
		const transformed = {};
		const fields = ['id', 'name', 'email', 'picture', 'role', 'createdAt'];

		fields.forEach(field => {
			transformed[field] = this[field];
		});

		return transformed;
	},

	token() {
		const playload = {
			exp: moment()
				.add(jwtExpirationInterval, 'minutes')
				.unix(),
			iat: moment().unix(),
			sub: this._id,
		};

		return jwt.encode(playload, jwtSecret);
	},

	async passwordMatches(password) {
		return bcrypt.compare(password, this.password);
	},
});

/**
 * Statics
 */
userSchema.statics = {
	roles,

	/**
	 * Get user
	 *
	 * @param {ObjectId} id - The objectId of user.
	 * @returns {Promise<User, APIError>}
	 */
	async get(id) {
		try {
			let user;

			if (mongoose.Types.ObjectId.isValid(id)) {
				user = await this.findById(id).exec();
			}

			if (user) {
				return user;
			}

			throw new CustomError(status.DATA_NOT_FOUND);
		} catch (error) {
			throw error;
		}
	},

	/**
	 * Find user by email and tries to generate a JWT token
	 *
	 * @param {ObjectId} id - The objectId of user.
	 * @returns {Promise<User, APIError>}
	 */
	async findAndGenerateToken(options) {
		const { email, password, refreshObject } = options;

		if (!email) throw new CustomError(status.VALIDATION_FAILURE);

		const user = await this.findOne({ email }).exec();
		const err = {
			code: status.UNAUTHORIZED_ACCESS.code,
		};

		if (password) {
			if (user && (await user.passwordMatches(password))) {
				return { user, accessToken: user.token() };
			}
			err.message = 'Incorrect email or password';
		} else if (refreshObject && refreshObject.userEmail === email) {
			if (moment(refreshObject.expires).isBefore()) {
				err.message = 'Invalid refresh token.';
			} else {
				return { user, accessToken: user.token() };
			}
		} else {
			err.message = 'Incorrect email or refreshToken';
		}
		throw new CustomError(err);
	},

	/**
	 * List users in descending order of 'createdAt' timestamp.
	 *
	 * @param {number} skip - Number of users to be skipped.
	 * @param {number} limit - Limit number of users to be returned.
	 * @returns {Promise<User[]>}
	 */
	list({
		page = 1, // eslint-disable-line no-magic-numbers
		perPage = 30, // eslint-disable-line no-magic-numbers
		name,
		email,
		role,
	}) {
		const options = omitBy({ name, email, role }, isNil);

		return this.find(options)
			.sort({ createdAt: -1 })
			.skip(perPage * (page - 1)) // eslint-disable-line no-magic-numbers
			.limit(perPage)
			.exec();
	},

	/**
	 * Return new validation error
	 * if error is a mongoose duplicate key error
	 *
	 * @param {Error} error
	 * @returns {Error|APIError}
	 */
	checkDuplicateEmail(error) {
		const duplicateEmailErrCode = 11000;

		if (error.name === 'MongoError' && error.code === duplicateEmailErrCode) {
			return new CustomError({
				message: 'Validation Error',
				code: status.VALIDATION_FAILURE.code,
			});
		}

		return error;
	},

	async oAuthLogin({ service, id, email, name, picture }) {
		const user = await this.findOne({
			$or: [{ [`services.${service}`]: id }, { email }],
		});

		if (user) {
			user.services[service] = id;
			if (!user.name) user.name = name;
			if (!user.picture) user.picture = picture;

			return user.save();
		}
		const password = uuidv4();

		return this.create({
			services: { [service]: id },
			email,
			password,
			name,
			picture,
		});
	},
};

module.exports = mongoose.model('User', userSchema);
