var mongoose = require('mongoose');

var InboxSchema = new mongoose.Schema({
  from: { type: String, index: { unique: true } },
  to: String,
  recipient: String,
  message: String,
  memberSince: String
});

module.exports = mongoose.model('Inbox', InboxSchema);