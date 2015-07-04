var mongoose = require('mongoose');
var config = require('../config.js');

mongoose.connect(config.MONGODB_URL);

module.exports = {
  User: require('./user.js'),
  Task: require('./task.js'),
  Message: require('./message.js'),
};
