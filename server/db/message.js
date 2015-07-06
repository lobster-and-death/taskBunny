var mongoose = require('mongoose');

var InboxSchema = new mongoose.Schema({
  from: String,
  fromId: String,
  to: String,
  category: String,
  message: String,
});

module.exports = mongoose.model('Message', InboxSchema);