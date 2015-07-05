var mongoose = require('mongoose');

var InboxSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: String,
  category: String,
  message: String,
});

module.exports = mongoose.model('Inbox', InboxSchema);