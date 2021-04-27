const winston = require('winston');
const config = require('config');
require('winston-mongodb');
require('express-async-errors');


module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));

  if (config.get('mongoLogDBName')) {

    const mongoLogDBPath = `mongodb://localhost/${config.get('mongoLogDBName')}`;

    winston.add(new winston.transports.MongoDB({
      db: mongoLogDBPath,
      level: 'info'
    }));

  }
}