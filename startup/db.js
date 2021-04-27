const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {

  if (config.get('mongoLogDBName')) {
    mongoose.connect(`mongodb://localhost/${config.get('mongoLogDBName')}`)
      .then(() => winston.info('Connected to MongoDB...'));
  }
  else {
    winston.info('Config value [mongoLogDBName] is undefined.');
  }
}