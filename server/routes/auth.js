var config = require('../config.js');
var fs = require('fs');
var path = require('path');
var User = require('../db').User;
var moment = require('moment');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// use passport-stripe in auth.js or stripe module in stripe.js?
var StripeStrategy = require('passport-stripe');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_APP_ID,
    clientSecret: config.GOOGLE_APP_SECRET,
    callbackURL: config.GOOGLE_APP_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({
      googleId: profile.id
    }).exec(function(err, user) {
      //user previously logged into our app and is saved in our db
      if (user) {
        done(null, user);
      } else {
        //first time user is logging in
        user = new User({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          memberSince: new Date()
        });
        //create and save new user
        user.save(function(err, user) {
          done(err, user);
        });
      }
    });
  }
));

module.exports = function(app) {

  app.use(session({
    secret: config.SESSION_SECRET,
    store: new MongoStore({
      url: config.MONGODB_URL
    }),
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
      ]
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/#/sign-in'
    }),
    function(req, res) {
      res.redirect('/#/tasks');
    });

  app.get('/login', function(req, res) {
    res.redirect('/auth/google');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy(function() {
      res.redirect('/');
    });
  });

  //api to check on client side if session is authenticated
  app.get('/auth/profile/check', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.status(200).send(req.user);
    } else {
      res.status(401).end();
    }
  });

  // update payment info if user is authenticated
  app.post('/auth/profile/updateCardInfo', function(req, res, next) {
    // TODO: check to prevent blank card info

    if (req.isAuthenticated()) {
      User.findById(req.user._id)
        .exec(function(err, user) {
          if (err) {
            return res.status(500).end();
          }

          if (user) {
            console.log('Req card info:');
            console.log(req.body.number);
            console.log(req.body.expire);
            console.log(req.body.cvc);

            user.stripeid.cardNumber = req.body.number;
            user.stripeid.expire = req.body.expire;
            user.stripeid.cvc = req.body.cvc;

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
    }
  })

  app.post('/auth/profile/update', function(req, res) {
    //prevent setting a blank name - todo: use a regex
    if (!req.body.name) {
      return res.status(403).end();
    }

    if (req.isAuthenticated()) {
      User.findById(req.user._id)
        .exec(function(err, user) {
          if (err) {
            return res.status(500).end();
          }
          if (user) {
            //TODO: there should be an email verification process
            //before allowing user to update their email address
            //set user data on model
            user.name = req.body.name;
            //user.email = req.body.email;
            //update the session user data
            req.user.name = user.name;
            //req.user.email = user.email;
            user.preferredEmail = req.body.preferredEmail;
            user.phone = req.body.phone;
            user.city = req.body.city;

            user.save(function(err) {
              if (err) {
                return res.status(500).end();
              }
              res.status(201).end();
            });
          } else {
            return res.status(404).end();
          }
        });

    } else {
      res.status(401).end();
    }
  });

  app.get('/profile/:id', function(req, res, next) {
    var userId = req.params.id;
    User.findOne({
      _id: id
    }).exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
  });
  

};
