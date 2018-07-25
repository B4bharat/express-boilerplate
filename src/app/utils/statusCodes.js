const STATUS_CODES = {
	API_SUCCESS: {
		code: 200,
		message: 'Api operation was successful',
	},
	NOT_MODIFIED: {
		code: 304,
		message: 'Desired result already exist',
	},
	API_FAILURE: {
		code: 500,
		message: 'Api operation was unsuccessful',
	},
	VALIDATION_FAILURE: {
		code: 400,
		message: 'Validation failed',
	},
	DATA_NOT_FOUND: {
		code: 400,
		message: 'User data not found',
	},
	DATABASE_FAILURE: {
		code: 500,
		message: 'Database operation was unsuccessful',
	},
	EXTERNAL_FAILURE: {
		code: 500,
		message: 'External failure',
	},
	INTERNAL_FAILURE: {
		code: 500,
		message: 'Internal failure',
	},
	INCORRECT_INPUT_DATA_TYPE: {
		code: 400,
		message: 'Incorrect input data type passed',
	},
	MISSING_INPUT: {
		code: 400,
		message: 'Input is missing',
	},
	NOT_FOUND: {
		code: 404,
		message: 'Page not found',
	},
	UNAUTHORIZED_ACCESS: {
		code: 401,
		message: 'Unauthorized access',
	},
	FORBIDDEN_ACCESS: {
		code: 403,
		message: 'Forbidden access',
	},
	BAD_REQUEST: {
		code: 400,
		message: 'Bad request',
	},
	CONTINUE: {
		code: 200,
		message: 'Continue',
	},
};

module.exports = STATUS_CODES;
