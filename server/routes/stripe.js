var User = require('../db').User;
var Stripe = require('stripe')('sk_test_aBAZwgWesuLzaiwvZRoDYy6X');

module.exports = function(app) {
  app.post('/charge', function(req, res) {
    var stripeOwner = req.body.stripeOwner;
    var stripeDebtor = req.body.stripeDebtor;
    var amount = req.body.amount;

    console.log(stripeOwner);
    console.log(stripeDebtor);
    

  })
}
