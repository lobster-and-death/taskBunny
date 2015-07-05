var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    index: {
      unique: true
    }
  },
  name: String,
  email: String,
  memberSince: String,
  preferredEmail: {
    type: String,
    default: 'user@user.com'
  },
  phone: {
    type: String,
    default: '909-000-0000'
  },
  city: {
    type: String,
    default: 'San Francisco'
  },
  stripeid: {
    cardNumber: {
      type: String,
      default: '4242 4242 4242 4242'
    },
    expire: {
      type: String,
      default: '01/00'
    },
    cvc: Number
  },
  picture: {
    type: String,
    default: 'http://sener.is/hank.gif'
  },
  rating: {
    type: Array,
    default: [0, 0]
  },
  reviews: {
    type: Array,
    default: []
  },
  completedCount: {
    type: Number,
    default: 0
  },
  paidCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', UserSchema);
