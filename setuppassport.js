var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./public/models/user");

module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use("login", new LocalStrategy(function(username, password, done) {
        console.log("passport.use");

    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: "No user has that username!" });
      }

      user.checkPassword(password, function(err, isMatch) {
        if (err) { return done(err); }

        if (isMatch) {
          console.log("passport.use is a match");
          
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password." });
        }
      });


    });
  }));

};