const Utils = require('utils');
const sillyname = require('sillyname');

const utils = new Utils({});
const config = require(`../config/${process.env.NODE_ENV}.json`);

/**
 * create forum username
 *
 * @param {Object} user user details
 * @param {String} user.name fullname
 * @returns {String} forum username
 */

function createUsername(user) {
  if(user.name === "Guest User") {
    return sillyname().replace(/ /g, "").toLowerCase();
  }
  return user.name.replace(/ /g, "").toLowerCase();
}

class CustomUtils {
  
  /**
   * Phone number validation 
   *
   * @param {Object} params request header params
   * @param {String} params.phone user's phone number
   * @returns {Boolean} whether number is valid or not
   * @memberof CustomUtils
   */

  validatePhoneNumber(params) {
    const requiredParams = {
      phone: { type: 'string', default: null }
    }

    const validatedParams = utils.validateParams(requiredParams, params);        
    if(validatedParams.err) { 
      throw new Error(validatedParams.err.message);
    }

    const idealPhoneNumber = /^\d{10}$/;
    if(!params.phone.match(idealPhoneNumber)) {
      throw new Error('Invalid Phone Number');
    }
    return true;
  }

  /**
   * Create payload for JWT token  
   *
   * @param {Object} user user details
   * @param {String} user.phone phone no
   * @param {String} user.name full name
   * @param {String} user.email email id
   * @returns {Object} payload object { id, fullname, username, email }
   * @memberof CustomUtils
   */

  createPayload(user) {
    const payload = {
      id: user.phone,
      fullname: user.name,
      username: user.username,
      email: user.email
    }
    return payload;
  } 

  /**
   * Create forum user params
   *
   * @param {Object} userDetails user details
   * @param {String} userDetails.name fullname
   * @param {String} userDetails.email email id
   * @returns {Object} forum user details
   * @memberof CustomUtils
   */

  generateForumParams(userDetails) {
    try {
      const username = createUsername(userDetails);
      const email = userDetails.email || username.concat(config.forum.defaults.email);
      return { username, email };
    } catch(err) {
      console.log("User params generation error", err);
      throw new Error("User params generation error");
    }
  }

}

module.exports = CustomUtils;