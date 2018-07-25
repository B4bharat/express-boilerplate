class CustomError extends Error {
	/**
	 * Creates an instance of CustomError.
	 *
	 * @param {Object} params message and status
	 * @param {String} params.message message for client side
	 * @param {Number} params.status status code
	 * @param {String} extra additional message
	 * @memberof CustomError
	 */
	constructor(params, extra) {
		super();

		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
		this.message = params.message;
		this.status = params.code;

		if (extra) {
			this.additionalInfo = extra;
		}
	}
}

module.exports = CustomError;
