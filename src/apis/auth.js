const AuthController = require('../controllers/auth');

class Auth {
  constructor() {
		this.authController = new AuthController();
	}
	attachRoutes(router) {
		return router
			.post('/auth', this.authController.getToken);
	}
}

module.exports = Auth;