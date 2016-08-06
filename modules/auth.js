var config = require('./config');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var database = require('./database');
var User = require('./user');

//by doing module.exports like this, you're saying that THIS is all one function, using the included parameters as arguments within that function.
module.exports = function(app, passport, FacebookStrategy, datab, done) {
    //serializing means that a user can login once, and then a session cookie gets saved so they can be auto logged back in next time automatically.
    passport.serializeUser(function(user, done) {
        done(null, user);
        //only using their user id to keep the session small, meaning that ID is used to find the user next time.
    });

    passport.deserializeUser(function(id, done) {
        database.findOne(datab, 'users', id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
                clientID: config.facebookAuth.appID,
                clientSecret: config.facebookAuth.appSecret,
                callbackURL: config.facebookAuth.callbackUrl,
            },
            function(accessToken, refreshToken, profile, done) {
                database.findOne(datab, 'users', { '_id': profile.id }, function(err, user) {
                    console.log(profile);
                    console.log(user);
                    if (!user.length) {
                        //if we can't find a user, we make a new entry in the db for them.
                        var newUser = {
                            _id:profile.id,
                            token:accessToken,
                            name:profile.displayName,
                        };
                        database.findOrCreate(datab, 'users', newUser, function(err) {
                            if (err)
                                throw err;
                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    } else {
                        return done(null, user); // user found, return that user
                    }
                });
            }
        )),

        function(token, refreshToken, profile, done) {
            process.nextTick(function() {
                console.log('here');
                user.findOrCreate(datab, 'users', profile.id, function(err, user) {
                    console.log('ye');
                    if (err)
                        return done(err);
                    if (user) {
                        console.log('found');
                        return done(null, user); // user found, return that user
                    } else {
                        console.log('here');
                        //if we can't find a user, we make a new entry in the db for them.
                        var newUser = new User.schema();

                        // set all of the facebook information in our user model
                        newUser.id = profile.id;
                        newUser.token = token;
                        newUser.name = profile.name.givenName;
                        newUser.email = profile.emails[0].value;

                        //save our user to the database
                        database.findOrCreate(datab, 'users', newUser, function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });
        };
};
