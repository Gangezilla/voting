var config = require('./config');
var passport=require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var database = require('./database');
var user=require('./user');

//by doing module.exports like this, you're saying that THIS is all one function, using the included parameters as arguments within that function.
module.exports = function(app, passport, FacebookStrategy, datab) {
    
    passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.appID,
    clientSecret: config.facebookAuth.appSecret,
    callbackURL: config.facebookAuth.callbackUrl
      },
      function(accessToken, refreshToken, profile, cb) {
        user.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    //serializing means that a user can login once, and then a session cookie gets saved so they can be auto logged back in next time automatic:lly.
    // passport.serializeUser(function(user, done) {
    //     done(null, user.id);
    //     //only using their user id to keep the session small, meaning that ID is used to find the user next time.
    // });

    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //         done(err, user);
    //     });
    // });

    // 

    // passport.use(new FacebookStrategy({
    //         clientID: config.facebookAuth.appID,
    //         clientSecret: config.facebookAuth.appSecret,
    //         callbackURL: config.facebookAuth.callbackUrl
    //     }),

    //     function(token, refreshToken, profile, done) {
    //         process.nextTick(function() {
    //             database.findOne({ 'facebook.id': profile.id }, function(err, user) {
    //                 if (err)
    //                     return done(err);

    //                 if (user) {
    //                     return done(null, user); // user found, return that user
    //                 } else {
    //                     // if there is no user found with that facebook id, create them
    //                     var newUser = new User();

    //                     // set all of the facebook information in our user model
    //                     newUser.facebook.id = profile.id;
    //                     newUser.facebook.token = token;
    //                     newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
    //                     newUser.facebook.email = profile.emails[0].value;

    //                     // save our user to the database
    //                     newUser.save(function(err) {
    //                         if (err)
    //                             throw err;

    //                         // if successful, return the new user
    //                         return done(null, newUser);
    //                     });
    //                 }

    //             });
    //         });
    //     });
};
