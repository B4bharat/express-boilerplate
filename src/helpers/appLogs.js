// 'use strict';
// var appPackage = require('../package.json'),
//   config = require(`../config/${process.env.NODE_ENV}.json`).log,
//   Logger = require('logging-node/es5');

// var logger = new Logger({
//   logAction: 'queue',
//   enableDebugMode: true,
//   env: `${process.env.NODE_ENV}`,
//   queueConfig: config.queueConfig.RabbitMQ,
//   appInfo: {
//     name: appPackage.name,
//     version: appPackage.version
//   }
// });
// /**
//  * A wrapper module for node.js projects to log debug and error statements to Kibana
//  *
//  * @param  {String} logType Logging type
//  * @param  {Number} errorCode Error code reference
//  * @param  {String} source Source of the log
//  * @param  {String} methodName Method name of the log reference
//  * @param  {String} statement  The statement to be logged
//  * @param  {String} description  Description of the error
//  */
// function log(logType, errorCode, source, methodName, statement, description) {
//   try {
//     var type = logType || 'error';
//     if (errorCode && typeof errorCode === 'string') {
//       errorCode = parseInt(errorCode.replace(/[^\d.]/g, ''), 10);
//     }
//     var stmt = statement ? statement : '',
//       desc = description ? description : '',
//       errSource = source ? source : '',
//       errMethodName = methodName ? methodName : '',
//       errCode = errorCode ? errorCode : 0;

//     var logObj = {
//       stmt: stmt,
//       desc: desc,
//       ref: {
//         source: errSource,
//         methodName: errMethodName
//       },
//       errCode: errCode
//     };
//     // console.log("logger ->", logger.validateParams);
//     switch (type) {
//       case 'info':
//         logger.info(logObj, function(err, res) {
//           //console.log(err, res);
//         });
//         return;
//       case 'warn':
//         logger.warn(logObj, function(err, res) {
//           //console.log(err, res);
//         });
//         return;
//       case 'debug':
//         logger.debug(logObj, function(err, res) {
//           //console.log(err, res);
//         });
//         return;
//       case 'error':
//         logger.error(logObj, function(err, res) {
//           //console.log(err, res);
//         });
//         return;
//       default:
//         return;
//     }
//   } catch (err) {
//     console.log("logger err =>", err);
//   }
// }
// /**
//  * Push's information log to RabbitMQ which will be made available in Kibana
//  */
// function info(errorCode, source, methodName, statement, description) {
//   return log('info', errorCode, source, methodName, statement, description);
// }
// /**
//  * Push's warning log to RabbitMQ which will be made available in Kibana
//  */
// function warn(errorCode, source, methodName, statement, description) {
//   return log('warn', errorCode, source, methodName, statement, description);
// }
// /**
//  * Push's debug log to RabbitMQ which will be made available in Kibana
//  */
// function debug(errorCode, source, methodName, statement, description) {
//   return log('debug', errorCode, source, methodName, statement, description);
// }
// /**
//  * Push's error log to RabbitMQ which will be made available in Kibana
//  */
// function error(errorCode, source, methodName, statement, description) {
//   return log('error', errorCode, source, methodName, statement, description);
// }
// module.exports = {
//   info: info,
//   warn: warn,
//   debug: debug,
//   error: error,
// };
