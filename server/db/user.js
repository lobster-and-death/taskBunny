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
    balance: {
      type: Number,
      default: 100
    },
    cardNumber: {
      type: String,
      default: '4242 4242 4242 4242'
    },
    expireMonth: {
      type: String,
      default: '01'
    },
    expireYear: {
      type: String,
      default: '00'
    },
    cvc: {
      type: String,
      default: '1234'
    }
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
