const LocalStrategy = require("passport-local").Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  //Discord authentication
  passport.use(new DiscordStrategy({
    //Get client ID and Secret from discord developer portal
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: '/auth/discord/callback',
    // pulls discord username without email, and returns basic information about all the user's current guilds / servers. 
    scope: ['identify', 'guilds']
  },
  function (accessToken, refreshToken, profile, cb) {
    const displayName = `${profile.username}#${profile.discriminator}`;
    const is100Dever = profile.guilds.some(server => server.id === '735923219315425401');
  
    if (!is100Dever) return cb(null, false, {
      msg: "You must be a member of the 100Devs Discord to use this application",
    });

    User.findById(profile.id, (err, user) => {
      if (err) return cb(err, user);
      // Create new user
      if (!user) return User.create({
        _id: profile.id,
        displayName: displayName,
        avatar: profile.avatar,
        socials: [],
        bio: '',
      }).then((err, user) => cb(err, user));
      // Update outdated info
      user.displayName = displayName;
      user.avatar = profile.avatar;
      return user.save((err, user) => {
        return cb(err, user)
      })
    });
  }));
};
