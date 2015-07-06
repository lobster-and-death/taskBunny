var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    index: {
      unique: true
    }
  },
  name: {
    type: String,
    default: "anon"
  },
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
  ratingCount: {
    type: Number,
    default: 0
  },
  ratingTotal: {
    type: Number,
    default: 0
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
  },
  whole: {
    type: Object,
    default: null
  }
});

module.exports = mongoose.model('User', UserSchema);
