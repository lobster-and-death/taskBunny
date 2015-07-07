var User = require('../db').User;
var Task = require('../db').Task;
var Stripe = require('stripe')('sk_test_aBAZwgWesuLzaiwvZRoDYy6X');

module.exports = function(app) {
  app.post('/charge', function(req, res) {
    var stripeOwner = req.body.stripeOwner;
    var stripeDebtor = req.body.stripeDebtor;
    var amount = parseInt(req.body.amount); //  * 100 must be in cents
    var task = req.body.task;

    console.log(stripeOwner);
    console.log(stripeDebtor);
    
    if (req.isAuthenticated()) {
      User.findById(stripeOwner._id)
        .exec(function(err, user) {
          if (err) {
            return res.send(500).end();
          }

          if (user) {
            user.stripeid.balance -= amount;

            user.save(function(err) {
              if (err) {
                return res.status(500).end();
              }
              res.status(201).end();
            })
          } else {
            return res.status(404).end();
          }
        })
        .then(function(promise) {
          // how to add amount to card?
          User.findById(stripeDebtor._id)
            .exec(function(err, user) {
              if (err) {
                return res.send(500).end();
              }

              if (user) {
                user.stripeid.balance += amount;

                user.save(function(err) {
                  if (err) {
                    return res.status(500).end();
                  }
                  // task.paid = true;
                  res.status(201).end();
                })
              } else {
                return res.status(404).end();
              }
            })
        })
        .then(function(promise) {
          Task.findById(task._id)
            .exec(function(err, task) {
              if (err) {
                return res.send(500).end();
              }

              if (task) {
                task.paid = true;

                task.save(function(err) {
                  if (err) {
                    return res.status(500).end();
                  }

                  res.status(201).end();
                })
              } else {
                return res.status(404).end();
              }
            })
        })

    }

  })
}
