const Utils = require('utils');
const Auth = require('../modules/auth');
const rules = require('../rules/authRules');

const auth = new Auth();
const utils = new Utils({});

class AuthController {
  
  async getToken(ctx) {
    //  Validation
    const validatedParams = utils.validateParams(rules.user, ctx.request.body);
    if(validatedParams.err) {
      ctx.status = 401;
      ctx.body = validatedParams.err;
      return;
    }

    try {
      const token = await auth.generateToken(ctx.request.body);

      ctx.status = 200;
      ctx.body = {
        result: {
          token,
          message: "Valid user" 
        }
      };
    } catch(err) {
      //  log
      ctx.status = 401;
      ctx.body = {
        message: err.message
      };
      return;
    }
  }

}

module.exports = AuthController;