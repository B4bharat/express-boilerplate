const KoaRouter = require('koa-router');
const Auth = require('./auth');

class IndexRouter extends KoaRouter {
	constructor() {
		super();
		this.auth = new Auth();
	}

	attachRoutes() {
		this.auth.attachRoutes(this);
	}

	indexRoutes() {
		this.get('/', (ctx) => {
			ctx.body = {
				appName: 'Auth Handler Engine',
				author: 'Pratik Solim'
			};
		});
	}
}

module.exports = IndexRouter;