var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const express = require('express');
var session = require('express-session')


passport.use(new GoogleStrategy({
     clientID: process.env.GOOGLE_CLIENT_ID,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL: process.env.GOOGLE_CALL_BACK_URL
},
     function (accessToken, refreshToken, profile, done) {
          User.findOne({ email: profile._json.email }, function (err, user) {
               if (err) { console.log('error in google strategy-passport', err); return; }

               return done(err, user);
          });
     }
));


passport.serializeUser(function (user, done) {
     done(null, user);
});

passport.deserializeUser(function (user, done) {
     done(null, user);
});
module.exports = passport;